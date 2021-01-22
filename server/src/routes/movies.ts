import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';

/**
 * @route GET /movies/:id
 * @desc Get individual movie details
 */
router.get('/:id', async (req, res) => {
    try {
        // Destructure data from client
        const { id } = req.params;

        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=images`;
        const data = await fetch(url);
        const movie = await data.json();
        res.send(movie);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Request failed!' });
    }
});

/**
 * @route POST /movies/genre
 * @desc Get individual movie details
 */
router.post('/genre', async (req, res) => {
    try {
        // Destructure data from client
        const { genres } = req.body.genres;

        // const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=images`;
        // const data = await fetch(url);
        // const movie = await data.json();
        // res.send(movie);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Request failed!' });
    }
});

export default router;
