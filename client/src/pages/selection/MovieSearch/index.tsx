import React, { useState } from 'react';
import { OptionsType } from 'react-select';
import useFetchMovies from '../../../hooks/useFetchMovies';
import { Genre } from '../../../types/movies';
import MovieGallery from '../MovieGallery';
import { genres as allGenres } from './genres';
import { colorStyles, FormField, StyledSelect } from './style';

const MovieSearch = () => {
    const [genres, setGenres] = useState<number[]>([]);
    const [movieQuery, setMovieQuery] = useState('');
    const { loading, error, movies } = useFetchMovies({ genres, movieQuery });
    const genreOptions = allGenres.map((genre: Genre) => ({ value: genre.id, label: genre.name }));
    const moviesOnDisplay = movieQuery ? movies.query : movies.genres;

    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieQuery(e.target.value);
    };

    const onGenreChange = (
        value: OptionsType<{
            value: number;
            label: string;
        }>,
    ) => {
        setGenres(value.map((genre) => genre.value));
    };

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    return (
        <section>
            <form>
                <FormField show={true}>
                    <label>Search by name</label>
                    <input type="text" value={movieQuery} onChange={onQueryChange} onFocus={onFocus} />
                </FormField>
                <FormField show={movieQuery === ''}>
                    <label>Search by genre</label>
                    <StyledSelect
                        isMulti
                        name="genres"
                        options={genreOptions}
                        styles={colorStyles}
                        onChange={onGenreChange}
                    />
                </FormField>
            </form>
            <MovieGallery movies={moviesOnDisplay} loading={loading} />
        </section>
    );
};

export default MovieSearch;
