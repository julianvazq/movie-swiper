import React from 'react';
import { useMoviePreview } from '../../../context/MoviePreviewContext';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import { Container, Details, ExpandIcon, Image, PreviewButton, Title } from './style';

interface Props {
    movie: AddedMovie;
}

const SwipeItem = ({ movie }: Props) => {
    const { setMoviePreview } = useMoviePreview();
    const imageSrc = generateImageUrl(movie.poster_path, 'w500');

    const showPreview = () => {
        setMoviePreview(movie);
    };

    return (
        <Container onClick={showPreview}>
            <PreviewButton onClick={showPreview}>
                <Title>{movie.title}</Title>
                <Details>
                    <ExpandIcon /> Details
                </Details>
            </PreviewButton>
            <Image src={imageSrc} alt={movie.title}></Image>
        </Container>
    );
};

export default SwipeItem;
