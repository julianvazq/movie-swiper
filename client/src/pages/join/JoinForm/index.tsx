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
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();
    const { id: roomId }: any = useParams();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newUser = { ...user, name, color: randomColor() };
        setUser(newUser);
        history.push(`/selection/${roomId}`);
    };

    return (
        <StyledForm onSubmit={onSubmit}>
            <label>Your Name</label>
            <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
            {errorMessage && <p>{errorMessage}</p>}
            <Button>Get Started</Button>
        </StyledForm>
    );
};

export default JoinForm;
