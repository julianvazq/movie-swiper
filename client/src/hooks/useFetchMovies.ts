import React, { useState } from 'react';
import { Genre } from '../types/movies';

interface Props {
    genres: Genre[];
    movieQuery: string;
}

const useFetchMovies = ({ genres, movieQuery }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movies, setMovies] = useState({});
    return { loading, error, movies };
};

export default useFetchMovies;
