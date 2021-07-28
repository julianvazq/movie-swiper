import React from 'react';
import { Helmet } from 'react-helmet';
import Tabs from '../../../components/Tabs';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import Matches from '../Matches';
import SwipeArea from '../SwipeArea';
import { Container } from './style';

const Swiper = () => {
    const { room } = useRoom();
    const { user } = useUser();
    const numMatches = room.movies.reduce((num, movie) => {
        const matched =
            movie.swipes.find((swipe) => swipe.user.id === user.id && swipe.liked) &&
            movie.swipes.find((swipe) => swipe.liked && swipe.user.id !== user.id);
        if (matched) {
            return num + 1;
        }
        return num;
    }, 0);

    return (
        <Container>
            <Helmet>
                <title>Swipe | Movie Swiper</title>
            </Helmet>
            <Tabs tabs={['Movie', `Matches (${numMatches})`]}>
                <SwipeArea />
                <Matches />
            </Tabs>
        </Container>
    );
};

export default Swiper;
