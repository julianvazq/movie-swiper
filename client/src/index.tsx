import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RoomProvider from './context/RoomContext';
import UserProvider from './context/UserContext';
import MoviePreviewProvider from './context/MoviePreviewContext';

ReactDOM.render(
    <React.StrictMode>
        <RoomProvider>
            <UserProvider>
                <MoviePreviewProvider>
                    <App />
                </MoviePreviewProvider>
            </UserProvider>
        </RoomProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
