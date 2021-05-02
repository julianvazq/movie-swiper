import styled from 'styled-components';
import { Button } from '../../../styles';

export const Container = styled.aside`
    margin-bottom: 2rem;

    @media (min-width: 800px) {
        max-width: 400px;
    }
`;

export const Label = styled.label`
    color: var(--white-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    display: inline-block;
`;

export const InputContainer = styled.div`
    display: flex;

    input {
        padding: 0.5rem;
        border-radius: 4px;
        flex-basis: 65%;
        text-overflow: ellipsis;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
`;

export const CopyButton = styled(Button)`
    background: var(--blue-action);
    padding: 0.5rem 1.25rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;
