import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';

/**
 * @route POST /movies/genre
 * @desc Get individual movie details
 */
router.get('/genres', async (req, res) => {
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
 * @desc Get individual movie details
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&append_to_response=images`;
        const data = await fetch(url);
        const movie = await data.json();
        console.log(movie);
        res.send(movie);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Request failed!' });
    }
});

export default router;
