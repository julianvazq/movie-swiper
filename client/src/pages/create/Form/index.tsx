import React, { useState } from 'react';
import { useRoom } from '../../../context/RoomContext';
import { userUser } from '../../../context/UserContext';
import { Button } from '../../../styles';
import { StyledForm } from './style';
import randomColor from 'randomcolor';
import { ActionType } from '../../../types';
import { socket } from '../../../sockets';
import { useHistory } from 'react-router-dom';

const Form = () => {
    const { room, dispatch } = useRoom();
    const { user, setUser } = userUser();
    const [name, setName] = useState('');
    const [roomName, setRoomName] = useState('');
    const history = useHistory();

    const initializeRoomAndUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId = socket.id;
        const newUser = { name, id: userId, color: randomColor() };
        setUser(newUser);
        dispatch({ type: ActionType.INITIALIZE_ROOM, payload: { roomName, participant: newUser } });
        history.push('/selection');
    };

    return (
        <StyledForm onSubmit={initializeRoomAndUser}>
            <label>Your Name</label>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
            <label>Movie Deck Name</label>
            <input type="text" name="roomName" onChange={(e) => setRoomName(e.target.value)} />
            <Button>Get Started</Button>
        </StyledForm>
    );
};

export default Form;
