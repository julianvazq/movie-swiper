import React from 'react';
import * as S from './style';

interface Prop {
    children: React.ReactNode;
}

const Headline = ({ children }: Prop) => <S.Headline>{children}</S.Headline>;
const Body = ({ children }: Prop) => <S.Body>{children}</S.Body>;

const Instruction = ({ children }: Prop) => {
    const headline = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Headline,
    );
    const body = React.Children.toArray(children).filter((child) => React.isValidElement(child) && child.type === Body);

    return (
        <S.Container>
            {headline}
            {body}
        </S.Container>
    );
};

Instruction.Headline = Headline;
Instruction.Body = Body;

export default Instruction;
