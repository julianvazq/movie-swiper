import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Movie } from '../../../../../server/src/types/movies';
import Modal from '../../shared/Modal';
import MovieModal from '../../shared/MovieModal';
import { ContentContainer, Card, Title, Image } from './styled';
import PosterUnavailable from '../../../assets/poster_unavailable.png';
import { useRoom } from '../../../context/RoomContext';

interface Props {
    movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
    const { room } = useRoom();
    const history = useHistory();
    // const [zIndex, setZIndex] = useState(0);
    const [moviePlus, setMoviePlus] = useState(null);
    const [loading, setLoading] = useState(false);
    const imageWidth = 'w342';
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}`
        : PosterUnavailable;

    const onClick = () => {
        const currPathname = history.location.pathname;
        if (currPathname.includes(movie.id.toString())) {
            history.push(`/selection/${room.roomId}`);
        } else {
            history.push({ pathname: `${currPathname}/${movie.id}`, state: { movie } });
        }
    };

    const zIndex = history.location.pathname.includes(movie.id.toString()) ? 2 : 0;
    useEffect(() => {
        try {
            const fetch = async () => {
                setLoading(true);
                const res = await axios.get(`/movies/${movie.id}`);
                if (res.status === 200) {
                    setMoviePlus(res.data);
                }
                setLoading(false);
            };

            fetch();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    return (
        <Card onClick={onClick} layoutId={`image-${movie.id}`} zIndex={zIndex}>
            <ContentContainer>
                <Image src={imageUrl} />
                <Title>{movie.title}</Title>
            </ContentContainer>
            {/* <MovieModal movie={moviePlus || movie} visible={visible} onClose={onClose} loading={loading} /> */}
        </Card>
    );
};

export default MovieCard;
