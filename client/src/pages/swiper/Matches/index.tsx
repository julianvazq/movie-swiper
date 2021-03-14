import React from 'react';
import { useLocation } from 'react-router-dom';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import { AddedMovie } from '../../../types/movies';
import MovieList from '../../selection/MovieList';

const Matches = () => {
    const location = useLocation();
    const { room } = useRoom();
    const { user } = useUser();

    const matches = room.movies.reduce((matches: AddedMovie[], movie: AddedMovie) => {
        const matched =
            movie.swipes.find((swipe) => swipe.userId === user.id && swipe.liked) &&
            movie.swipes.find((swipe) => swipe.liked && swipe.userId !== user.id);

        if (matched) {
            matches.push(movie);
        }

        return matches;
    }, []);

    return <MovieList movies={matches} />;
};

export default Matches;
