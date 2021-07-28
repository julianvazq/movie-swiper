import React from 'react';
import MovieCardSkeleton from '../../../components/MovieCardSkeleton';
import { MovieResponse } from '../../../types/movies';
import MovieCard from '../MovieCard';
import { Empty, Gallery } from './style';

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

    if (!moviesOnDisplay?.length) {
        return <Empty>No movies found. Try a different search.</Empty>;
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
