import React, { useState } from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { Button } from '../../../styles';
import { StyledForm } from './style';
import randomColor from 'randomcolor';
import { ActionType } from '../../../types/actions';
import { socket } from '../../../sockets';
import { useHistory } from 'react-router-dom';
import { createRoom } from '../../../sockets/emitters';

const CreateForm = () => {
    const { dispatch } = useRoom();
    const { setUser } = useUser();
    const [name, setName] = useState('Julian');
    const [roomName, setRoomName] = useState('MyDeck');
    const history = useHistory();

    const initializeRoomAndUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userId = socket.id;
        const newUser = { name, id: userId, color: randomColor() };
        setUser(newUser);
        createRoom((res) => {
            if (!res.success) {
                return;
            }

            const roomId = res.data.roomId;
            dispatch({ type: ActionType.INITIALIZE_ROOM, payload: { roomName, roomId, participant: newUser } });
            history.push(`/selection/${roomId}`);
        });
    };

    return (
        <StyledForm onSubmit={initializeRoomAndUser}>
            <label>Your Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Movie Deck Name</label>
            <input type="text" name="roomName" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            <Button>Get Started</Button>
        </StyledForm>
    );
};

export default CreateForm;
