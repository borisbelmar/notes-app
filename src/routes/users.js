const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('Aquí va el login');
});

router.get('/signup', (req, res) => {
    res.send('Aquí va el registro');
});

module.exports = router;