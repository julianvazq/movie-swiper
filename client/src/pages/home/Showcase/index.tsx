import React from 'react';
import MovieCardDisplay from '../MovieCardDisplay';
import * as S from './style';

const Showcase = () => {
    return (
        <S.Container>
            <S.Content>
                <h2>See movie details</h2>
                <p>Want to learn more about a movie before casting your vote? No problem.</p>
                <p>Tap on a movie to see more details, including:</p>
                <ul>
                    <li>Description</li>
                    <li>Runtime</li>
                    <li>Rating</li>
                    <li>Genres</li>
                    <li>Trailer</li>
                </ul>
                <p>Try it out, tap on the movie card.</p>
            </S.Content>
            <MovieCardDisplay />
        </S.Container>
    );
};

export default Showcase;
