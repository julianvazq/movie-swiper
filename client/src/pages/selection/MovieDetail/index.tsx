import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Movie } from '../../../types/movies';
import { Container } from './style';

interface Props {
    movie: Movie;
}

const MovieDetail = ({ movie }: Props) => {
    const imageWidth = 'w342';
    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}` : null;

    return (
        <Container
            imageUrl={imageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, delay: 0.15 }}
        >
            hello
        </Container>
    );
};

export default MovieDetail;
