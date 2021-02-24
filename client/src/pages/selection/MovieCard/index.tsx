import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Movie } from '../../../../../server/src/types/movies';
import { Container, ContentContainer, Card, Title, Image, PlusIcon, ButtonContainer, MinusIcon } from './styled';
import PosterUnavailable from '../../../assets/poster_unavailable.png';
import { useRoom } from '../../../context/RoomContext';
import { addMovie, removeMovie } from '../../../sockets/emitters';
import { AddedMovie } from '../../../types/movies';
import { useUser } from '../../../context/UserContext';
import toast from 'react-hot-toast';
import useMovieManager from '../../../hooks/useMovieManager';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const { room } = useRoom();
    const history = useHistory();
    const [zIndex, setZIndex] = useState(0);
    const imageWidth = 'w342';
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}`
        : PosterUnavailable;
    const { movieActionHandler, buttonBackgroundColor, movieInList } = useMovieManager(movie);

    const onMovieClick = () => {
        const currPathname = history.location.pathname;
        if (currPathname.includes(movie.id.toString())) {
            history.push(`/selection/${room.roomId}`);
        } else {
            setZIndex(2);
            history.push({ pathname: `${currPathname}/${movie.id}`, state: { movie } });
        }
    };

    return (
        <Container>
            <Card onClick={onMovieClick} tabIndex={0} layoutId={`image-${movie.id}`} zIndex={zIndex}>
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
