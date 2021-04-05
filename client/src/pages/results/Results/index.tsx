import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import { Subtitle, Title } from '../../../styles';
import { AddedMovie } from '../../../types/movies';
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

    const getInfoBoxProps = () => {
        const participantIds = room.participants.map((p) => p.id);
        const allSwiped = room.movies.every((movie) => {
            return (
                movie.swipes.length >= participantIds.length &&
                movie.swipes.every((swipe) => participantIds.includes(swipe.user.id))
            );
        });

        if (!allSwiped) {
            return { text: 'Others are still swiping. Results may change.', backgroundColor: 'var(--accent-active)' };
        }

        return {
            text: "Everyone's done swiping. Below are the final results.",
            backgroundColor: 'hsl(127deg 48% 21%)',
        };
    };
    const { text, backgroundColor } = getInfoBoxProps();

    return (
        <Container>
            <Title>Final Results</Title>
            <Subtitle>Only movies that 2 or more participants liked will show up here.</Subtitle>
            <InfoBox text={text} margin="0 0 4rem" backgroundColor={backgroundColor} />
            <ResultList movies={filteredMovies} />
        </Container>
    );
};

export default Results;
