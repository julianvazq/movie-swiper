import React from 'react';
import { Movie } from '../../../../../server/src/types/movies';
import { Card, Title } from './styled';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const imageWidth = 'w342';
    const imageUrl = `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}`;
    // const imageUrl = undefined;
    return (
        <Card imageUrl={imageUrl}>
            <Title>{movie.title}</Title>
        </Card>
    );
};

export default MovieCard;
