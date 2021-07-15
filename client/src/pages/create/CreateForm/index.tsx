import randomColor from 'randomcolor';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { socket } from '../../../sockets';
import { createRoom } from '../../../sockets/emitters';
import { ErrorMessage, FormButton, StyledForm } from '../../../styles';
import { ActionType } from '../../../types/actions';
import { InputGroup } from './style';

interface Errors {
    name?: string;
    roomName?: string;
}

const initialInputs = {
    name: 'Julian',
    roomName: 'MyGroup',
};

const CreateForm = () => {
    const history = useHistory();
    const { room, dispatch } = useRoom();
    const { user, setUser } = useUser();
    const [disabled, setDisabled] = useState(false);
    const [inputs, setInputs] = useState(initialInputs);
    const [touched, setTouched] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);

    const errors = getErrors();
    const isFormValid = !Object.keys(errors).length;

    const initializeRoomAndUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        if (!isFormValid) return;

        setDisabled(true);
        if (room.roomId) {
            socket.disconnect();
            socket.connect();
        }

        const newUser = {
            ...user,
            name: inputs.name,
            color: randomColor({
                luminosity: 'light',
                hue: 'blue',
            }),
        };
        setUser(newUser);
        createRoom({ roomId: null }, (res) => {
            if (!res.success) {
                return;
            }

            const roomId = res.data.roomId;
            dispatch({
                type: ActionType.INITIALIZE_ROOM,
                payload: { roomName: inputs.roomName, roomId, ownerId: newUser.id, participant: newUser },
            });
            history.push(`/selection/${roomId}`);
        });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((touched) => ({ ...touched, [name]: true }));
    };

    function getErrors() {
        const errors: Errors = {};
        if (!inputs.name) errors.name = 'Name is required.';
        if (!inputs.roomName) errors.roomName = 'Group name is required.';

        return errors;
    }

    return (
        <StyledForm onSubmit={initializeRoomAndUser}>
            <InputGroup>
                <label htmlFor="name">Your name</label>
                <input type="text" name="name" id="name" value={inputs.name} onChange={onChange} onBlur={onBlur} />
                {(touched.name || submitted) && errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </InputGroup>
            <InputGroup>
                <label htmlFor="roomName">Group name</label>
                <input
                    type="text"
                    name="roomName"
                    id="roomName"
                    value={inputs.roomName}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {(touched.roomName || submitted) && errors.roomName && <ErrorMessage>{errors.roomName}</ErrorMessage>}
            </InputGroup>
            <FormButton $disabled={disabled} disabled={disabled}>
                Get Started
            </FormButton>
        </StyledForm>
    );
};

export default CreateForm;
