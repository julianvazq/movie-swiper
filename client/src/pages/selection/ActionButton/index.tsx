import React, { useState } from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { toggleReady, startSwiper } from '../../../sockets/emitters';
import { ToastType, useToast } from '../../../utils';
import Modal from '../../shared/Modal';
import FixedContainer from '../../shared/FixedContainer';
import { EmptyCheckbox, FillCheckbox, MainButton, ReadyButton, PlayIcon, ModalContent } from './style';

const ActionButton = () => {
    const { room } = useRoom();
    const { user } = useUser();
    const [visible, setVisible] = useState(false);
    const owner = room.participants.find((p) => p.owner);
    const isReady = room.participants.find((p) => p.id === user.id)?.ready;
    const participantsReady = room.participants.filter((p) => p.ready && !p.owner);
    const participantsExceptOwner = room.participants.filter((p) => !p.owner);

    const toggleReadyHandler = () => {
        toggleReady({ roomId: room.roomId as string, userId: user.id }, (res) => {
            if (res.success && !isReady) {
                useToast({ type: ToastType.Success, message: 'The room owner has been notified.' });
            }
        });
    };

    const startSwiping = () => {
        startSwiper({ roomId: room.roomId as string });
    };

    const checkReady = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setVisible(true);
    };

    return (
        <>
            <FixedContainer position="sticky">
                <ReadyButton onClick={checkReady}>
                    <EmptyCheckbox /> {participantsReady.length}
                </ReadyButton>
                {owner && owner.id === user.id ? (
                    <MainButton onClick={startSwiping}>
                        <PlayIcon />
                        Start Swiping
                    </MainButton>
                ) : (
                    <MainButton onClick={toggleReadyHandler}>
                        {isReady ? <FillCheckbox /> : <EmptyCheckbox />}
                        Ready To Swipe
                    </MainButton>
                )}
            </FixedContainer>
            <Modal visible={visible} onClose={() => setVisible(false)} height={300}>
                <ModalContent>
                    <h2>Participants</h2>
                    <ul>
                        {participantsExceptOwner.map((p) => {
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
                    {owner && (
                        <>
                            <h2>Owner</h2>
                            <p>{owner.name}</p>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ActionButton;
