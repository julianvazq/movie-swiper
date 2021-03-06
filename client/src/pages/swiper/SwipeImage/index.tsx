import React from 'react';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import { Image, Container } from './style';

interface Props {
    movie: AddedMovie;
}

const SwipeImage = ({ movie }: Props) => {
    const imageSrc = generateImageUrl(movie.poster_path, 'w500');
    return (
        <Container>
            <Image src={imageSrc} alt={movie.title}></Image>
        </Container>
    );
};

export default SwipeImage;
