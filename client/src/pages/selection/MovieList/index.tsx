import React from 'react';
import { AddedMovie } from '../../../types/movies';
import MovieListItem from '../MovieListItem';
import { List, Empty } from './styled';

interface Props {
    movies: AddedMovie[];
}

const MovieList = ({ movies }: Props) => {
    if (!movies.length) {
        return <Empty>Nothing to see here.</Empty>;
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
