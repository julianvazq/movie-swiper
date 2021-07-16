import styled from 'styled-components';

export const Container = styled.div<{ margin: string | undefined; backgroundColor: string | undefined }>`
    padding: 0.75rem;
    margin: ${(props) => props.margin || ''};
    border-radius: 4px;
    display: inline-block;
    max-width: 500px;
    background: ${(props) => props.backgroundColor || 'var(--accent-active)'};
    color: hsl(340deg 38% 94%);
`;

export const Text = styled.p`
    line-height: 1.3;
`;

export const TextContainer = styled.aside``;
