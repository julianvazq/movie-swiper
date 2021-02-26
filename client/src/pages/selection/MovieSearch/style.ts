import styled from 'styled-components';
import Select from 'react-select';

export const FormField = styled.div<{ show: boolean }>`
    display: ${(props) => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    margin-bottom: 1rem;

    label {
        margin-bottom: 1rem;
    }

    input {
        padding: 0.5rem;
        border-radius: 6px;
    }
`;

export const StyledSelect = styled(Select)`
    z-index: 4;
`;

export const colorStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: 'white', color: 'var(--dark-blue-bg)' }),
    option: (styles: { [x: string]: any }, { data, isDisabled, isFocused, isSelected }: any) => {
        return {
            ...styles,
            backgroundColor: 'white',
            color: 'var(--dark-blue-bg)',
            cursor: isDisabled ? 'not-allowed' : 'default',
        };
    },
    multiValue: (styles: any, { data }: any) => {
        return {
            ...styles,
            backgroundColor: 'white',
        };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
        ...styles,
        color: 'white',
        backgroundColor: 'var(--dark-blue-bg)',
        padding: '4px 8px',
        borderRadius: '4px',
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: 'white',
            color: 'var(--dark-blue-bg)',
        },
    }),
};
