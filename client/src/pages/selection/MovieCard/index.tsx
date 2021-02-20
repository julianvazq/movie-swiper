import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Movie } from '../../../../../server/src/types/movies';
import { Container, ContentContainer, Card, Title, Image, PlusIcon, ButtonContainer } from './styled';
import PosterUnavailable from '../../../assets/poster_unavailable.png';
import { useRoom } from '../../../context/RoomContext';
import { addMovie } from '../../../sockets/emitters';
import { AddedMovie } from '../../../types/movies';
import { useUser } from '../../../context/UserContext';
import toast from 'react-hot-toast';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const { room, dispatch } = useRoom();
    const { user } = useUser();
    const history = useHistory();
    const [zIndex, setZIndex] = useState(0);
    const imageWidth = 'w342';
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}`
        : PosterUnavailable;
    const movieInList = room.movies.find((m) => m.id === movie.id);

    const onMovieClick = () => {
        const currPathname = history.location.pathname;
        if (currPathname.includes(movie.id.toString())) {
            history.push(`/selection/${room.roomId}`);
        } else {
            setZIndex(2);
            history.push({ pathname: `${currPathname}/${movie.id}`, state: { movie } });
        }
    };

    const addMovieHandler = () => {
        if (movieInList) {
            toast((t) => <span>{movie.title} is already in the list.</span>);
            return;
        }

        const addedMovie: AddedMovie = { ...movie, addedByUserId: user.id, matches: [], swiped: false };
        addMovie({ roomId: room.roomId as string, movie: addedMovie }, (res) => {
            if (res.success) {
                toast.success(`Added ${movie.title}.`);
            } else {
                toast.error(`There was a problem adding ${movie.title}.`);
            }
        });
    };

    return (
        <Container>
            <Card onClick={onMovieClick} tabIndex={0} layoutId={`image-${movie.id}`} zIndex={zIndex}>
                <ContentContainer>
                    <Image src={imageUrl} />
                    <Title>{movie.title}</Title>
                </ContentContainer>
            </Card>
            <ButtonContainer onClick={addMovieHandler}>
                <PlusIcon />
            </ButtonContainer>
        </Container>
    );
};

export default MovieCard;
