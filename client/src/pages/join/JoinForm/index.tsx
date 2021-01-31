import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { socket } from '../../../sockets';
import { Button } from '../../../styles';
import { ActionType } from '../../../types/actions';
import { StyledForm } from './stlye';
import randomColor from 'randomcolor';

const JoinForm = () => {
    const { setUser } = useUser();
    const { dispatch } = useRoom();
    const [name, setName] = useState('');
    const history = useHistory();
    const params = useParams();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId = socket.id;
        const newUser = { name, id: userId, color: randomColor() };
        setUser(newUser);
        // dispatch({ type: ActionType.INITIALIZE_ROOM, payload: { roomName, participant: newUser } });
        // history.push('/selection');
    };

    return (
        <StyledForm onSubmit={onSubmit}>
            <label>Your Name</label>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
            <Button>Get Started</Button>
        </StyledForm>
    );
};

export default JoinForm;
