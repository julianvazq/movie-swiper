import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { socket } from '../../../sockets';
import { checkRoom, joinRoom } from '../../../sockets/emitters';
import { Title } from '../../../styles';
import { ActionType } from '../../../types/actions';

interface Props {
    component: React.ElementType;
    computedMatch?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const ProtectedRoute = ({ component: Component, computedMatch, ...rest }: Props) => {
    const { room, dispatch } = useRoom();
    const { user } = useUser();
    const history = useHistory();
    const roomId = computedMatch.params.id;
    const path = computedMatch.url.split('/')[1];
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

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
                            setStatus('success');
                        } else {
                            setStatus('error');
                        }
                    });
                    /* If username is not set, go to Join screen to set it */
                } else {
                    history.replace(`/join/${roomId}`);
                }
            } else {
                setStatus('success');
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
