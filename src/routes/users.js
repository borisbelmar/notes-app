const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');
const { isNotAuthenticated, isAuthenticated } = require('../helpers/auth');

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('./users/login');
});

router.post('/login', isNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', isNotAuthenticated, (req, res) => {
    res.render('./users/signup');
});

router.post('/signup', isNotAuthenticated, async(req, res) => {
    const { firstname, lastname, email, password, confirm_password } = req.body;
    const emailUser = await User.findOne({email: email});
    const errors = [];
    if (emailUser) {
        errors.push({text: 'El email ingresado ya existe'});
    }
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length < 4) {
        errors.push({text: 'La password debe tener al menos un largo de 4'});
    }
    if(errors.length > 0) {
        res.render('./users/signup', { errors, firstname, lastname, email });
    } else {
        const newUser = new User({firstname, lastname, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Ya estás registrado');
        res.redirect('/login');
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/');
});

router.get('/profile', isAuthenticated, (req, res) => {
    res.render('./users/profile');
});

module.exports = router;