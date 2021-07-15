import React, { useEffect, useState } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { checkRoom, createRoom, joinRoom } from '../../../sockets/emitters';
import { Title } from '../../../styles';
import { ActionType } from '../../../types/actions';
import { Stage } from '../../../types/room';

interface Props {
    component: React.ElementType;
    computedMatch?: any;
    location?: RouteProps['location'];
    path?: RouteProps['path'];
}

const ProtectedRoute = ({ component: Component, computedMatch, ...rest }: Props) => {
    const { room, dispatch } = useRoom();
    const { user } = useUser();
    const history = useHistory();
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
    const roomId = computedMatch.params.id;
    const path = computedMatch.url.split('/')[1];

    useEffect(() => {
        try {
            console.log(room.roomId, roomId);
            if (!roomId) return history.replace('/expired');
            /* Check if room exists */
            checkRoom({ roomId }, (res) => {
                if (res.success) {
                    /* If username is already set, join room */
                    if (user.name) {
                        joinRoom({ roomId, user }, (res) => {
                            if (res.success) {
                                setStatus('success');
                            } else {
                                setStatus('error');
                            }
                        });
                        /* If username is not set, go to Join screen to set it */
                    } else {
                        return history.replace(`/join/${roomId}`);
                    }
                } else {
                    if (!room.roomId) return history.replace('/create');

                    createRoom({ roomId }, (res) => {
                        if (!res.success) return;

                        dispatch({
                            type: ActionType.GET_ROOM,
                            payload: { room },
                        });
                        return history.push(`/selection/${roomId}`);
                    });
                }
            });
            setStatus('success');
        } catch (error) {
            console.log(error);
            setStatus('error');
        }
    }, [computedMatch.params.id, user]);

    useEffect(() => {
        const swipedAll =
            room.movies.length > 0 &&
            room.movies.every((movie) => movie.swipes.find((swipe) => swipe.user.id === user.id));
        if (room.roomId && swipedAll) {
            history.replace(`/${Stage.RESULTS}/${roomId}`);
            return;
        }

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

    return <Component {...computedMatch} {...rest} />;
};

export default ProtectedRoute;
