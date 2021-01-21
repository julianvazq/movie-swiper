const express = require('express');
const router = express.Router();

/* Endpoint for lists' preview */
router.get('/list', async (req, res) => {
    try {
        res.send({ hi: 'hello' }).status(200);
    } catch (error) {
        console.log('Error fetching preview list', error);
        res.status(404);
    }
});

module.exports = router;
