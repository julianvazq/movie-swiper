import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { MovieDetails, Movie } from '../../../types/movies';
import {
    ContentContainer,
    Container,
    Title,
    Overlay,
    BackButton,
    Image,
    Overview,
    Tag,
    Genre,
    WrapContainer,
    Label,
    Grid,
    GridCell,
    Divider,
    Star,
    Video,
    BackIcon,
    ButtonContainer,
    AddButton,
    PlusIcon,
} from './style';
import PosterUnavailable from '../../../assets/poster_unavailable.png';

interface Props {
    movie: Movie;
}

const MovieDetail = ({ movie }: Props) => {
    const { room } = useRoom();
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const imageWidth = 'w500';
    const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/${imageWidth}${movie.poster_path}`
        : PosterUnavailable;
    const trailerData =
        movieDetails &&
        movieDetails?.videos?.results?.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
    const trailerUrl = `https://www.youtube.com/embed/${trailerData?.key}`;
    console.log(trailerUrl);

    const onOverlayClick = (e: any) => {
        if (e.target.attributes['data-overlay']) {
            history.push(`/selection/${room.roomId}`);
        }
    };

    const backToSelection = () => {
        history.push(`/selection/${room.roomId}`);
    };

    useEffect(() => {
        const onEscPress = (e: KeyboardEvent) => {
            console.log(e);
            if (e.key === 'Escape') {
                history.push(`/selection/${room.roomId}`);
            }
        };

        window.addEventListener('keydown', onEscPress);

        return window.removeEventListener('keydown', onEscPress);
    }, []);

    useEffect(() => {
        fetchMovieDetails();
        document.body.style.overflow = 'hidden';
        return () => {
            cancelToken.cancel('Component got unmounted');
            document.body.style.overflow = 'unset';
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
            data-overlay={true}
            onClick={onOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            // transition={{ duration: 0.2, delay: 0.15 }}
        >
            <Container>
                <ContentContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} layoutId={`image-${movie.id}`}>
                    <Image src={imageUrl} />
                    <AnimatePresence>
                        {movieDetails && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.25 }}
                            >
                                <Title>{movieDetails.title}</Title>
                                <Tag>{movieDetails.tagline}</Tag>

                                <WrapContainer>
                                    {movieDetails.genres?.map((genre) => (
                                        <Genre key={genre.id}>{genre.name}</Genre>
                                    ))}
                                </WrapContainer>
                                <Label>Overview</Label>
                                <Overview>{movieDetails.overview}</Overview>
                                <Divider>Details</Divider>
                                <Grid>
                                    <GridCell>
                                        <Label>Rating</Label>
                                        <p>
                                            {movieDetails.vote_average} <Star />
                                        </p>
                                    </GridCell>
                                    <GridCell>
                                        <Label>Runtime</Label>
                                        <p>{movieDetails.runtime} min</p>
                                    </GridCell>
                                    <GridCell>
                                        <Label>Released</Label>
                                        <p>{movieDetails.release_date}</p>
                                    </GridCell>
                                    <GridCell>
                                        <Label>Language</Label>
                                        <p>{movieDetails.original_language.toUpperCase()}</p>
                                    </GridCell>
                                </Grid>
                                {trailerData && (
                                    <>
                                        <Divider>Trailer</Divider>
                                        <Video src={trailerUrl} frameBorder="0" allowFullScreen></Video>
                                    </>
                                )}
                                <ButtonContainer
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.75,
                                        },
                                    }}
                                >
                                    <BackButton onClick={backToSelection}>
                                        <BackIcon />
                                        Go Back
                                    </BackButton>
                                    <AddButton>
                                        <PlusIcon /> Add Movie
                                    </AddButton>
                                </ButtonContainer>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </ContentContainer>
            </Container>
        </Overlay>
    );
};

export default MovieDetail;
