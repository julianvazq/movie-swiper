import React, { useState } from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { toggleReady, startSwiper } from '../../../sockets/emitters';
import { ToastType, useToast } from '../../../utils';
import Modal from '../../shared/Modal';
import FixedContainer from '../../shared/FixedContainer';
import {
    EmptyCheckbox,
    FillCheckbox,
    UserCheck,
    MainButton,
    ToggleReadyButton,
    ReadyButton,
    PlayIcon,
    CrownIcon,
    UsersIcon,
    ModalContent,
} from './style';

const ActionButton = () => {
    const { room } = useRoom();
    const { user } = useUser();
    const [visible, setVisible] = useState(false);
    const owner = room.participants.find((p) => p.owner);
    const isReady = room.participants.find((p) => p.id === user.id)?.ready;
    const participantsReady = room.participants.filter((p) => p.ready && !p.owner);
    const disableSwiping = !room.movies.length;

    const toggleReadyHandler = () => {
        toggleReady({ roomId: room.roomId as string, userId: user.id }, (res) => {
            if (res.success && !isReady) {
                useToast({ type: ToastType.Success, message: 'The room owner has been notified.' });
            }
        });
    };

    const startSwiping = () => {
        if (disableSwiping) {
            useToast({ type: ToastType.Custom, message: 'Add movies to your list to start swiping.' });
            return;
        }

        startSwiper({ roomId: room.roomId as string });
    };

    const checkReady = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setVisible(true);
    };

    return (
        <>
            <FixedContainer position="fixed">
                <ReadyButton onClick={checkReady}>
                    <UserCheck /> <span>{participantsReady.length}</span>
                </ReadyButton>
                {owner && owner.id === user.id ? (
                    <MainButton onClick={startSwiping} disable={disableSwiping}>
                        <PlayIcon />
                        Start Swiping
                    </MainButton>
                ) : (
                    <ToggleReadyButton onClick={toggleReadyHandler}>
                        {isReady ? <FillCheckbox /> : <EmptyCheckbox />}
                        Ready To Swipe
                    </ToggleReadyButton>
                )}
            </FixedContainer>
            <Modal visible={visible} onClose={() => setVisible(false)} height={300}>
                <ModalContent>
                    <h2>
                        <UsersIcon /> Participants
                    </h2>
                    <ul>
                        {room.participants.map((p) => {
                            if (p.owner) {
                                return (
                                    <li key={p.id}>
                                        <div>
                                            <CrownIcon />
                                            {p.name}
                                        </div>
                                        <p>Owner</p>
                                    </li>
                                );
                            }

                            if (p.ready) {
                                return (
                                    <li key={p.id}>
                                        <div>
                                            <FillCheckbox />
                                            {p.name}
                                        </div>
                                        <p>Ready</p>
                                    </li>
                                );
                            }

                            return (
                                <li key={p.id}>
                                    <div>
                                        <EmptyCheckbox /> {p.name}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ActionButton;
