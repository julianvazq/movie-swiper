import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { ActionType } from '../../../types/actions';
import { Stage } from '../../../types/room';
import { EmptyCheckbox, FillCheckbox, FixedButton, TinderIcon } from './style';

const ActionButton = () => {
    const { room, dispatch } = useRoom();
    const { user } = useUser();
    const isOwner = room.participants.find((p) => p.owner && p.id === user.id);
    const isReady = room.participants.find((p) => p.id === user.id)?.ready;

    const toggleReady = () => {
        dispatch({ type: ActionType.TOGGLE_READY, payload: { id: user.id } });
    };

    const startSwiping = () => {
        dispatch({ type: ActionType.SET_STAGE, payload: { stage: Stage.SWIPER } });
    };

    if (isOwner) {
        return (
            <FixedButton onClick={startSwiping}>
                <TinderIcon />
                Start Swiping
            </FixedButton>
        );
    }

    return (
        <FixedButton onClick={toggleReady}>
            {isReady ? <FillCheckbox /> : <EmptyCheckbox />}
            Ready To Swipe
        </FixedButton>
    );
};

export default ActionButton;
