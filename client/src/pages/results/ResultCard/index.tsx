import React from 'react';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import LikeCountBar from '../LikeCountBar';
import LikeList from '../LikeList';
import { Card, ResultsArea, Image, ResultsContainer, MovieTitle, TotalLikes, DetailButton } from './style';

interface Props {
    movie: AddedMovie;
}

const ResultCard = ({ movie }: Props) => {
    const usersWhoLiked = movie.swipes.filter((swipe) => swipe.liked).map((swipe) => swipe.user);
    const colors = usersWhoLiked.map((user) => user?.color) as string[];

    return (
        <Card>
            <MovieTitle>{movie.title}</MovieTitle>
            <ResultsArea>
                <Image src={generateImageUrl(movie.poster_path, 'w500')} />
                <ResultsContainer>
                    <TotalLikes>
                        {usersWhoLiked.length} <span>likes</span>
                    </TotalLikes>
                    <LikeList users={usersWhoLiked} />
                </ResultsContainer>
            </ResultsArea>
            <DetailButton>Movie Details</DetailButton>
            {/* <LikeCountBar colors={colors} /> */}
        </Card>
    );
};

export default ResultCard;
