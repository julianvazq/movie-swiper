import React, { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { Movie } from '../types/movies';

type Props = {
    children: ReactNode;
};

interface ContextProps {
    moviePreview: Movie | null;
    setMoviePreview: (value: Movie | null) => void;
}
export const MoviePreviewContext = createContext<ContextProps>({
    moviePreview: null,
    setMoviePreview: () => ({}),
});

export const useMoviePreview = () => {
    return useContext(MoviePreviewContext);
};

const MoviePreviewProvider = ({ children }: Props) => {
    const [moviePreview, setMoviePreview] = useState<Movie | null>(null);

    return (
        <MoviePreviewContext.Provider value={{ moviePreview, setMoviePreview }}>
            {children}
        </MoviePreviewContext.Provider>
    );
};

export default MoviePreviewProvider;
