import express from 'express';
const router = express.Router();
const {
    getMovieById,
    getMovieQuery,
    getGenres,
    getRandomMovie,
} = require('../controllers/movies');

/**
 * @route POST /movies/genre
 * @desc Get individual movie details
 */
router.post('/genres', getGenres);

/**
 * @route GET /movies/random
 * @desc Get individual random movie details
 */
router.get('/random', getRandomMovie);

/**
 * @route GET /movies/:id
 * @desc Get movie details
 */
router.get('/:id', getMovieById);

/**
 * @route GET /movies/query/:query
 * @desc Get individual movie details
 */
router.get('/query/:query', getMovieQuery);

export default router;
