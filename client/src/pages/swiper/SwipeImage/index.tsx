import React, { useEffect } from 'react';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import { Image, Container } from './style';

interface Props {
    movie: AddedMovie;
    isActive: boolean;
    setActiveMovie: (movie: AddedMovie) => void;
}

const SwipeImage = ({ movie, isActive, setActiveMovie }: Props) => {
    const imageSrc = generateImageUrl(movie.poster_path, 'w500');

    useEffect(() => {
        if (isActive) {
            console.log(movie.title);
            setActiveMovie(movie);
        }
    }, [isActive]);

    return (
        <Container>
            <Image src={imageSrc} alt={movie.title}></Image>
        </Container>
    );
};

export default SwipeImage;
