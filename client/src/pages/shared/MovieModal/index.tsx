import React from 'react';
import { Movie } from '../../../../../server/src/types/movies';
import { Title } from '../../../styles';
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
