import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMoviePreview } from '../../../context/MoviePreviewContext';
import { Movie } from '../../../types/movies';
import { generateImageUrl } from '../../../utils';
import * as S from './style';

const placeholderMovie = {
    adult: false,
    backdrop_path: '/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg',
    genre_ids: [28, 878],
    id: 399566,
    original_language: 'en',
    original_title: 'Godzilla vs. Kong',
    overview:
        'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.',
    popularity: 4459.297,
    poster_path: '/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
    release_date: '2021-03-24',
    title: 'Godzilla vs. Kong',
    video: false,
    vote_average: 8.3,
    vote_count: 4838,
};

const MovieCardDisplay = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const imageUrl = movie && generateImageUrl(movie.poster_path, 'w342');
    const { setMoviePreview } = useMoviePreview();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                const res = await axios.get('/movies/random');

                if (res.status === 200) {
                    setMovie(res.data);
                }
            } catch (error) {
                console.log(error);
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, []);

    if (!movie || !imageUrl) return null;

    return (
        <S.Button onClick={() => setMoviePreview(movie)}>
            <S.Image src={imageUrl} alt={`Movie poster for ${movie?.title}.`} />
            <S.ButtonSection>
                <S.InfoIcon />
                See Details
            </S.ButtonSection>
        </S.Button>
    );
};

export default MovieCardDisplay;
