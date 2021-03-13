import React, { useEffect, useRef, useState } from 'react';
import { useRoom } from '../../../context/RoomContext';
import { useUser } from '../../../context/UserContext';
import SwipeImage from '../SwipeImage';
import { LikeButton, DislikeButton, LikeIcon, DislikeIcon } from './style';
import FixedContainer from '../../shared/FixedContainer';
import { swipeMovie } from '../../../sockets/emitters';
import { AddedMovie } from '../../../types/movies';

// Swiper imports
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Pagination, A11y, EffectCoverflow, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { CoverflowEffectOptions } from 'swiper/types/components/effect-coverflow';
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

interface MovieToSwipe extends AddedMovie {
    swiped: boolean;
}

const SwipeArea = () => {
    const { room } = useRoom();
    const { user } = useUser();
    const [swiper, setSwiper] = useState<SwiperCore>();
    const movies = useRef<MovieToSwipe[]>([]);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        movies.current = room.movies.map((movie) => ({ ...movie, swiped: false }));
    }, [room.movies.length]);

    const enableButtons = () => {
        setDisabled(false);
    };

    const disableButtons = () => {
        setDisabled(true);
    };

    const onLike = () => {
        if (!swiper) {
            return;
        }

        const nextIndex = swiper.activeIndex + 1;
        swiper.slideTo(nextIndex);
    };

    const onSlideNextTransitionStart = (swiper: SwiperCore) => {
        disableButtons();

        /* Ignore slideNext on init */
        if (!swiper || swiper.activeIndex === 1) {
            return;
        }

        // console.log('slideNext', swiper);
        const movieIndex = swiper.previousIndex - 1;

        handleSwipeEmit({ index: movieIndex, liked: true });

        swiper.updateProgress();
        swiper.update();

        if (swiper.isEnd) {
            console.log('navigating to results...');
            /* Navigate to results */
            return;
        }
    };

    const onDislike = () => {
        if (!swiper) {
            return;
        }

        const movieIndex = swiper.activeIndex - 1;
        handleSwipeEmit({ index: movieIndex, liked: false });
        const nextIndex = swiper.activeIndex + 1;
        swiper.slideTo(nextIndex, 200);
    };

    const onSlidePrevTransitionStart = (swiper: SwiperCore) => {
        disableButtons();

        if (!swiper) {
            return;
        }

        const movieIndex = swiper.previousIndex - 1;
        handleSwipeEmit({ index: movieIndex, liked: false });

        const nextIndex = swiper.activeIndex + 2;
        swiper.slideTo(nextIndex, 200);
        swiper.updateProgress();

        if (movieIndex === room.movies.length) {
            console.log('Navigating to results...');
            swiper.slideTo(swiper.activeIndex + 1);
            /* Navigate to results */
            return;
        }
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

    const handleSwipeEmit = ({ index, liked }: { index: number; liked: boolean }) => {
        const movie = movies.current[index];
        if (!movie || movie.swiped) {
            return;
        }

        console.log(movie.title, liked);
        movies.current = movies.current.map((m) => (m.id === movie.id ? { ...m, swiped: true } : m));
        swipeMovie({ roomId: room.roomId as string, userId: user.id, movieId: movie.id, liked });
    };

    return (
        <>
            {!!room.movies.length && (
                <Swiper
                    onSlidePrevTransitionStart={onSlidePrevTransitionStart}
                    onSlideNextTransitionStart={onSlideNextTransitionStart}
                    onSlidePrevTransitionEnd={enableButtons}
                    onSlideNextTransitionEnd={enableButtons}
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
                    <SwiperSlide key="firstSlide"></SwiperSlide>
                    {room.movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <SwipeImage movie={movie} />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide key="lastSlide"></SwiperSlide>
                </Swiper>
            )}
            <FixedContainer position="fixed">
                <DislikeButton onClick={onDislike} disabled={disabled}>
                    <DislikeIcon />
                    Dislike
                </DislikeButton>
                <LikeButton onClick={onLike} disabled={disabled}>
                    <LikeIcon />
                    Like
                </LikeButton>
            </FixedContainer>
        </>
    );
};

export default SwipeArea;
