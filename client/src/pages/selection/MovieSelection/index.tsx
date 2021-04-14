import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import Tabs from '../../shared/Tabs';
import MovieList from '../MovieList';
import MovieSearch from '../MovieSearch';

const MovieSelection = () => {
    const { room } = useRoom();
    return (
        <Tabs tabs={['Search', `Group List (${room.movies.length})`]}>
            <MovieSearch />
            <MovieList movies={room.movies} allowActions />
        </Tabs>
    );
};

export default MovieSelection;
