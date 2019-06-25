const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('./users/login');
});

router.get('/signup', (req, res) => {
    res.render('./users/signup');
});

router.get('/profile', (req, res) => {
    res.render('./users/profile');
});

module.exports = router;