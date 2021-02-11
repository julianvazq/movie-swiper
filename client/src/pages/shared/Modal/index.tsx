import React, { ReactNode } from 'react';
import { Container } from './style';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

interface Props {
    children: JSX.Element | JSX.Element[] | Element | Element[];
    visible: boolean;
    onClose?: () => void;
    width?: number | string;
    height?: number | string;
}

const Modal = ({ visible, onClose, width = '90%', height = 500, children }: Props) => {
    const styles = {
        height,
        width,
        maxWidth: 500,
        background: 'black',
    };

    return (
        <Rodal visible={visible} onClose={onClose} closeOnEsc={true} customStyles={styles} animation="slideUp">
            {children}
        </Rodal>
    );
};

export default Modal;
