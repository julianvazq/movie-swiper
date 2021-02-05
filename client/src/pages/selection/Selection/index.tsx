import React, { useState, useEffect } from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { Subtitle, Title } from '../../../styles';
import { checkIfIncluded } from '../../../utils';
import { Container } from './style';

type Status = 'loading' | 'error' | 'success';

const Selection = () => {
    const { room, dispatch } = useRoom();
    const { user, setUser } = useUser();
    const [status, setStatus] = useState<Status>('loading');

    useEffect(() => {
        if (!user.id) {
            return;
        }
        const inRoom = checkIfIncluded(room.participants, { id: user.id });
        if (!inRoom) {
            console.log('new user!');
        }
    }, []);

    return (
        <Container>
            <Title>Pick Your Movies</Title>
            <Subtitle>Add movies you and your friends may want to watch.</Subtitle>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'error' && <p>Sorry, something went wrong. Try refreshing the page.</p>}
            {/* {status === 'loading' && } */}
        </Container>
    );
};

export default Selection;
