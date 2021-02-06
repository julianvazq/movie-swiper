import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { checkRoom, joinRoom } from '../../../sockets/emitters';
import { Title } from '../../../styles';
import { ActionType } from '../../../types/actions';

interface Props {
    component: React.ElementType;
    computedMatch?: any;
    [key: string]: any;
}

const ProtectedRoute = ({ component: Component, computedMatch, ...rest }: Props) => {
    const { room } = useRoom();
    const { user } = useUser();
    const history = useHistory();
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const roomId = computedMatch.params.id;
    const path = computedMatch.url.split('/')[1];

    useEffect(() => {
        try {
            new Promise((resolve) => setTimeout(resolve, 3000));
            const userNotInRoom = room.roomId !== roomId;
            if (userNotInRoom) {
                /* Check if room exists */
                checkRoom({ roomId }, (res) => {
                    if (!res.success) {
                        history.replace('/expired');
                    }
                });
                /* If username is already set, join room */
                if (user.name) {
                    console.log('ROOMMMMM', room);
                    joinRoom({ roomId, user }, (res) => {
                        console.log('join res', res);
                        if (res.success) {
                            setTimeout(() => setStatus('success'), 1000);
                        } else {
                            setStatus('error');
                        }
                    });
                    /* If username is not set, go to Join screen to set it */
                } else {
                    history.replace(`/join/${roomId}`);
                }
            } else {
                setTimeout(() => setStatus('success'), 1000);
            }
        } catch (error) {
            console.log(error);
            setStatus('error');
        }
    }, [computedMatch.params.id, user]);

    useEffect(() => {
        if (room.roomId && path !== room.stage) {
            history.replace(`/${room.stage}/${roomId}`);
        }
    }, [room.stage]);

    if (status === 'loading') {
        return <Title>Loading...</Title>;
    }

    if (status === 'error') {
        return <Title>Could not join. Please try again.</Title>;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
