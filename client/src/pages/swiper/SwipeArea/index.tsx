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
SwiperCore.use([Pagination, A11y, EffectCoverflow, EffectFade]);

const coverFlowEffectProps: CoverflowEffectOptions = {
    rotate: 50,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
};

const paginationProps: PaginationOptions = {
    clickable: false,
    type: 'progressbar',
    progressbarFillClass: 'swiper-pagination-progressbar-fill',
};

const SwipeArea = () => {
    const { room } = useRoom();
    const moviesToSwipe = room.movies.filter((movie) => !movie.swiped);
    const [index, setIndex] = useState(0);
    const [swiper, setSwiper] = useState<SwiperCore>();

    const slideNext = () => {
        console.log('slideNext');
        if (!swiper) {
            return;
        }
        // const index = swiperRef.current?.activeIndex;
        // swiperRef.current.
        // swiperRef.current?.slideTo(index + 1);

        // swiper?.slideReset();
        swiper.slideTo(index + 1);
        setIndex((index) => index + 1);
        swiper.update();
        swiper.updateProgress();

        // swiper.slideTo(index + 1, undefined, false);

        // console.log(swiperRef.current);
        // console.log(moviesToSwipe[index as number]);
    };

    const onLike = () => {
        slideNext();
        // setIndex(index + 1);
        // swiperRef.current.
        // likeMovie({ roomId: room.roomId as string, movieId: movie.id });
    };

    const onDislike = () => {
        if (!swiper) {
            return;
        }

        const nextIndex = swiper.activeIndex + 1;
        swiper.slideTo(nextIndex);
    };

    const onSlidePrevTransitionStart = (swiper: SwiperCore) => {
        if (!swiper) {
            return;
        }

        if (swiper.isEnd) {
            /* Do something */
            return;
        }
        const nextIndex = swiper.activeIndex + 2;
        console.log(nextIndex);
        console.log('prev', swiper);
        swiper.slideTo(nextIndex);
    };

    useEffect(() => {
        if (swiper) {
            swiper.slideTo(0);
        }
    }, []);

    return (
        <>
            <Swiper
                onSlidePrevTransitionStart={onSlidePrevTransitionStart}
                onSwiper={(swiper) => setSwiper(swiper)}
                grabCursor
                centeredSlides
                spaceBetween={5000}
                effect="coverflow"
                coverflowEffect={coverFlowEffectProps}
                pagination={paginationProps}
            >
                {moviesToSwipe.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <SwipeImage movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
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
