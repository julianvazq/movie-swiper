import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import { AddedMovie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import LikeCountBar from '../LikeCountBar';
import { Card, ResultsArea, Image, ResultsContainer, MovieTitle, Votes } from './style';

interface Props {
    movie: AddedMovie;
}

const ResultCard = ({ movie }: Props) => {
    const { room } = useRoom();
    const userLikes = movie.swipes.filter((swipe) => swipe.liked);
    const fullUsers = userLikes.map((user) => {
        return room.participants.find((p) => p.id === user.userId);
    });
    const colors = fullUsers.map((user) => user?.color) as string[];

    return (
        <Card>
            <ResultsArea>
                <Image src={generateImageUrl(movie.poster_path, 'w500')} />
                <ResultsContainer>
                    <Votes></Votes>
                    <MovieTitle>{movie.title}</MovieTitle>
                </ResultsContainer>
            </ResultsArea>
            <LikeCountBar colors={colors} />
        </Card>
    );
};

export default ResultCard;
