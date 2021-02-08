import styled from 'styled-components';
import PosterUnavailable from '../../../assets/poster_unavailable.png';

export const Card = styled.article<{ imageUrl: string }>`
    background: linear-gradient(to top, hsla(0, 0%, 0%, 0.65) 0%, hsla(0, 0%, 0%, 0) 100%),
        url(${(props) => (props.imageUrl ? props.imageUrl : PosterUnavailable)});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h3`
    width: 100%;
    padding: 1rem;
    margin-top: auto;
    font-weight: 500;
    text-align: center;
    background: #00000038;
    background: linear-gradient(180deg, rgba(247, 245, 252, 0) 0%, rgba(0, 0, 0, 1) 100%);
`;
