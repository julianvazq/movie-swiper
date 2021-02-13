import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { Movie } from '../../../types/movies';
import { ContentContainer, Container, Title, Overlay, BackButtonContainer, Image } from './style';

interface Props {
    movie: Movie;
}

const MovieDetail = ({ movie }: Props) => {
    const { room } = useRoom();
    const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const imageWidth = 'w500';
    const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}` : null;

    const backToSelection = () => {
        history.push(`/selection/${room.roomId}`);
    };

    useEffect(() => {
        fetchMovieDetails();
        return () => {
            cancelToken.cancel('Component got unmounted');
        };
    }, [movie]);

    const cancelToken = axios.CancelToken.source();

    const fetchMovieDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/movies/${movie.id}`, {
                cancelToken: cancelToken.token,
            });
            if (res.status === 200) {
                setMovieDetails(res.data);
            }
            setLoading(false);
        } catch (error) {
            cancelToken.cancel('Error in try catch block.');
            console.log(error);
            setLoading(false);
        }
    };

    console.log('movie', movie);
    console.log('details', movieDetails);
    return (
        <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            // transition={{ duration: 0.2, delay: 0.15 }}
        >
            <Container onClick={backToSelection}>
                <ContentContainer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layoutId={`image-${movie.id}`}
                    imageUrl={imageUrl}
                >
                    <Image src={imageUrl || undefined} />
                    <AnimatePresence>
                        {movieDetails && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.15 }}
                            >
                                <Title>{movieDetails.title}</Title>
                                <BackButtonContainer></BackButtonContainer>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </ContentContainer>
            </Container>
        </Overlay>
    );
};

export default MovieDetail;
