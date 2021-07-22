import styled, { keyframes } from 'styled-components';
import { MaxWidthContainer } from '../../styles';
import { Title } from './../../styles/index';

export const Container = styled(MaxWidthContainer)`
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Text = styled(Title)`
    text-align: center;
    font-size: 1.125rem;
    margin-bottom: 1rem;
`;

const dotsAnimation = keyframes`
20%{background-position:0%   0%, 50%  50%,100%  50%}
    40%{background-position:0% 100%, 50%   0%,100%  50%}
    60%{background-position:0%  50%, 50% 100%,100%   0%}
    80%{background-position:0%  50%, 50%  50%,100% 100%}
`;

export const LoadingDots = styled.div`
    width: 60px;
    height: 24px;
    background: radial-gradient(circle closest-side, currentColor 90%, #0000) 0% 50%,
        radial-gradient(circle closest-side, currentColor 90%, #0000) 50% 50%,
        radial-gradient(circle closest-side, currentColor 90%, #0000) 100% 50%;
    background-size: calc(100% / 3) 12px;
    background-repeat: no-repeat;
    animation: ${dotsAnimation} 1s infinite linear;
`;
