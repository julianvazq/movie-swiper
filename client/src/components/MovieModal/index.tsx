import React from 'react';
import { Title } from '../../styles';
import { Movie } from '../../types/movies';
import Modal from '../Modal';

interface Props {
    movie: Movie;
    visible: boolean;
    onClose: () => void;
    loading: boolean;
}

const MovieModal = ({ movie, visible, onClose, loading }: Props) => {
    return (
        <Modal visible={visible} onClose={onClose}>
            <>
                <Title>{movie.title}</Title>
                {loading && 'Loading...'}
            </>
        </Modal>
    );
};

export default MovieModal;
