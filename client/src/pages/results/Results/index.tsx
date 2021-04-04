import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import { Subtitle, Title } from '../../../styles';
import InfoBox from '../../shared/InfoBox';
import ResultList from '../ResultList';
import { Container } from './style';

const Results = () => {
    const { room } = useRoom();
    const sortedMovies = room.movies
        .map((movie) => {
            const likes = movie.swipes.reduce((acc, swipe) => (swipe.liked ? acc + 1 : acc), 0);
            return { ...movie, likes };
        })
        .sort((a, b) => b.likes - a.likes);
    const filteredMovies = sortedMovies.filter((movie) => movie.likes > 1);
    const infoBoxText = 'Others are still swiping. Results may change.';

    return (
        <Container>
            <Title>Final Results</Title>
            <Subtitle>Only movies that 2 or more participants liked will show up here.</Subtitle>
            <InfoBox text={infoBoxText} margin="0 0 2rem" />
            <ResultList movies={filteredMovies} />
        </Container>
    );
};

export default Results;
