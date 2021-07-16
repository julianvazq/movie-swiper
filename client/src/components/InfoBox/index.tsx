import React from 'react';
import { Container, Text, TextContainer } from './style';

interface Props {
    text: string;
    margin?: string;
    backgroundColor?: string;
    children?: React.ReactNode;
}

const InfoBox = ({ text, margin, backgroundColor, children }: Props) => {
    if (children) {
        return (
            <Container margin={margin} backgroundColor={backgroundColor}>
                <TextContainer>{children}</TextContainer>
            </Container>
        );
    }

    return (
        <Container margin={margin} backgroundColor={backgroundColor}>
            <Text>{text}</Text>
        </Container>
    );
};

export default InfoBox;
