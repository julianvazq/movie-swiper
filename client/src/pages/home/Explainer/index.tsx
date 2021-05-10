import React from 'react';
// import InviteLinkScreenshot from '../../../assets/invite-link.png';
import useViewportWidth from '../../../hooks/useViewportWidth';
import NumberedCircle from '../NumberedCircle';
import * as S from './style';

const steps = ['Create a group and invite others', 'Add movies to the group list', 'Swipe to vote'];

const Explainer = () => {
    const { width } = useViewportWidth();

    if (width < 500) {
        return (
            <S.Container>
                {steps.map((step, i) => (
                    <NumberedCircle key={i} number={i + 1} text={step} />
                ))}
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.Section>
                {/* <img src={InviteLinkScreenshot} alt="Invite link screenshot." /> */}
                <NumberedCircle number={1} text={steps[0]} />
            </S.Section>
            <S.Section>
                <NumberedCircle number={2} text={steps[1]} />
            </S.Section>
            <S.Section>
                <NumberedCircle number={3} text={steps[2]} />
            </S.Section>
        </S.Container>
    );
};

export default Explainer;
