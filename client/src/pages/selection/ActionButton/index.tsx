import React, { useState } from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { startSwiper, toggleReady } from '../../../sockets/emitters';
import { ToastType, useToast } from '../../../utils';
import FixedContainer from '../../shared/FixedContainer';
import Modal from '../../shared/Modal';
import {
    CrownIcon,
    EmptyCheckbox,
    FillCheckbox,
    MainButton,
    ModalContent,
    PlayIcon,
    ReadyButton,
    ToggleReadyButton,
    UserCheck,
    UserIcon,
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
            <Modal visible={visible} onClose={() => setVisible(false)} height={300} maxWidth={400}>
                <ModalContent>
                    <h2>Participants</h2>
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

                            return (
                                <li key={p.id}>
                                    <div>
                                        <UserIcon /> {p.name}
                                    </div>
                                    {p.ready && <p>Ready</p>}
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
