import React, { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { Movie } from '../types/movies';

type Props = {
    children: ReactNode;
};

interface ContextProps {
    movieDetail: Movie | null;
    setMovieDetail: (value: Movie | null) => void;
}
export const MovieDetailContext = createContext<ContextProps>({
    movieDetail: null,
    setMovieDetail: () => ({}),
});

export const useMovieDetail = () => {
    return useContext(MovieDetailContext);
};

const MovieDetailProvider = ({ children }: Props) => {
    const [movieDetail, setMovieDetail] = useState<Movie | null>(null);

    return (
        <MovieDetailContext.Provider value={{ movieDetail, setMovieDetail }}>{children}</MovieDetailContext.Provider>
    );
};

export default MovieDetailProvider;
