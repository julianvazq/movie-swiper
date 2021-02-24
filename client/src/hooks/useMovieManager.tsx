import React from 'react';
import { useRoom } from '../context/RoomContext';
import { useUser } from '../context/UserContext';
import { addMovie, removeMovie } from '../sockets/emitters';
import { AddedMovie, Movie } from '../types/movies';
import toast from 'react-hot-toast';

const useMovieManager = (movie: Movie) => {
    const { room } = useRoom();
    const { user } = useUser();
    const movieInList = room.movies.find((m) => m.id === movie.id);
    const addedByMe = movieInList?.addedByUserId === user.id;

    const movieActionHandler = () => {
        if (!movieInList) {
            const addedMovie: AddedMovie = { ...movie, addedByUserId: user.id, matches: [], swiped: false };
            addMovie({ roomId: room.roomId as string, movie: addedMovie }, (res) => {
                if (res.success) {
                    toast.success(`Added ${movie.title}.`);
                } else {
                    toast.error(`There was a problem adding ${movie.title}.`);
                }
            });
        } else if (movieInList && !addedByMe) {
            toast((t) => <span>{movie.title} can only be removed by the person who added it.</span>);
            return;
        } else {
            removeMovie({ roomId: room.roomId as string, movieId: movie.id }, (res) => {
                if (!res.success) {
                    toast.error(`There was a problem removing ${movie.title}.`);
                }
            });
        }
    };

    const getButtonBackgroundColor = (): string => {
        if (!movieInList) {
            return 'hsl(213deg 40% 49%)';
        } else if (movieInList && !addedByMe) {
            return '#5a5f65';
        } else {
            return '#6e3030';
        }
    };

    return { movieActionHandler, buttonBackgroundColor: getButtonBackgroundColor(), movieInList };
};

export default useMovieManager;
