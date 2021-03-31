import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { AddedMovie } from '../../../types/movies';
import MovieList from '../../selection/MovieList';

const Matches = () => {
    const { room } = useRoom();
    const { user } = useUser();

    const matches = room.movies.reduce((matches: AddedMovie[], movie: AddedMovie) => {
        const matched =
            movie.swipes.find((swipe) => swipe.user.id === user.id && swipe.liked) &&
            movie.swipes.find((swipe) => swipe.liked && swipe.user.id !== user.id);

        if (matched) {
            matches.push(movie);
        }

        return matches;
    }, []);

    return <MovieList movies={matches} allowActions={false} />;
};

export default Matches;
