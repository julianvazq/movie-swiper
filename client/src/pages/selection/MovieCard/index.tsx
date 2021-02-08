import React from 'react';
import { Movie } from '../../../../../server/src/types/movies';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    return <article>{movie.title}</article>;
};

export default MovieCard;
