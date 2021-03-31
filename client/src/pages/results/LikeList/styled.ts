import styled, { css } from 'styled-components';

export const List = styled.ul`
    list-style: none;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;

    & > * + * {
        margin-top: 0.25rem;
    }
`;

export const Item = styled.li`
    display: flex;
    align-items: center;
`;

export const Color = styled.div<{ color: string }>`
    background-color: ${(props) => props.color};
    width: 12.5px;
    height: 12.5px;
    border-radius: 50%;
    margin-right: 0.5rem;
    flex-shrink: 0;
`;

const wrapStyles = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 110px;
`;

export const Name = styled.p<{ wrap: boolean }>`
    ${(props) => (props.wrap ? wrapStyles : '')};
`;

export const MoreItems = styled.p`
    margin-top: 0.5rem;
    color: var(--white-muted);

    span {
        margin-right: 0.25rem;
    }
`;

export const ModalContent = styled.section`
    h2 {
    }
`;
