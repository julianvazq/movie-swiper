import React, { useRef } from 'react';
import { ToastType, useToast } from '../../../utils';
import { Container, Label, InputContainer, CopyButton } from './style';

const InviteLink = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onClick = () => {
        inputRef.current?.select();
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        useToast({ type: ToastType.Custom, message: 'Copied to clipboard.' });
    };

    return (
        <Container>
            <Label>Invite Link</Label>
            <InputContainer>
                <input
                    type="text"
                    name="link"
                    defaultValue={window.location.href}
                    ref={inputRef}
                    onClick={onClick}
                    readOnly
                />
                <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
            </InputContainer>
        </Container>
    );
};

export default InviteLink;
