import React from 'react';
import FixedContainer from '../../shared/FixedContainer';
import { LikeButton, DislikeButton } from './style';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRoom } from '../../../context/RoomContext';
import { generateImageUrl } from '../../../utils';
import SwipeImage from '../SwipeImage';

const SwipeArea = () => {
    const { room } = useRoom();
    return (
        <>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: false }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {room.movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <SwipeImage movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <FixedContainer>
                <DislikeButton>Dislike</DislikeButton>
                <LikeButton>Like</LikeButton>
            </FixedContainer>
        </>
    );
};

export default SwipeArea;
