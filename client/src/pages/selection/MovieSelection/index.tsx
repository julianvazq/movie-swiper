import React from 'react';
import Tabs from '../../../components/Tabs';
import { useRoom } from '../../../context/RoomContext';
import MovieList from '../MovieList';
import MovieSearch from '../MovieSearch';

const MovieSelection = () => {
    const { room } = useRoom();
    return (
        <Tabs tabs={['Search', `Movie List (${room.movies.length})`]}>
            <MovieSearch />
            <MovieList movies={room.movies} allowActions />
        </Tabs>
    );
};

export default MovieSelection;
