import React, { useRef, useState, useEffect } from 'react';
import { useRoom } from '../../../context/RoomContext';
import SwipeImage from '../SwipeImage';
import { LikeButton, DislikeButton, LikeIcon, DislikeIcon } from './style';
import FixedContainer from '../../shared/FixedContainer';
import { likeMovie } from '../../../sockets/emitters';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Pagination, A11y, EffectCoverflow, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { CoverflowEffectOptions } from 'swiper/types/components/effect-coverflow';
import { useUser } from '../../../context/UserContext';
SwiperCore.use([Pagination, A11y, EffectCoverflow, EffectFade]);

const coverFlowEffectProps: CoverflowEffectOptions = {
    rotate: 50,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: false,
};

const paginationProps: PaginationOptions = {
    clickable: false,
    type: 'progressbar',
    progressbarFillClass: 'swiper-pagination-progressbar-fill',
};

const SwipeArea = () => {
    const { room } = useRoom();
    const { user } = useUser();
    const [swiper, setSwiper] = useState<SwiperCore>();

    const onLike = () => {
        if (!swiper) {
            return;
        }

        if (swiper.isEnd) {
            console.log('navigating to results...');
            /* Navigate to results */
            return;
        }

        const nextIndex = swiper.activeIndex + 1;
        swiper.slideTo(nextIndex);
        swiper.updateProgress();
        // likeMovie({ roomId: room.roomId as string, movieId: movie.id });
    };

    const onSlideNextTransitionStart = (swiper: SwiperCore) => {
        if (!swiper) {
            return;
        }

        if (swiper.isEnd) {
            console.log('navigating to results...');
            /* Navigate to results */
            return;
        }

        // likeMovie({ roomId: room.roomId as string, movieId: movie.id });
        swiper.updateProgress();
    };

    const onDislike = () => {
        if (!swiper) {
            return;
        }

        if (swiper.isEnd) {
            console.log('navigating to results...');
            /* Navigate to results */
            return;
        }

        console.log('dislike', swiper);
        const nextIndex = swiper.activeIndex + 1;
        swiper.slideTo(nextIndex);
        swiper.updateProgress();
    };

    const onSlidePrevTransitionStart = (swiper: SwiperCore) => {
        if (!swiper) {
            return;
        }
        const lastSlide = swiper.previousIndex === 4;
        if (lastSlide) {
            console.log('navigating to results...');
            swiper.slideTo(swiper.activeIndex + 1);
            /* Navigate to results */
            return;
        }

        const nextIndex = swiper.activeIndex + 2;
        console.log(nextIndex);
        console.log('swipe prev', swiper);
        swiper.slideTo(nextIndex);
        swiper.updateProgress();
    };

    const onSwiperInit = (swiper: SwiperCore) => {
        const actualProgress = 1 / room.movies.length;
        document.documentElement.style.setProperty('--progress-bar', actualProgress.toString());
        setSwiper(swiper);
    };

    const onProgress = (swiper: SwiperCore) => {
        const actualProgress = (1 / room.movies.length) * swiper.activeIndex;
        document.documentElement.style.setProperty('--progress-bar', actualProgress.toString());
    };

    return (
        <>
            {!!room.movies.length && (
                <Swiper
                    onSlidePrevTransitionStart={onSlidePrevTransitionStart}
                    onSlideNextTransitionStart={onSlideNextTransitionStart}
                    onProgress={onProgress}
                    onInit={onSwiperInit}
                    initialSlide={1}
                    observer
                    grabCursor
                    centeredSlides
                    spaceBetween={5000}
                    effect="coverflow"
                    coverflowEffect={coverFlowEffectProps}
                    pagination={paginationProps}
                >
                    <SwiperSlide></SwiperSlide>
                    {room.movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <SwipeImage movie={movie} />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide></SwiperSlide>
                </Swiper>
            )}
            <FixedContainer>
                <DislikeButton onClick={onDislike}>
                    <DislikeIcon />
                    Dislike
                </DislikeButton>
                <LikeButton onClick={onLike}>
                    <LikeIcon />
                    Like
                </LikeButton>
            </FixedContainer>
        </>
    );
};

export default SwipeArea;
