const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    res.send('Aquí van las notas');
});

module.exports = router;