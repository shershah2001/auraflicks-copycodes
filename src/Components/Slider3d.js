import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../Style/Slider3d.css";
// import "../Style/Slider3.css"
// import Avatar from "../assets/image/Avatar.webp";

import { All_Movie_SliderData } from "./SliderData";
import { NavLink } from 'react-router-dom';

const Slider3d = ({ category }) => {
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    // const videoRef = useRef();
    let videoTimeout;
    // const All_SliderData = [...All_Movie_SliderData]
    const FilteredHollyood_Slider = All_Movie_SliderData.filter((movie) => category === "all" ? movie : movie.category === category);

    const swiperRefLocal = useRef();

    const handleMouseEnter = () => {
        swiperRefLocal?.current?.swiper?.autoplay?.stop()
    };

    const handleMouseLeave = () => {
        swiperRefLocal?.current?.swiper?.autoplay?.start()
    };
    const startVideoDelay = (index) => {
        videoTimeout = setTimeout(() => {
            setHoveredIndex(index);
        }, 1000)
    }
    const clearVideoDelay = () => {
        clearTimeout(videoTimeout)
    }



    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='contentWrapper'
        >
            <Swiper
                ref={swiperRefLocal}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true,
                }}

                coverflowEffect={
                    {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className='swiper_container'
            >
                {
                    FilteredHollyood_Slider.map((movie, index) => {
                        return (
                            <>
                                <SwiperSlide
                                    className="Swiper_Slider">
                                    <div key={movie.id} className="Swiper_Slider_Image"
                                        onMouseEnter={() => startVideoDelay(index)}
                                        onMouseLeave={() => {
                                            clearVideoDelay();
                                            setHoveredIndex(-1);
                                        }}
                                    >
                                        <img src={movie.imageSrc} alt="hollywood Image" />
                                        {hoveredIndex === index &&
                                            (<iframe src={movie.videoSrc}
                                                width="100%"
                                                height="100%"
                                                frameborder="0"
                                                scrolling="auto"
                                                allowfullscreen
                                                className='sliderTrailerVide TrailerVideo'
                                                autoPlay='true'
                                            >
                                            </iframe>
                                            )}

                                        <div className={`${movie.className}  interNational_Movie `}>
                                            {/* {console.log(hollywood.className)} */}
                                            <h1>{movie.title}</h1>
                                            <p className="movieInfo">
                                                {movie.movieDiscription}
                                              
                                            </p>
                                            <div className="buttonForWatch">
                                                <span>
                                                    <button>
                                                        <NavLink to={`/dynamicmoviepage/${movie.category}/${movie.id}`} >
                                                            <i class="fa fa-play" aria-hidden="true"></i>
                                                            Watch Now
                                                        </NavLink>
                                                    </button>
                                                </span>
                                                <span>
                                                    <button>
                                                        <NavLink href="#">
                                                            <i class="fa fa-download" aria-hidden="true"></i>
                                                            Download Now
                                                        </NavLink>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide >
                            </>
                        )

                    })
                }
                {/* <div class="Bottom-fade"></div> */}

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                    </div>
                    <div className="swiper-button-next slider-arrow">
                    </div>
                    <div className="swiper-pagination">
                    </div>
                </div>
                <div className='Bottom-fade'></div>
            </Swiper>
        </div >
    )
}

export default Slider3d;
