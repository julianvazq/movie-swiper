import React from 'react';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import { Card, Image } from './style';

interface Props {
    movie: AddedMovie;
}

const ResultCard = ({ movie }: Props) => {
    const imageUrl = generateImageUrl(movie.poster_path, 'w500');
    return (
        <Card>
            {movie.title}
            <Image src={imageUrl} alt={movie.title} />
        </Card>
    );
};

export default ResultCard;
