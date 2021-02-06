import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import Tabs from '../../shared/Tabs';
import MovieSearch from '../MovieSearch';

const MovieSelection = () => {
    const { room } = useRoom();
    return (
        <Tabs tabs={['Selection', `List (${room.movies.length})`]}>
            <MovieSearch />
            <div>List</div>
        </Tabs>
    );
};

export default MovieSelection;
