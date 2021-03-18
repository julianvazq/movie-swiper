import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import { Subtitle, Title } from '../../../styles';
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

    return (
        <Container>
            <Title>Results</Title>
            <Subtitle>View your results.</Subtitle>
            <ResultList movies={filteredMovies} />
        </Container>
    );
};

export default Results;
