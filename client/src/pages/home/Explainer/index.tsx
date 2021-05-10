import React from 'react';
// import InviteLinkScreenshot from '../../../assets/invite-link.png';
import useViewportWidth from '../../../hooks/useViewportWidth';
import NumberedCircle from '../NumberedCircle';
import * as S from './style';

const steps = ['Create a group and invite others', 'Add movies to the shared list', 'Swipe to vote'];

const Explainer = () => {
    const { width } = useViewportWidth();

    if (width < 500) {
        return (
            <S.Section>
                <S.MobileContainer>
                    {steps.map((step, i) => (
                        <NumberedCircle key={i} number={i + 1} text={step} />
                    ))}
                </S.MobileContainer>
            </S.Section>
        );
    }

    return (
        <S.Section>
            <S.Container>
                <S.Item>
                    {/* <img src={InviteLinkScreenshot} alt="Invite link screenshot." /> */}
                    <NumberedCircle number={1} text={steps[0]} />
                </S.Item>
                <S.Item>
                    <NumberedCircle number={2} text={steps[1]} />
                </S.Item>
                <S.Item>
                    <NumberedCircle number={3} text={steps[2]} />
                </S.Item>
            </S.Container>
        </S.Section>
    );
};

export default Explainer;
