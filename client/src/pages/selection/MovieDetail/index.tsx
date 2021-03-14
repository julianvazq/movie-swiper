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
    DesktopAddButton,
    MinusIcon,
} from './style';
import useMovieManager from '../../../hooks/useMovieManager';
import { generateImageUrl } from '../../../utils';
import { useMoviePreview } from '../../../context/MoviePreviewContext';
import { Stage } from '../../../types/room';

interface Props {
    movie: Movie;
}

const MovieDetail = ({ movie }: Props) => {
    const history = useHistory();
    const { room } = useRoom();
    const { movieActionHandler, buttonBackgroundColor, movieInList } = useMovieManager(movie);
    const { setMoviePreview: setMovieDetail } = useMoviePreview();

    const [details, setDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);

    const imageUrl = generateImageUrl(movie.poster_path, 'w500');
    const trailerData =
        details && details?.videos?.results?.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
    const trailerUrl = `https://www.youtube.com/embed/${trailerData?.key}`;
    const inSelection = history.location.pathname.includes(Stage.SELECTION);

    const onOverlayClick = (e: any) => {
        if (e.target.attributes['data-overlay']) {
            setMovieDetail(null);
        }
    };

    const backToSelection = () => {
        setMovieDetail(null);
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
                setDetails(res.data);
            }
            setLoading(false);
        } catch (error) {
            cancelToken.cancel('Error in try catch block.');
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Overlay
            data-overlay={true}
            onClick={onOverlayClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
        >
            <Container>
                <ContentContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} layoutId={`image-${movie.id}`}>
                    <Image src={imageUrl} />
                    <AnimatePresence>
                        {details && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.25 }}
                            >
                                {inSelection && (
                                    <DesktopAddButton
                                        onClick={movieActionHandler}
                                        backgroundColor={buttonBackgroundColor}
                                    >
                                        {' '}
                                        {!movieInList && (
                                            <>
                                                <PlusIcon /> Add Movie
                                            </>
                                        )}
                                        {movieInList && (
                                            <>
                                                <MinusIcon /> Remove Movie
                                            </>
                                        )}
                                    </DesktopAddButton>
                                )}
                                <Title>{details.title}</Title>
                                <Tag>{details.tagline}</Tag>

                                <WrapContainer>
                                    {details.genres?.map((genre) => (
                                        <Genre key={genre.id}>{genre.name}</Genre>
                                    ))}
                                </WrapContainer>
                                <Label>Overview</Label>
                                <Overview>{details.overview}</Overview>
                                <Divider>Details</Divider>
                                <Grid>
                                    <GridCell>
                                        <Label>Rating</Label>
                                        <p>
                                            {details.vote_average} <Star />
                                        </p>
                                    </GridCell>
                                    <GridCell>
                                        <Label>Runtime</Label>
                                        <p>{details.runtime} min</p>
                                    </GridCell>
                                    <GridCell>
                                        <Label>Released</Label>
                                        <p>{details.release_date}</p>
                                    </GridCell>
                                    <GridCell>
                                        <Label>Language</Label>
                                        <p>{details.original_language.toUpperCase()}</p>
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
                                    {inSelection && (
                                        <AddButton onClick={movieActionHandler} backgroundColor={buttonBackgroundColor}>
                                            {!movieInList && (
                                                <>
                                                    <PlusIcon /> Add Movie
                                                </>
                                            )}
                                            {movieInList && (
                                                <>
                                                    <MinusIcon /> Remove
                                                </>
                                            )}
                                        </AddButton>
                                    )}
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
