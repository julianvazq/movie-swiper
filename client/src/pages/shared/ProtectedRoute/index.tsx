import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { joinRoom } from '../../../sockets/emitters';
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

    useEffect(() => {
        // const roomId = computedMatch.params.id;
        // joinRoom({ roomId }, (res) => {
        //     console.log(res);
        // });
    }, []);

    if (!user.id) {
        return <Redirect to="/join" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
