import styled from 'styled-components';

export const TabBar = styled.nav`
    display: flex;
    margin-bottom: 2rem;

    & > * {
        flex: 1;
    }
`;

export const Tab = styled.button<{ selected: boolean }>`
    background: none;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.875rem;
    font-weight: ${(props) => (props.selected ? 500 : 400)};
    border-bottom: ${(props) => !props.selected && '2px solid var(--blue-active)'};
    background: ${(props) => props.selected && 'var(--blue-active)'};
    color: var(--white);
    padding: 1rem;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

export const TabContent = styled.section<{ show: boolean }>`
    display: ${(props) => (props.show ? 'block' : 'none')};
`;
