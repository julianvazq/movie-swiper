import styled from 'styled-components';

export const Container = styled.div`
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 150px;
`;

export const Number = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--blue-active);
    font-family: 'Merienda One', 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
        'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 2rem;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-bottom: 1rem;
`;

export const Text = styled.p`
    text-align: center;
    line-height: 1.3;
`;
