import randomColor from 'randomcolor';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { ErrorMessage, FormButton, StyledForm } from '../../../styles';
import { InputGroup } from './style';

interface Errors {
    name?: string;
}

const initialInputs = {
    name: '',
};

const JoinForm = () => {
    const history = useHistory();
    const { id: roomId }: any = useParams();
    const { user, setUser } = useUser();
    const [inputs, setInputs] = useState(initialInputs);
    const [touched, setTouched] = useState<Errors>({});
    const [submitted, setSubmitted] = useState(false);

    const errors = getErrors();
    const isFormValid = !Object.keys(errors).length;

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

        return errors;
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        if (!isFormValid) return;

        const newUser = {
            ...user,
            name: inputs.name,
            color: randomColor({
                luminosity: 'light',
                hue: 'blue',
            }),
        };
        setUser(newUser);
        history.push(`/selection/${roomId}`);
    };

    return (
        <StyledForm onSubmit={onSubmit}>
            <InputGroup>
                <label>Your Name</label>
                <input type="text" name="name" onChange={onChange} onBlur={onBlur} />
                {(touched.name || submitted) && errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </InputGroup>
            <FormButton>Get Started</FormButton>
        </StyledForm>
    );
};

export default JoinForm;
