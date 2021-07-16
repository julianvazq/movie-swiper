import React from 'react';
import { ButtonContainer, Container, PlusIcon } from './style';

const MovieCardSkeleton = () => {
    return (
        <Container>
            <ButtonContainer>
                <PlusIcon />
            </ButtonContainer>
        </Container>
    );
};

export default MovieCardSkeleton;
