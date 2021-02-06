import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Nav from './pages/shared/Nav';
import { emitTest } from './sockets/emitters';
import { socket } from './sockets';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AppContainer from './pages/shared/AppContainer';
import Create from './pages/create/Create';
import Selection from './pages/selection/Selection';
import ProtectedRoute from './pages/shared/ProtectedRoute';
import Join from './pages/join/Join';
import Expired from './pages/expired/Expired';
import { onGetRoom, onParticipantJoin } from './sockets/listeners';
import { useRoom } from './context/RoomContext';
import Swiper from './pages/swiper/Swiper';

const App = () => {
    return (
        <Router>
            <AppContainer>
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create" component={Create} />
                    <Route path="/join/:id" component={Join} />
                    <Route path="/expired" component={Expired} />
                    <ProtectedRoute path="/selection/:id" component={Selection} />
                    <ProtectedRoute path="/swiper/:id" component={Swiper} />
                    {/* <Route path="/results/:id" component={} /> */}
                    <Route component={Home} />
                </Switch>
                {/* <button onClick={emit}>Emit</button> */}
            </AppContainer>
        </Router>
    );
};

export default App;
