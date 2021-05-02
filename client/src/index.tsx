import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MoviePreviewProvider from './context/MoviePreviewContext';
import RoomProvider from './context/RoomContext';
import UserProvider from './context/UserContext';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <RoomProvider>
                <MoviePreviewProvider>
                    <App />
                </MoviePreviewProvider>
            </RoomProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
