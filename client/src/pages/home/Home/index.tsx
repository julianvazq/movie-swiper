import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const navigate = () => {
        history.push('/create');
    };
    return (
        <>
            <div>Landing Page</div>
            <button onClick={navigate}>Get Started</button>
        </>
    );
};

export default Home;
