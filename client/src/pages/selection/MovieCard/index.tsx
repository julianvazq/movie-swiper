import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Movie } from '../../../../../server/src/types/movies';
import { ContentContainer, Card, Title, Image, PlusIcon, ButtonContainer } from './styled';
import PosterUnavailable from '../../../assets/poster_unavailable.png';
import { useRoom } from '../../../context/RoomContext';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const { room, dispatch } = useRoom();
    const history = useHistory();
    const [zIndex, setZIndex] = useState(0);
    const imageWidth = 'w342';
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}`
        : PosterUnavailable;

    const onClick = () => {
        const currPathname = history.location.pathname;
        if (currPathname.includes(movie.id.toString())) {
            history.push(`/selection/${room.roomId}`);
        } else {
            setZIndex(2);
            history.push({ pathname: `${currPathname}/${movie.id}`, state: { movie } });
        }
    };

    return (
        <Card onClick={onClick} layoutId={`image-${movie.id}`} zIndex={zIndex}>
            <ContentContainer>
                <Image src={imageUrl} />
                <ButtonContainer>
                    <PlusIcon />
                </ButtonContainer>
                <Title>{movie.title}</Title>
            </ContentContainer>
        </Card>
    );
};

export default MovieCard;
