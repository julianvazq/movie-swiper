import styled from 'styled-components';
import { MaxWidthContainer } from '../../../styles';
import { Button as MovieCardDisplayContainer } from '../MovieCardDisplay/style';

export const Container = styled(MaxWidthContainer)`
    padding: 4rem 1.5rem 4rem;
    max-width: 700px;

    & ${MovieCardDisplayContainer} {
        flex: 0 0 200px;
    }

    @media screen and (min-width: 600px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
    }
`;

export const Content = styled.div`
    max-width: 350px;
    h2 {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 1rem;
        text-transform: uppercase;
    }

    p {
        color: var(--white-muted);
        line-height: 1.5;
        margin-bottom: 0.5rem;

        &:nth-last-of-type(2) {
            margin-bottom: 1rem;
        }

        &:last-of-type {
            margin-bottom: 2rem;
        }

        @media screen and (min-width: 600px) {
            &:last-of-type {
                margin-bottom: 0;
            }
        }
    }

    ul {
        list-style-position: inside;
        margin-bottom: 2rem;

        & > li + li {
            margin-top: 0.5rem;
        }
    }
`;
