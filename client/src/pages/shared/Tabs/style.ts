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
    font-weight: 600;
    font-size: 1.25rem;
    border-bottom: ${(props) => (props.selected ? '2px solid var(--white)' : '1px solid var(--white)')};
    color: var(--white);
    padding-bottom: 0.5rem;
`;

export const TabContent = styled.section<{ show: boolean }>`
    display: ${(props) => (props.show ? 'block' : 'none')};
`;
