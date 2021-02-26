import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { toggleReady } from '../../../sockets/emitters';
import { ActionType } from '../../../types/actions';
import { Stage } from '../../../types/room';
import { EmptyCheckbox, FillCheckbox, FixedContainer, TinderIcon, MainButton, ReadyButton, PlayIcon } from './style';

const ActionButton = () => {
    const { room, dispatch } = useRoom();
    const { user } = useUser();
    const isOwner = room.participants.find((p) => p.owner && p.id === user.id);
    const isReady = room.participants.find((p) => p.id === user.id)?.ready;
    const numParticipantsReady = room.participants.reduce((acc, currValue) => {
        if (currValue.ready) {
            return acc + 1;
        }
        return acc;
    }, 0);

    const toggleReadyHandler = () => {
        toggleReady({ roomId: room.roomId as string, userId: user.id }, (res) => {
            console.log(res);
        });
    };

    const startSwiping = () => {
        dispatch({ type: ActionType.SET_STAGE, payload: { stage: Stage.SWIPER } });
    };

    if (isOwner) {
        return (
            <FixedContainer onClick={startSwiping}>
                <ReadyButton>
                    <PlayIcon /> {numParticipantsReady}
                </ReadyButton>
                <MainButton>
                    <TinderIcon />
                    Start Swiping
                </MainButton>
            </FixedContainer>
        );
    }

    return (
        <FixedContainer onClick={toggleReadyHandler}>
            <MainButton>
                {isReady ? <FillCheckbox /> : <EmptyCheckbox />}
                Ready To Swipe
            </MainButton>
        </FixedContainer>
    );
};

export default ActionButton;
