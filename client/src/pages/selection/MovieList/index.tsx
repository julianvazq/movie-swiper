import React from 'react';
import { AddedMovie } from '../../../types/movies';
import MovieListItem from '../MovieListItem';
import { List, Empty } from './styled';

interface Props {
    movies: AddedMovie[];
    allowActions: boolean;
}

const MovieList = ({ movies, allowActions }: Props) => {
    if (!movies.length) {
        return <Empty>Nothing to see here.</Empty>;
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
