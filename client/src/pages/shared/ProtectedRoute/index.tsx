import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { checkRoom } from '../../../sockets/emitters';
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
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

    useEffect(() => {
        try {
            checkRoom({ roomId }, (res) => {
                console.log('protected: ', res);
                if (!res.success) {
                    history.replace('/expired');
                }
            });

            if (room.stage) {
            }

            console.log(user);
            setStatus('success');
            return () => setStatus('success');
        } catch (error) {
            console.log(error);
            setStatus('error');
        }
    }, [computedMatch.params.id]);

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
