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

router.post('/notes/add', async (req, res) => {
    const {
        title,
        description
    } = req.body;
    const newNote = new Note({
        title,
        description
    });
    const errors = [];
    // Arreglar error handler
    if (!title) {
        errors.push({
            text: 'Escribe un título'
        });
    }
    if (!description) {
        errors.push({
            text: 'Escribe una descripción'
        });
    }
    if (errors.length > 0) {
        res.render('./notes/add', {
            errors,
            title,
            description
        });
    } else {
        await newNote.save();
        req.flash('success_msg', 'Nota creada con éxito');
        res.redirect('/notes');
    }
});

router.get('/notes/edit/:id', async(req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('./notes/edit', {note});
});

router.put('/notes/edit/:id', async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota editada con éxito');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada con éxito');
    res.redirect('/notes');
});

module.exports = router;