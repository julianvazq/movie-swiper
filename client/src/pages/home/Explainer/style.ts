import styled from 'styled-components';
import { MaxWidthContainer } from '../../../styles';

export const Container = styled(MaxWidthContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > *:not(:last-of-type) {
        margin-bottom: 1rem;
    }
`;

export const Section = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
