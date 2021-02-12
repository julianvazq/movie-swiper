import styled from 'styled-components';

export const Container = styled.section<{ show: boolean }>`
    display: ${(props) => (props.show ? 'block' : 'none')};
    padding: 2rem 1rem;
`;
