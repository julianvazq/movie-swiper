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

    console.log(computedMatch);
    useEffect(() => {
        try {
            if (room.roomId !== roomId) {
                checkRoom({ roomId }, (res) => {
                    console.log('protected: ', res);
                    if (!res.success) {
                        history.replace('/expired');
                    }
                });

                if (user.name) {
                    joinRoom({ roomId, user }, (res) => {
                        console.log('join res', res);
                    });
                }
            }

            console.log('stage', room.stage);
            if (room.stage) {
            }

            console.log(user);
            setStatus('success');
            return () => setStatus('success');
        } catch (error) {
            console.log(error);
            setStatus('error');
        }
    }, [computedMatch.params.id, user.id]);

    useEffect(() => {
        if (room.roomId && path !== room.stage) {
            history.replace(`/${room.stage}/${roomId}`);
        }
    }, [room.stage]);

    if (status === 'loading') {
        return <Title>Loading...</Title>;
    }

    if (status === 'error') {
        return <Title>Something went wrong...</Title>;
    }

    if (!user.name) {
        return <Redirect to={`/join/${roomId}`} />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
