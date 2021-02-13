import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { Movie } from '../../../types/movies';
import Modal from '../../shared/Modal';
import { ContentContainer, Container, Title, Overlay, BackButtonContainer, Image } from './style';

interface Props {
    movie: Movie;
}

const MovieDetail = ({ movie }: Props) => {
    const { room } = useRoom();
    const history = useHistory();
    const imageWidth = 'w500';
    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}` : null;

    const backToSelection = () => {
        history.push(`/selection/${room.roomId}`);
    };

    return (
        <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, delay: 0.15 }}
        >
            <Container onClick={backToSelection}>
                <ContentContainer layoutId={`image-${movie.id}`} imageUrl={imageUrl}>
                    <Image src={imageUrl || undefined} />
                    <Title>{movie.title}</Title>
                    <BackButtonContainer></BackButtonContainer>
                </ContentContainer>
            </Container>
        </Overlay>
    );
};

export default MovieDetail;
