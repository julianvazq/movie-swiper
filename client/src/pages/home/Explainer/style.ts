import styled from 'styled-components';
import { MaxWidthContainer } from '../../../styles';

export const Section = styled(MaxWidthContainer)`
    z-index: 1;
    position: relative;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > *:not(:last-of-type) {
        margin-bottom: 2rem;
    }
`;

export const MobileContainer = styled(Container)`
    max-width: 300px;
    margin: -13rem auto 0;
    padding: 4rem;
    background: hsl(211deg 28% 25% / 90%);
    border-radius: 4px;
`;

export const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
