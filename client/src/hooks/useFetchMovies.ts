import axios from 'axios';
import { useEffect, useState } from 'react';
import { MovieResponse } from '../types/movies';

interface Props {
    genres: number[];
    movieQuery: string;
}

interface FetchedMovies {
    query: MovieResponse;
    genres: MovieResponse;
}

const emptyResponse: MovieResponse = {
    page: 0,
    results: [],
    total_results: 0,
    total_pages: 0,
};

const useFetchMovies = ({ genres, movieQuery }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<true | null>(null);
    const [movies, setMovies] = useState<FetchedMovies>({ query: emptyResponse, genres: emptyResponse });
    const cancelToken = axios.CancelToken.source();

    const fetchMovieQuery = async (url: string) => {
        try {
            const res = await axios.get(url, {
                cancelToken: cancelToken.token,
            });
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            cancelToken.cancel('Error in try catch block.');
        }
    };

    useEffect(() => {
        const fetch = async () => {
            if (movieQuery) {
                try {
                    setLoading(true);
                    const res = await axios.get(`/movies/query/${movieQuery}`, {
                        cancelToken: cancelToken.token,
                    });
                    if (res.status === 200) {
                        setMovies({ ...movies, query: res.data });
                    }
                    setLoading(false);
                } catch (error) {
                    cancelToken.cancel('Error in try catch block.');
                    setError(true);
                    setLoading(false);
                }
            }
        };

        fetch();

        return () => {
            cancelToken.cancel('Component got unmounted');
        };
    }, [movieQuery]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await axios.post('/movies/genres', {
                    genres,
                    cancelToken: cancelToken.token,
                });

                if (res.status === 200) {
                    setMovies({ ...movies, genres: res.data });
                }
                setLoading(false);
            } catch (error) {
                cancelToken.cancel('Error in try catch block.');
                setError(true);
                setLoading(false);
            }
        };

        fetch();

        return () => {
            cancelToken.cancel('Component got unmounted');
        };
    }, [genres]);

    return { loading, error, movies };
};

export default useFetchMovies;
