import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { Subtitle, Title } from '../../../styles';
import Tabs from '../../shared/Tabs';
import Matches from '../Matches';
import SwipeArea from '../SwipeArea';
import { Container } from './style';

const Swiper = () => {
    const { room } = useRoom();
    const { user } = useUser();
    const numMatches = room.movies.reduce((num, movie) => {
        const matched = movie.matches.length > 1 && movie.matches.some((match) => match.userId === user.id);
        if (matched) {
            return num + 1;
        }
        return num;
    }, 0);

    return (
        <Container>
            <Tabs tabs={['Movie', `Matches (${numMatches})`]}>
                <SwipeArea />
                <Matches />
            </Tabs>
        </Container>
    );
};

export default Swiper;
