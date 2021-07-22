import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import FixedContainer from '../../../components/FixedContainer';
import Modal from '../../../components/Modal';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { startSwiper, toggleReady } from '../../../sockets/emitters';
import { ToastType, useToast } from '../../../utils';
import {
    CrownIcon,
    EmptyCheckbox,
    FillCheckbox,
    MainButton,
    ModalContent,
    PlayIcon,
    ReadyButton,
    StartButton,
    ToggleReadyButton,
    UserCheck,
    UserIcon,
} from './style';

const ActionButton = () => {
    const { room } = useRoom();
    const { user } = useUser();
    const history = useHistory();
    const [groupModalVisible, setGroupModalVisible] = useState(false);
    const [swipeModalVisible, setSwipeModalVisible] = useState(false);
    const owner = room.participants.find((p) => p.id === room.ownerId);
    const isUserReady = room.participants.find((p) => p.id === user.id)?.ready;
    const participantsReady = room.participants.filter((p) => p.ready && p.id !== room.ownerId);
    const disableSwiping = !room.movies.length || !participantsReady.length;
    const toastId = useRef<string>();
    const timeoutId = useRef<number>();

    const toggleReadyHandler = () => {
        if (toastId.current) {
            toast.dismiss(toastId.current);
        }
        clearTimeout(timeoutId.current);
        toggleReady({ roomId: room.roomId as string, userId: user.id }, (res) => {
            if (res.success && !isUserReady) {
                useToast({ type: ToastType.Success, message: 'The room owner has been notified.', duration: 2500 });
                timeoutId.current = window.setTimeout(
                    () =>
                        (toastId.current = useToast({
                            type: ToastType.Loading,
                            message: 'Waiting for room owner to start.',
                            duration: 99999,
                        })),
                    2500,
                );
            }
        });
    };

    const confirmSwipeAction = () => {
        startSwiper({ roomId: room.roomId as string });
        history.replace(`/swiper/${room.roomId}`);
    };

    const startSwiping = () => {
        if (!disableSwiping) {
            setSwipeModalVisible(true);
            return;
        }

        if (room.participants.length <= 1) {
            useToast({ type: ToastType.Custom, message: 'Invite participants to start.' });
            return;
        }

        if (!room.movies.length) {
            useToast({ type: ToastType.Custom, message: 'Add movies to your list to start swiping.' });
            return;
        }

        if (!participantsReady.length) {
            useToast({ type: ToastType.Custom, message: 'Wait for participants to be ready.' });
        }
    };

    const checkReady = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setGroupModalVisible(true);
    };

    useEffect(() => {
        return () => {
            if (toastId.current) {
                toast.dismiss(toastId.current);
                toastId.current = undefined;
            }
        };
    }, []);

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
                        {isUserReady ? <FillCheckbox /> : <EmptyCheckbox />}
                        Ready To Swipe
                    </ToggleReadyButton>
                )}
            </FixedContainer>
            <Modal visible={groupModalVisible} onClose={() => setGroupModalVisible(false)} height={300} maxWidth={400}>
                <ModalContent>
                    <h2>Participants</h2>
                    <ul>
                        {room.participants.map((p) => {
                            if (p.id === room.ownerId) {
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
            <Modal visible={swipeModalVisible} onClose={() => setSwipeModalVisible(false)} height={280} maxWidth={400}>
                <ModalContent>
                    <h2>Start Swiping</h2>
                    <ol>
                        <li>This action will move everyone in the group to the swiping stage.</li>
                        <br />
                        <li>Once in this stage, group members won&apos;t be allowed to go back and add more movies.</li>
                    </ol>
                    <StartButton onClick={confirmSwipeAction}>Start</StartButton>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ActionButton;
