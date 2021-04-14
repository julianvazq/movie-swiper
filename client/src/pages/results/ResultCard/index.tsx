import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMoviePreview } from '../../../context/MoviePreviewContext';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import LikeList from '../LikeList';
import {
    Card,
    DetailButton,
    ExpandIcon,
    Image,
    ImageContainer,
    MovieTitle,
    ResultsArea,
    ResultsContainer,
    TotalLikes,
} from './style';

interface Props {
    movie: AddedMovie;
}

const ResultCard = ({ movie }: Props) => {
    const { setMoviePreview } = useMoviePreview();
    const { pathname } = useLocation();
    const usersWhoLiked = movie.swipes.filter((swipe) => swipe.liked).map((swipe) => swipe.user);
    const colors = usersWhoLiked.map((user) => user?.color) as string[];

    const onMovieClick = () => {
        if (pathname.includes(movie.id.toString())) {
            setMoviePreview(null);
        } else {
            setMoviePreview(movie);
        }
    };

    return (
        <Card>
            <ResultsArea>
                <ImageContainer>
                    <TotalLikes>
                        {usersWhoLiked.length} <span>likes</span>
                    </TotalLikes>
                    <Image src={generateImageUrl(movie.poster_path, 'w500')} />
                </ImageContainer>
                <ResultsContainer>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <LikeList users={usersWhoLiked} />
                </ResultsContainer>
            </ResultsArea>
            <DetailButton onClick={onMovieClick}>
                <ExpandIcon />
                Movie Details
            </DetailButton>
            {/* <LikeCountBar colors={colors} /> */}
        </Card>
    );
};

export default ResultCard;
