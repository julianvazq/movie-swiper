import React, { useState } from 'react';
import useFetchMovies from '../../../hooks/useFetchMovies';
import { Genre } from '../../../types/movies';
import { colorStyles, FormField, StyledSelect } from './style';
import Select, { OptionsType } from 'react-select';
import { genres as allGenres } from './genres';
import MovieGallery from '../MovieGallery';
import ActionButton from '../ActionButton';

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

    return (
        <section>
            {' '}
            <form>
                <FormField show={true}>
                    <label>Search By Name</label>
                    <input type="text" value={movieQuery} onChange={onQueryChange} />
                </FormField>
                <FormField show={movieQuery === ''}>
                    <label>Search By Genre</label>
                    <StyledSelect
                        isMulti
                        name="genres"
                        options={genreOptions}
                        styles={colorStyles}
                        onChange={onGenreChange}
                    />
                </FormField>
            </form>
            {loading && <p>Loading...</p>}
            {!loading && <MovieGallery movies={moviesOnDisplay} />}
        </section>
    );
};

export default MovieSearch;
