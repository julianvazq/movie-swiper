import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import Nav from './pages/shared/Nav';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AppContainer from './pages/shared/AppContainer';
import Create from './pages/create/Create';
import Selection from './pages/selection/Selection';
import ProtectedRoute from './pages/shared/ProtectedRoute';
import Join from './pages/join/Join';
import Expired from './pages/expired/Expired';
import Swiper from './pages/swiper/Swiper';
import { Toaster } from 'react-hot-toast';
import { AnimateSharedLayout } from 'framer-motion';

const App = () => {
    return (
        <Router>
            <AppContainer>
                <AnimateSharedLayout type="crossfade">
                    <Toaster />
                    <Nav />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/create" component={Create} />
                        <Route path="/join/:id" component={Join} />
                        <Route path="/expired" component={Expired} />
                        <ProtectedRoute path={['/selection/:id/:movieId', '/selection/:id']} component={Selection} />
                        <ProtectedRoute path="/swiper/:id" component={Swiper} />
                        {/* <Route path="/results/:id" component={} /> */}
                        <Route component={Home} />
                    </Switch>
                </AnimateSharedLayout>
            </AppContainer>
        </Router>
    );
};

export default App;
