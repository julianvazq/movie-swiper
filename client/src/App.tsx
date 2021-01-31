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

const App = () => {
    useEffect(() => {
        // console.log(emitTest());
        // socket.on('connect', () => {
        //     console.log('client connected');
        // });
        // socket.on('test-response', () => {
        //     console.log('test client response');
        // });
        // socket.emit('test');
        // return () => socket.off();
    }, []);

    // const emit = () => {
    //     emitTest({ hello: 'hi' });
    // };

    return (
        <Router>
            <AppContainer>
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create" component={Create} />
                    <ProtectedRoute path="/join/:id" component={Join} />
                    <ProtectedRoute path="/selection/:id" component={Selection} />
                    {/* <Protecte path="/swiper" exact component={} /> */}
                    {/* <Route path="/results" exact component={} /> */}
                    <Route component={Home} />
                </Switch>
                {/* <button onClick={emit}>Emit</button> */}
            </AppContainer>
        </Router>
    );
};

export default App;
