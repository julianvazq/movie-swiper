import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Movie } from '../../../../../server/src/types/movies';
import { Container, ContentContainer, Card, Title, Image, PlusIcon, ButtonContainer, MinusIcon } from './styled';
import { useRoom } from '../../../context/RoomContext';
import useMovieManager from '../../../hooks/useMovieManager';
import { generateImageUrl } from '../../../utils';
import { useMoviePreview } from '../../../context/MoviePreviewContext';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const history = useHistory();
    const { setMoviePreview: setMovieDetail } = useMoviePreview();
    const { room } = useRoom();
    const [zIndex, setZIndex] = useState(0);
    const imageUrl = generateImageUrl(movie.poster_path, 'w342');
    const { movieActionHandler, buttonBackgroundColor, movieInList } = useMovieManager(movie);

    const onMovieClick = () => {
        const currPathname = history.location.pathname;
        if (currPathname.includes(movie.id.toString())) {
            history.push(`/selection/${room.roomId}`);
        } else {
            setZIndex(2);
            setMovieDetail(movie);
        }
    };

    return (
        <Container>
            <Card onClick={onMovieClick} layoutId={`image-${movie.id}`} zIndex={zIndex}>
                <ContentContainer>
                    <Image src={imageUrl} />
                    <Title>{movie.title}</Title>
                </ContentContainer>
            </Card>
            <ButtonContainer onClick={movieActionHandler} backgroundColor={buttonBackgroundColor}>
                {!movieInList && <PlusIcon />}
                {movieInList && <MinusIcon />}
            </ButtonContainer>
        </Container>
    );
};

export default MovieCard;
