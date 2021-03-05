import React from 'react';
import { AddedMovie } from '../../../types/movies';
import MovieListItem from '../MovieListItem';
import { List } from './styled';

interface Props {
    movies: AddedMovie[];
}

const MovieList = ({ movies }: Props) => {
    if (!movies.length) {
        return <p>No movies added to your list yet.</p>;
    }

    return (
        <List>
            {movies.map((movie) => (
                <MovieListItem key={movie.id} movie={movie} />
            ))}
        </List>
    );
};

export default MovieList;
