import React, { useState, useEffect } from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { Subtitle, Title } from '../../../styles';
import { checkIfIncluded } from '../../../utils';
import MovieSelection from '../MovieSelection';
import { RouteProps } from 'react-router';
import { Container } from './style';
import { Movie } from '../../../types/movies';
import MovieDetail from '../MovieDetail';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

interface Props {
    isExact: boolean;
    location: { state: { movie: Movie } | undefined };
    params: { [key: string]: any };
    path: RouteProps['path'];
    url: string;
}

type Status = 'loading' | 'error' | 'success';

const Selection = ({ location, params }: Props) => {
    const { room, dispatch } = useRoom();
    const { user, setUser } = useUser();
    // const [status, setStatus] = useState<Status>('loading');

    useEffect(() => {
        if (!user.id) {
            return;
        }
        const inRoom = checkIfIncluded(room.participants, { id: user.id });
        if (!inRoom) {
            console.log('new user!');
        }
    }, []);

    useEffect(() => {
        // console.log(location?.state);
    }, [location]);

    const movie = location?.state?.movie;

    return (
        <>
            <AnimatePresence>{movie && <MovieDetail movie={movie} />}</AnimatePresence>
            <Container show={!movie}>
                <Title>Pick Your Movies</Title>
                <Subtitle>Add movies you and your friends may want to watch.</Subtitle>
                {/* {status === 'loading' && <p>Loading...</p>} */}
                {/* {status === 'error' && <p>Sorry, something went wrong. Try refreshing the page.</p>} */}
                <MovieSelection />
            </Container>
        </>
    );
};

export default Selection;
