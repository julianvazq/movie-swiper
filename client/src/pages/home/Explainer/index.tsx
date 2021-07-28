import React from 'react';
import Instruction from '../Instruction';
import * as S from './style';

const instructions = [
    {
        headline: 'Invite your friends',
        body: 'Create a room, copy the link and share it with others.',
        icon: <S.UsersIcon />,
    },
    {
        headline: 'Pick your movies',
        body: 'Browse by genre or find the exact movie you have in mind, then add it to the shared list.',
        icon: <S.FilmIcon />,
    },
    {
        headline: 'Swipe to vote',
        body: (
            <>
                Like a movie? Swipe right. <br />
                Dislike a movie? Swipe left.
            </>
        ),
        icon: <S.PollIcon />,
    },
];

const Explainer = () => {
    return (
        <S.Grid>
            {instructions.map((i) => (
                <Instruction key={i.headline}>
                    <Instruction.Headline>
                        {i.icon} {i.headline}
                    </Instruction.Headline>
                    <Instruction.Body>{i.body}</Instruction.Body>
                </Instruction>
            ))}
        </S.Grid>
    );
};

export default Explainer;
