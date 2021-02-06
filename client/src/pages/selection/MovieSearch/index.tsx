import React, { useState } from 'react';
import useFetchMovies from '../../../hooks/useFetchMovies';
import { Genre } from '../../../types/movies';
import { FormField } from './style';
import Select from 'react-select';
import { genres as allGenres } from './genres';

const colourStyles = {
    control: (styles: any) => ({ ...styles, backgroundColor: 'white', color: 'var(--dark-blue-bg)' }),
    option: (styles: { [x: string]: any }, { data, isDisabled, isFocused, isSelected }: any) => {
        return {
            ...styles,
            backgroundColor: 'white',
            color: 'var(--dark-blue-bg)',
            cursor: isDisabled ? 'not-allowed' : 'default',
        };
    },
    multiValue: (styles: any, { data }: any) => {
        return {
            ...styles,
            backgroundColor: 'white',
        };
    },
    multiValueLabel: (styles: any, { data }: any) => ({
        ...styles,
        color: 'white',
        backgroundColor: 'var(--dark-blue-bg)',
        padding: '4px 8px',
        borderRadius: '4px',
    }),
    multiValueRemove: (styles: any, { data }: any) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: 'white',
            color: 'var(--dark-blue-bg)',
        },
    }),
};

const MovieResults = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [movieQuery, setMovieQuery] = useState('');
    const { loading, error, movies } = useFetchMovies({ genres, movieQuery });

    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieQuery(e.target.value);
    };

    const genreOptions = allGenres.map((genre: Genre) => ({ value: genre.id, label: genre.name }));
    console.log(genres);
    return (
        <section>
            {' '}
            <FormField>
                <label>Search By Name</label>
                <input type="text" value={movieQuery} onChange={onQueryChange} />
            </FormField>
            <FormField>
                <label>Search By Genre</label>
                <Select isMulti name="genres" options={genreOptions} styles={colourStyles} />
            </FormField>
        </section>
    );
};

export default MovieResults;
