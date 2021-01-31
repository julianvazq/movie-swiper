import styled from 'styled-components';

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;

    label {
        margin-bottom: 0.5rem;
    }

    input {
        margin-bottom: 1rem;
        padding: 0.25rem;
    }

    input:last-of-type {
        margin-bottom: 4rem;
    }
`;
