import React from 'react';
import { MovieResponse } from '../../../types/movies';
import MovieCard from '../MovieCard';
import { Gallery } from './style';

interface Props {
    movies: MovieResponse;
}

const MovieGallery = ({ movies }: Props) => {
    return (
        <Gallery>
            {movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </Gallery>
    );
};

export default MovieGallery;
