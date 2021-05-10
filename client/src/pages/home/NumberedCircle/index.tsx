import React from 'react';
import * as S from './style';

interface Props {
    number: number;
    text: string;
}

const NumberedCircle = ({ number, text }: Props) => {
    return (
        <S.Container>
            <S.Number>{number}</S.Number>
            <S.Text>{text}</S.Text>
        </S.Container>
    );
};

export default NumberedCircle;
