import React from 'react';
import { useMoviePreview } from '../../../context/MoviePreviewContext';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import { Image, Container } from './style';

interface Props {
    movie: AddedMovie;
}

const SwipeImage = ({ movie }: Props) => {
    const { setMoviePreview } = useMoviePreview();
    const imageSrc = generateImageUrl(movie.poster_path, 'w500');

    const showPreview = () => {
        setMoviePreview(movie);
    };

    return (
        <Container>
            <Image src={imageSrc} alt={movie.title}></Image>
        </Container>
    );
};

export default SwipeImage;
