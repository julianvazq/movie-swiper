import React from 'react';
import { useRoom } from '../../../context/RoomContext';
import { AddedMovie } from '../../../types/movies';
import MovieListItem from '../MovieListItem';
import { List } from './styled';

interface Props {
    movies: AddedMovie[];
}

const MovieList = ({ movies }: Props) => {
    return (
        <List>
            {movies.map((movie) => (
                <MovieListItem key={movie.id} movie={movie} />
            ))}
        </List>
    );
};

export default MovieList;
