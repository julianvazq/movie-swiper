import React from 'react';
import { ToastType, useToast } from '../../../utils';
import { Container, Label, InputContainer, CopyButton } from './style';

const InviteLink = () => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        useToast({ type: ToastType.Custom, message: 'Copied to clipboard.' });
    };

    return (
        <Container>
            <Label>Invite Link</Label>
            <InputContainer>
                <input type="text" name="link" value={window.location.href} />
                <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
            </InputContainer>
        </Container>
    );
};

export default InviteLink;
