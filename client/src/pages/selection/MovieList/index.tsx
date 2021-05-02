import React from 'react';
import { AddedMovie } from '../../../types/movies';
import MovieListItem from '../MovieListItem';
import { Empty, List } from './styled';

interface Props {
    movies: AddedMovie[];
    allowActions: boolean;
}

const MovieList = ({ movies, allowActions }: Props) => {
    if (!movies.length) {
        return <Empty>No movies in the list.</Empty>;
    }

    return (
        <List>
            {movies.map((movie) => (
                <MovieListItem key={movie.id} movie={movie} allowActions={allowActions} />
            ))}
        </List>
    );
};

export default MovieList;
