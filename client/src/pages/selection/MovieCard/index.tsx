import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Movie } from '../../../../../server/src/types/movies';
import Modal from '../../shared/Modal';
import MovieModal from '../../shared/MovieModal';
import { Card, Title } from './styled';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const [visible, setVisible] = useState(false);
    const [moviePlus, setMoviePlus] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageWidth = 'w342';
    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}` : null;

    const onClose = () => {
        setVisible(false);
    };

    const onOpen = () => {
        setVisible(true);
    };

    useEffect(() => {
        try {
            const fetch = async () => {
                if (visible) {
                    setLoading(true);
                    const res = await axios.get(`/movies/${movie.id}`);
                    if (res.status === 200) {
                        setMoviePlus(res.data);
                    }
                    setLoading(false);
                }
            };

            fetch();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [visible]);

    return (
        <>
            <Card imageUrl={imageUrl} onClick={onOpen}>
                <Title>{movie.title}</Title>
            </Card>
            <MovieModal movie={moviePlus || movie} visible={visible} onClose={onClose} loading={loading} />
        </>
    );
};

export default MovieCard;
