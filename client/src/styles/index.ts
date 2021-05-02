import styled from 'styled-components';

export const MaxWidthContainer = styled.section`
    max-width: 1100px;
    margin: 0 auto;
`;

export const FormPageContainer = styled.section`
    padding: 2rem 1rem;
    max-width: 600px;
    margin: 0 auto;

    h2 {
        margin-bottom: 4rem;
    }

    @media (min-width: 600px) {
        padding: 4rem 1rem;
    }
`;

export const StyledForm = styled.form`
    label {
        margin-bottom: 0.5rem;
    }

    input {
        padding: 0.5rem;
        border-radius: 4px;
    }
`;

export const ErrorMessage = styled.div`
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: var(--accent-light);
    border-radius: 4px;
    font-size: 0.875rem;
`;

export const Title = styled.h1`
    font-size: 2rem;
    margin: 0 0 1rem;
    font-family: 'Merienda One', 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
        'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

export const Subtitle = styled.h2`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.3;
    margin-bottom: 2rem;
    color: var(--white-muted);
`;

export const Button = styled.button`
    padding: 1.5rem 1rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
`;

export const FormButton = styled(Button)`
    width: 100%;
    background: var(--blue-action);
    padding: 1rem 1.5rem;
`;

export const FontWeight600 = styled.span`
    font-weight: 600;
`;
