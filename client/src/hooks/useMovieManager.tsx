/* eslint-disable react/display-name */
import React from 'react';
import { useRoom } from '../context/RoomContext';
import { useUser } from '../context/UserContext';
import { addMovie, removeMovie } from '../sockets/emitters';
import { AddedMovie, Movie } from '../types/movies';
import toast from 'react-hot-toast';
import { ToastType, useToast } from '../utils';
import { FontWeight600 } from '../styles';

const useMovieManager = (movie: Movie) => {
    const { room } = useRoom();
    const { user } = useUser();
    const movieInList = room.movies.find((m) => m.id === movie.id);
    const addedByMe = movieInList?.addedByUserId === user.id;

    const movieActionHandler = () => {
        if (!movieInList) {
            const addedMovie: AddedMovie = { ...movie, addedByUserId: user.id, swipes: [] };
            addMovie({ roomId: room.roomId as string, movie: addedMovie }, (res) => {
                if (res.success) {
                    useToast({
                        type: ToastType.Success,
                        message: () => (
                            <>
                                <span>
                                    Added <FontWeight600>{movie.title}</FontWeight600>.
                                </span>
                            </>
                        ),
                    });
                } else {
                    useToast({
                        type: ToastType.Error,
                        message: () => (
                            <>
                                <span>
                                    There was a problem adding <FontWeight600>{movie.title}</FontWeight600>.
                                </span>
                            </>
                        ),
                    });
                    toast.error(`There was a problem adding ${movie.title}.`);
                }
            });
        } else if (movieInList && !addedByMe) {
            useToast({
                type: ToastType.Custom,
                message: () => (
                    <span>
                        <FontWeight600>{movie.title}</FontWeight600> can only be removed by the person who added it.
                    </span>
                ),
            });
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
            return 'var(--red)';
        }
    };

    return { movieActionHandler, buttonBackgroundColor: getButtonBackgroundColor(), movieInList };
};

export default useMovieManager;
