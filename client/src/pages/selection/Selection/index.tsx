import React from 'react';
import { Subtitle, Title } from '../../../styles';
import ActionButton from '../ActionButton';
import MovieSelection from '../MovieSelection';
import { Container } from './style';

type Status = 'loading' | 'error' | 'success';

const Selection = () => {
    // const [status, setStatus] = useState<Status>('loading');

    return (
        <Container>
            <Title>Pick Your Movies</Title>
            <Subtitle>Add movies to the list for you and your group to vote on.</Subtitle>
            {/* {status === 'loading' && <p>Loading...</p>} */}
            {/* {status === 'error' && <p>Sorry, something went wrong. Try refreshing the page.</p>} */}
            <MovieSelection />
            <ActionButton />
        </Container>
    );
};

export default Selection;
