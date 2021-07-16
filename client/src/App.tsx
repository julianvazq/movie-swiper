import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AppContainer from './components/AppContainer';
import Footer from './components/Footer';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';
import { useMoviePreview } from './context/MoviePreviewContext';
import Create from './pages/create/Create';
import Expired from './pages/expired/Expired';
import Home from './pages/home/Home';
import Join from './pages/join/Join';
import Results from './pages/results/Results';
import MovieDetail from './pages/selection/MovieDetail';
import Selection from './pages/selection/Selection';
import Swiper from './pages/swiper/Swiper';

const App = () => {
    const { moviePreview } = useMoviePreview();

    return (
        <AnimateSharedLayout type="crossfade">
            <AnimatePresence>{moviePreview && <MovieDetail movie={moviePreview} />}</AnimatePresence>
            <Toaster />
            <Nav />
            <AppContainer>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/create" component={Create} />
                    <Route path="/join/:id" component={Join} />
                    <Route path="/expired" component={Expired} />
                    <ProtectedRoute path={['/selection/:id/:movieId', '/selection/:id']} component={Selection} />
                    <ProtectedRoute path={['/swiper/:id/:movieId', '/swiper/:id']} component={Swiper} />
                    <ProtectedRoute path={['/results/:id/:movieId', '/results/:id']} component={Results} />
                    <Route component={Home} />
                </Switch>
            </AppContainer>
            <Footer />
        </AnimateSharedLayout>
    );
};

export default App;
