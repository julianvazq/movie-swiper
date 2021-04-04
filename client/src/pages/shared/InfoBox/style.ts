import styled from 'styled-components';

export const Container = styled.div<{ margin: string | undefined }>`
    padding: 0.75rem;
    margin: ${(props) => props.margin || ''};
    border-radius: 4px;
    background: gray;
    max-width: 500px;
    background: var(--accent-active);
    color: hsl(340deg 38% 94%);
`;

export const Text = styled.p``;

export const TextContainer = styled.aside``;
