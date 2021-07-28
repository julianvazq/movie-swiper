import styled from 'styled-components';

export const List = styled.ul`
    list-style: none;
    margin-top: 0.5rem;
    padding: 0.5rem 0;

    & > * + * {
        margin-top: 0.5rem;
    }
`;

export const Item = styled.li`
    display: flex;
    align-items: center;
    color: var(--white-muted);
`;

export const Color = styled.div<{ color: string }>`
    background-color: ${(props) => props.color};
    width: 12.5px;
    height: 12.5px;
    border-radius: 50%;
    margin-right: 0.5rem;
    flex-shrink: 0;
`;

export const Name = styled.p<{ wrap: number }>`
    white-space: ${(props) => props.wrap === 0 && 'nowrap'};
    overflow: ${(props) => props.wrap === 0 && 'hidden'};
    text-overflow: ${(props) => props.wrap === 0 && 'ellipsis'};
    max-width: ${(props) => props.wrap === 0 && '110px'}; ;
`;

export const MoreItems = styled.button`
    margin-top: 0.5rem;
    color: var(--white-muted);
    font-weight: 500;
    cursor: pointer;

    span {
        margin-right: 0.25rem;
    }
`;

export const ModalContent = styled.section`
    h2 {
    }
`;
