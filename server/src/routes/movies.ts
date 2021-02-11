import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';

/**
 * @route POST /movies/genre
 * @desc Get individual movie details
 */
router.post('/genres', async (req, res) => {
    try {
        const { genres = [], page = '1' } = req.body;
        const genreIds = genres.join(',');

        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreIds}`;
        const data = await fetch(url);
        const movies = await data.json();
        res.send(movies);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Request failed!' });
    }
});

/**
 * @route GET /movies/:id
 * @desc Get movie details
 */
router.get('/:id', async (req, res) => {
    try {
        // Destructure data from client
        const { id } = req.params;

        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=videos,images`
        );
        const movie = await data.json();
        res.send(movie);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Request failed!' });
    }
});

/**
 * @route GET /movies/query/:query
 * @desc Get individual movie details
 */
router.get('/query/:query', async (req, res) => {
    try {
        const { query } = req.params;

        const url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.API_KEY}&language=en-US&query=${query}&append_to_response=images`;
        const data = await fetch(url);
        const movie = await data.json();
        res.send(movie);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Request failed!' });
    }
});

export default router;
