import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

interface Props {
    children: JSX.Element | JSX.Element[] | Element | Element[];
    visible: boolean;
    onClose?: () => void;
    width?: number | string;
    maxWidth?: number | string;
    height?: number | string;
}

const Modal = ({ visible, onClose, width = '90%', maxWidth = 500, height = 500, children }: Props) => {
    const styles = {
        height,
        width,
        maxWidth,
        background: 'var(--blue-active)',
        borderRadius: '8px',
    };

    return (
        <Rodal visible={visible} onClose={onClose} closeOnEsc={true} customStyles={styles} animation="slideUp">
            {children}
        </Rodal>
    );
};

export default Modal;
