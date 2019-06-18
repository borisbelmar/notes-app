const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    res.render('./notes/list');
});

router.get('/notes/add', (req, res) => {
    res.render('./notes/add');
});

router.get('/notes/edit', (req, res) => {
    res.render('./notes/edit');
});

module.exports = router;