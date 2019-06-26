const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('./users/login');
});

router.get('/signup', (req, res) => {
    res.render('./users/signup');
});

router.post('/signup', (req, res) => {
    const { firstname, lastname, email, password, confirm_password } = req.body;
    const errors = [];
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if (password.length < 4) {
        errors.push({text: 'La password debe tener al menos un largo de 4'});
    }
    if(errors.length > 0) {
        res.render('./users/signup', { errors, firstname, lastname, email });
    } else {
        console.log(req.body);
        res.redirect('/profile');
    }
});

router.get('/profile', (req, res) => {
    res.render('./users/profile');
});

module.exports = router;