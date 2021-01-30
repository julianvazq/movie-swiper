import React, { useEffect } from 'react';
import { useRoom } from './context';
import './App.css';
import Home from './pages/home/Home';
import Nav from './pages/shared/Nav';
import { emitTest } from './sockets/emitters';
import { socket } from './sockets';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AppContainer from './pages/shared/AppContainer';
import Create from './pages/create/Create';

const App = () => {
    const {} = useRoom();
    useEffect(() => {
        // console.log(emitTest());

        socket.on('connect', () => {
            console.log('client connected');
        });

        socket.on('test-response', () => {
            console.log('test client response');
        });

        // socket.emit('test');
        // return () => socket.off();
    }, []);

    console.log(socket);
    const emit = () => {
        emitTest({ hello: 'hi' });
    };

    return (
        <Router>
            <AppContainer>
                <Nav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create" exact component={Create} />
                    {/* <Route path="/selection" exact component={} /> */}
                    {/* <Route path="/swiper" exact component={} /> */}
                    {/* <Route path="/results" exact component={} /> */}
                    {/* <Route component={} /> */}
                </Switch>
                <button onClick={emit}>Emit</button>
            </AppContainer>
        </Router>
    );
};

export default App;
