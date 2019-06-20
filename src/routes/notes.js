const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes', async(req, res) => {
    const notes = await Note.find();
    res.render('./notes/list', { notes });
});

router.get('/notes/add', (req, res) => {
    res.render('./notes/add');
});

router.post('/notes/add', async(req, res) => {
    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    // Arreglar error handler
    if(!title || !description) {
        console.log("Error");
    } else {
        await newNote.save();
        res.redirect('/notes');
    }
});

router.get('/notes/edit', (req, res) => {
    res.render('./notes/edit');
});

module.exports = router;