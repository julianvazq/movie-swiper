import React from 'react';
import { MovieResponse } from '../../../types/movies';
import MovieCard from '../MovieCard';

interface Props {
    movies: MovieResponse;
}

const MovieGallery = ({ movies }: Props) => {
    return (
        <div>
            {movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieGallery;
