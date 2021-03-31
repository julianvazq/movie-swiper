import React from 'react';
import { AddedMovie } from '../../../types/movies';
import ResultCard from '../ResultCard';
import { List, Empty } from './style';

interface Props {
    movies: AddedMovie[];
}

const ResultList = ({ movies }: Props) => {
    if (!movies.length) {
        return <Empty>No matches yet.</Empty>;
    }

    return (
        <List>
            {movies.map((movie) => (
                <ResultCard key={movie.id} movie={movie} />
            ))}
        </List>
    );
};

export default ResultList;
