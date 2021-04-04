import React from 'react';
import { Container, Text, TextContainer } from './style';

interface Props {
    text: string;
    margin?: string;
    children?: React.ReactNode;
}

const InfoBox = ({ text, margin, children }: Props) => {
    if (children) {
        return (
            <Container margin={margin}>
                <TextContainer>{children}</TextContainer>
            </Container>
        );
    }

    return (
        <Container margin={margin}>
            <Text>{text}</Text>
        </Container>
    );
};

export default InfoBox;
