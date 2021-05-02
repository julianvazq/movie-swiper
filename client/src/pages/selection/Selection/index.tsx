import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { FontWeight600, Subtitle, Title } from '../../../styles';
import InviteLink from '../../shared/InviteLink';
import ActionButton from '../ActionButton';
import MovieSelection from '../MovieSelection';
import { Container } from './style';

const ownerText = (
    <>
        Add movies that you&apos;d want to watch. Once the list is complete and members are ready, click on &quot;
        <FontWeight600>Start Swiping</FontWeight600>.&quot;
    </>
);
const participantText = (
    <>
        Add movies that you&apos;d want to watch. Once you&apos;re ready to start, click on &quot;
        <FontWeight600>Ready to Swipe</FontWeight600>.&quot;
    </>
);

const Selection = () => {
    const { user } = useUser();
    const { room } = useRoom();
    const isOwner = room.ownerId === user.id;

    return (
        <Container>
            <Title>Pick Your Movies</Title>
            <Subtitle>{isOwner ? ownerText : participantText}</Subtitle>
            <InviteLink />
            <MovieSelection />
            <ActionButton />
        </Container>
    );
};

export default Selection;
