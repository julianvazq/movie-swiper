import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import useMovieManager from '../../../hooks/useMovieManager';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import { genres as genreObjects } from '../MovieSearch/genres';
import {
    Image,
    InfoContainer,
    Item,
    Overview,
    Title,
    SmallGenre,
    GenreContainer,
    SeeMoreButton,
    ButtonContainer,
    PlusIcon,
    MinusIcon,
} from './styled';

interface Props {
    movie: AddedMovie;
}

const MovieListItem = ({ movie }: Props) => {
    const history = useHistory();
    const { room } = useRoom();
    const { movieInList, movieActionHandler, buttonBackgroundColor } = useMovieManager(movie);
    console.log(movie);
    const genres = movie.genre_ids.map((genreId) => genreObjects.find((g) => g.id === genreId));
    console.log(genres);

    const onMovieClick = () => {
        const currPathname = history.location.pathname;
        if (currPathname.includes(movie.id.toString())) {
            history.push(`/selection/${room.roomId}`);
        } else {
            history.push({ pathname: `${currPathname}/${movie.id}`, state: { movie } });
        }
    };

    return (
        <Item>
            <ButtonContainer onClick={movieActionHandler} backgroundColor={buttonBackgroundColor}>
                {!movieInList && <PlusIcon />}
                {movieInList && <MinusIcon />}
            </ButtonContainer>
            <Image src={generateImageUrl(movie.poster_path, 'w342')} alt={movie.title} />{' '}
            <InfoContainer>
                <Title>{movie.title}</Title>
                <GenreContainer>
                    {genres?.slice(0, 2).map((genre) => (
                        <SmallGenre key={genre?.id}>{genre?.name}</SmallGenre>
                    ))}
                </GenreContainer>
                <Overview>{movie.overview}</Overview>
                <SeeMoreButton onClick={onMovieClick}>See More</SeeMoreButton>
            </InfoContainer>
        </Item>
    );
};

export default MovieListItem;
