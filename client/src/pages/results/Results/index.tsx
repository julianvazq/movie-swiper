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

    const getInfoBoxProps = () => {
        const participantIds = room.participants.map((p) => p.id);
        const allSwiped = room.movies.reduce((allSwiped, movie) => {
            const swipeIds = movie.swipes.map((swipe) => swipe.user.id);
            allSwiped =
                movie.swipes.length >= participantIds.length && participantIds.every((id) => swipeIds.includes(id));
            return allSwiped;
        }, true);

        if (!allSwiped) {
            return {
                text: 'Others are still swiping. Results may change.',
                backgroundColor: 'hsla(0, 0%, 49.4%, 0.5)',
            };
        }

        return {
            text: "Everyone's done swiping. See the final results below.",
            backgroundColor: 'var(--accent-purple)',
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
