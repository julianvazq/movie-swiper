import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import InviteLink from '../../../components/InviteLink';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { FontWeight600, Subtitle, Title } from '../../../styles';
import { ToastType, useToast } from '../../../utils';
import ActionButton from '../ActionButton';
import MovieSelection from '../MovieSelection';
import { Container } from './style';

const ownerText = (
    <>
        Add movies you&apos;d want to watch. Once the list is complete and members are ready, tap on &quot;
        <FontWeight600>Start Swiping</FontWeight600>.&quot;
    </>
);
const participantText = (
    <>
        Add movies you&apos;d want to watch. Once you&apos;re ready to start, tap on
        <FontWeight600>Ready to Swipe</FontWeight600>.
    </>
);

const Selection = () => {
    const { user } = useUser();
    const { room } = useRoom();
    const isOwner = room.ownerId === user.id;

    useEffect(() => {
        let toastId: string;
        const timeoutId = window.setTimeout(() => {
            toastId = useToast({
                type: ToastType.Custom,
                message: 'Invite others by sharing the link to this page.',
                duration: 8000,
            });
        }, 1000);
        return () => {
            if (toastId) {
                toast.dismiss(toastId);
            }
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <Container>
            <Helmet>
                <title>Selection | Movie Swiper</title>
            </Helmet>
            <Title>Pick Your Movies</Title>
            <Subtitle>{isOwner ? ownerText : participantText}</Subtitle>
            <InviteLink />
            <MovieSelection />
            <ActionButton />
        </Container>
    );
};

export default Selection;
