import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { socket } from '../../../sockets';
import { Button } from '../../../styles';
import { StyledForm } from './stlye';
import randomColor from 'randomcolor';
import { joinRoom } from '../../../sockets/emitters';

const JoinForm = () => {
    const { user, setUser } = useUser();
    const [name, setName] = useState('');
    const history = useHistory();
    const { id: roomId }: any = useParams();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newUser = { ...user, name, color: randomColor() };
        setUser(newUser);
        joinRoom({ roomId, user: newUser }, (res) => {
            console.log('join res', res);
            if (res.success) {
                // history.push(`/selection/${roomId}`);
            }
        });
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
