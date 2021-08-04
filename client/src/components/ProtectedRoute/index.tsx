import React, { useEffect, useState } from 'react';
import { RouteProps, useHistory } from 'react-router-dom';
import { useRoom } from '../../context/RoomContext';
import { useUser } from '../../context/UserContext';
import { checkRoom, createRoom, joinRoom } from '../../sockets/emitters';
import { ActionType } from '../../types/actions';
import { Stage } from '../../types/room';
import * as S from './style';

interface Props {
    component: React.ElementType;
    computedMatch?: any;
    location?: RouteProps['location'];
    path?: RouteProps['path'];
}

enum Status {
    LOADING,
    ERROR,
    SUCCESS,
}

const ProtectedRoute = ({ component: Component, computedMatch, ...rest }: Props) => {
    const { room, dispatch } = useRoom();
    const { user } = useUser();
    const history = useHistory();
    const [status, setStatus] = useState<Status>(Status.LOADING);
    const roomId = computedMatch.params.id;
    const path = computedMatch.url.split('/')[1];

    useEffect(() => {
        try {
            if (!roomId) return history.replace('/expired');
            /* Check if room exists */
            checkRoom({ roomId }, (res) => {
                if (res.success) {
                    /* If username is already set, join room */
                    if (user.name) {
                        joinRoom({ roomId, user }, (res) => {
                            if (res.success) {
                                setStatus(Status.SUCCESS);
                            } else {
                                setStatus(Status.ERROR);
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
                setStatus(Status.SUCCESS);
            });
        } catch (error) {
            console.log(error);
            setStatus(Status.ERROR);
        }
    }, [computedMatch.params.id]);

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

    if (status === Status.LOADING) {
        return (
            <S.Container>
                <S.Text>Joining room</S.Text>
                <S.LoadingDots />
            </S.Container>
        );
    }

    if (status === Status.ERROR) {
        return (
            <S.Container>
                <S.Text>Could not join room. Refresh the page to try again.</S.Text>
            </S.Container>
        );
    }

    return <Component {...computedMatch} {...rest} />;
};

export default ProtectedRoute;
