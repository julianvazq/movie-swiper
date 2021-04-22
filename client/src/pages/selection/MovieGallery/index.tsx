import React from 'react';
import { MovieResponse } from '../../../types/movies';
import MovieCardSkeleton from '../../shared/MovieCardSkeleton';
import MovieCard from '../MovieCard';
import { Gallery } from './style';

interface Props {
    movies: MovieResponse;
    loading: boolean;
}

const MovieGallery = ({ movies, loading }: Props) => {
    const moviesOnDisplay = movies.results || [];

    if (loading) {
        return (
            <Gallery>
                {Array.from(Array(20).keys()).map((n, index) => (
                    <MovieCardSkeleton key={index} />
                ))}
            </Gallery>
        );
    }

    return (
        <Gallery>
            {moviesOnDisplay.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </Gallery>
    );
};

export default MovieGallery;
