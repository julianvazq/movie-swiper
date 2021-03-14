import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RoomProvider from './context/RoomContext';
import UserProvider from './context/UserContext';
import MovieDetailProvider from './context/MovieDetailContext';

ReactDOM.render(
    <React.StrictMode>
        <RoomProvider>
            <UserProvider>
                <MovieDetailProvider>
                    <App />
                </MovieDetailProvider>
            </UserProvider>
        </RoomProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
