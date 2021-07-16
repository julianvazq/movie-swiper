import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import MoviePreviewProvider from './context/MoviePreviewContext';
import RoomProvider from './context/RoomContext';
import UserProvider from './context/UserContext';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <UserProvider>
                <RoomProvider>
                    <MoviePreviewProvider>
                        <App />
                    </MoviePreviewProvider>
                </RoomProvider>
            </UserProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
);
