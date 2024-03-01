import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { watchCategoryContext, watchMovieIdContext } from "./NavbarRoute.js";
import "../Style/MoviesSlider.css";
import { userContext } from './Context/GlobalContext.js';

// import DemonSlayerTrailer from "../../public/Trailer/DemonSlayerTrailer.mp4";
const MoviesSlider = ({ movies, category, Heading }) => {
    const [sliderPosition, setSliderPosition] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // Touched Swiped start here
    const [startTouchPosition, setTouchStartPosition] = useState(0);
    const [endTouchPosition, setTouchEndPosition] = useState(0);
    const [touched, setTouched] = useState(false);
    const [swiped, setSwiped] = useState(false);
    // MouseSwiped start here 
    const [startMousePosition, setStartMousePosition] = useState(0);
    const [endMousePosition, setMouseEndPosition] = useState(0);
    const [mouseClicked, setMouseClicked] = useState(false);
    const [mouseswiped, setMouseSwiped] = useState(false);
    const [savedMessage, setSavedMessage] = useState("");
    const [savedMovies, setSavedMovies] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const { state, dispatch } = useContext(userContext);



    const movieWidthSpan = 100;
    // let trailerId = "https://cdn.jwplayer.com/players/soQNOLoF-gqd7cmiz.html";
    // const numCardsToMove = screenWidth <= 768 ? 2 : screenWidth <= 920 ? 3 : 5;
    let videoTimeout;
    const width = window.innerWidth;
    const calculateNumCardsToMove = () => {

        switch (true) {
            case width <= 360:
                return 3;
            case width <= 440 && width > 360:
                return 3;
            case width <= 462 && width > 440:
                return 4;
            case width <= 480 && width > 462:
                return 2;
            case width <= 667 && width > 480:
                return 2;
            case width <= 812 && width > 667:
                return 2;
            case width <= 920 && width > 812:
                return 3;
            case width <= 1100 && width > 920:
                return 3;
            case width <= 1440 && width > 1100:
                return 4;
            default:
                return 5;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const numCardsToMove = calculateNumCardsToMove();

    const handleLeftSlider = () => {
        let newPosition = sliderPosition;
        const movieSlider = document.querySelectorAll(`.${category}`);
        const movieSliderArray = Array.from(movieSlider);
        if (newPosition > 0) {
            newPosition = newPosition - numCardsToMove;
        } else if (newPosition <= 0) {
            newPosition = movieSliderArray.length - numCardsToMove;
        }
        translateMovieSlider(newPosition, movieSliderArray);
        setSliderPosition(newPosition);
    }

    const handleRightSlider = () => {
        let newPosition = sliderPosition;
        const movieSlider = document.querySelectorAll(`.${category}`);
        const movieSliderArray = Array.from(movieSlider);
        if (newPosition < movieSliderArray.length - numCardsToMove) {
            newPosition = newPosition + numCardsToMove;
        } else if (newPosition >= movieSliderArray.length - numCardsToMove) {
            newPosition = 0;
        }
        translateMovieSlider(newPosition, movieSliderArray);
        setSliderPosition(newPosition);
    }

    const translateMovieSlider = (newPosition, movieSliderArray) => {
        const totalTranslate = -movieWidthSpan * newPosition;
        movieSliderArray.forEach((movie, index) => {
            const transformValue = `translateX(${totalTranslate}%)`;
            movie.style.transform = transformValue;
            // movie.style.transition = "none";
        });
    };

    const startVideoDelay = (index) => {
        if (!swiped && !mouseswiped) {
            videoTimeout = setTimeout(() => {
                setHoveredIndex(index); // Activate hover effect
            }, 2500);
        }
    }
    // Function to clear the video delay timer
    const clearVideoDelay = () => {
        clearTimeout(videoTimeout);
    }



    const touchStartHandler = (e) => {
        // speedUpAnimation();
        setTouchStartPosition(e.targetTouches[0].clientX);
        setTouchEndPosition(e.targetTouches[0].clicentX);
        setTouched(true)
    }
    const touchMoveHandler = (e) => {
        // speedUpAnimation();
        setTouchEndPosition(e.targetTouches[0].clientX);
        const frameWidth = document.querySelectorAll(`.${category}`).offsetWidth;
        const movieSlider = document.querySelectorAll(`.${category}`);
        const movieSliderArray = Array.from(movieSlider);
        const slidingDist = (endTouchPosition - startTouchPosition) / frameWidth * 100;
        translatePartialSlider(slidingDist, movieSliderArray)
        if (touched === true) {
            setSwiped(true);
        }
    }
    const translatePartialSlider = (slidingDist, movieSliderArray) => {
        const currentTranslation = -sliderPosition * movieWidthSpan;
        const TotalTranslation = currentTranslation + slidingDist;
        movieSliderArray.forEach((movie, index) => {
            const transformValue = `translateX(${TotalTranslation}%)`;
            movie.style.transform = transformValue;
        })
    }

    const touchEndHandler = (e) => {
        if (swiped) {
            // speedDownAnimation();
            if (startTouchPosition - endTouchPosition > 75) {
                handleRightSlider()
            } else if (endTouchPosition - startTouchPosition > 75) {
                handleLeftSlider()
            }
        }
        setTouched(false);
        setSwiped(false);
    }
    // Touch sliding effect coding end here

    // MouseTouch sliding effect coding started here
    const MouseStartHandler = (e) => {
        setStartMousePosition(e.clientX);
        setMouseEndPosition(e.clientX);
        setMouseSwiped(true);
        setMouseClicked(true);
    }
    const MouseMoveHandler = (e) => {
        setMouseEndPosition(e.clientX)
        const frameWidth = document.querySelectorAll(`.${category}`).offsetWidth;
        const movieSliders = document.querySelectorAll(`.${category}`);
        const MovieSliderArray = Array.from(movieSliders);
        const MouseSliderDist = (endMousePosition - startMousePosition) / frameWidth * 100;
        translateMouseSlider(MouseSliderDist, MovieSliderArray)
    }
    const translateMouseSlider = (MouseSliderDist, MovieSliderArray) => {
        const CurrentPosition = -sliderPosition * movieWidthSpan;
        const TotalTranslatePosition = CurrentPosition + MouseSliderDist;
        MovieSliderArray.forEach((movie) => {
            const transformValue = `translateX(${TotalTranslatePosition}%)`
            movie.style.transform = transformValue;
        })
    }
    const MouseEndHandler = () => {
        if (mouseswiped) {
            if (startMousePosition - endMousePosition > 10) {
                handleRightSlider()
            } else if (endMousePosition - startMousePosition > 10) {
                handleLeftSlider()
            }
        }
        setMouseClicked(false)
        setMouseSwiped(false)
    }
    // MouseTouch sliding effect coding end here
    // Watch Now and Navbar sliding effect Null coding here


    const mainImageHandler = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    // Watch Now and Navbar sliding effect Null coding end    
    // watchNowHandler function start here
    const watchNowHandler = (id, category) => {
        const findHistory_Movie = movies.find((ele) => ele.id === id && ele.category === category);
        dispatch({
            type: "Add_Movie_To_WatchHistory",
            payload: {
                movies: findHistory_Movie
            }
        })
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    // watchNowHandler function end here 
    // Watch Later Saved Message javascript start here 
    useEffect(() => {
        if (savedMessage) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [savedMovies, savedMessage]);

    // Function to handle the save action

    const savedWatchLater = (movieId, category) => {
        const findMovie = movies.find((ele) => ele.id === movieId && ele.category === category);
        const isMovieAlreadyExist = state.watchLater.some((eleSome) => eleSome.id === movieId && eleSome.category === category);
        if (!isMovieAlreadyExist) {
            dispatch({
                type: "Add_Movie_To_WatchLater",
                payload: {
                    movie: findMovie
                }
            })
        }
        const key = `${movieId} ${category}`;
        const isSaved = savedMovies[key];
        const newSavedMovies = { ...savedMovies, [key]: !isSaved };
        setSavedMovies(newSavedMovies);
        const message = isSaved ? "Already Saved Video" : "Saved to Watch Later";
        setSavedMessage(message);
    }
// view Click Handler function start here
const viewHandler = () =>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// view click Handler function end here



    return (
        <>

            <div className={`categoryMoviesClass Allmovies`} >

                <div className="leftArrowMovies" onClick={handleLeftSlider}>❰</div>
                <div className="movieSlider">
                    <div className="movies_Heading">
                        <h4 >{Heading}</h4>
                    </div>

                    {movies.slice(0, 30).map((movie, index) => {
                        return (
                            <>
                                <div className={`${category} MovieSlider_Container`}
                                    key={index}
                                    onMouseLeave={() => {
                                        MouseEndHandler();
                                    }}
                                    onTouchStart={touchStartHandler}
                                    onTouchMove={touchMoveHandler}
                                    onTouchEnd={touchEndHandler}
                                    onMouseDown={MouseStartHandler}
                                    onMouseMove={MouseMoveHandler}
                                    onMouseUp={MouseEndHandler}
                                    id="DisplayFrame"
                                // style={{transition:"transform 1s ease-in-out"}}
                                >
                                    <div className="MovieContainer"
                                        onMouseEnter={() => startVideoDelay(index)}
                                        onMouseLeave={() => {
                                            clearVideoDelay();
                                            setHoveredIndex(-1);
                                        }}
                                    >
                                        {(width <= 461 && width > 310) ?
                                            <NavLink
                                                to={`/dynamicdetailmoviepage/${category}/${movie.id}`}
                                                className="DynamicLink_MoviesSlider"
                                            >
                                                <img
                                                    className={`${category}_Img All_Moviesimages`}
                                                    src={movie.imageSrc}
                                                    alt={`${category}_Images`}
                                                    draggable="false"
                                                    onClick={() => mainImageHandler()}
                                                />
                                            </NavLink>
                                            :
                                            <img
                                                className={`${category}_Img All_Moviesimages`}
                                                src={movie.imageSrc}
                                                alt={`${category}_Images`}
                                                draggable="false"
                                            />
                                        }
                                        {(width <= 461 && width > 320) ?
                                            ""
                                            :
                                            hoveredIndex === index && (
                                                <div >
                                                    <iframe src={movie.videoSrc}
                                                        frameborder="0"
                                                        scrolling="auto"
                                                        allowfullscreen
                                                        className='TrailerVideo'
                                                    >
                                                    </iframe>
                                                </div>
                                            )
                                        }

                                        <div className="play_plus_like_dislink_icons">
                                            <NavLink
                                                to={`/dynamicdetailmoviepage/${category}/${movie.id}`}
                                                className="DynamicLink_MoviesSlider"
                                            >
                                                <span>
                                                    <button
                                                        onClick={() => watchNowHandler(movie.id, movie.category)}
                                                    >
                                                        Watch Now
                                                    </button>
                                                </span>
                                            </NavLink>
                                            {/* <NavLink
                                            to={`/watchlater/${category}/${movie.id}`}
                                        > */}
                                            <span className='WatchLater'>
                                                <button onClick={() => {
                                                    savedWatchLater(movie.id, movie.category);
                                                }}>
                                                    Watch Later
                                                </button>
                                            </span>
                                            {/* </NavLink> */}
                                        </div>
                                        <NavLink
                                            to={`/dynamicdetailmoviepage/${category}/${movie.id}`}
                                            className="DynamicLink_MoviesSlider"
                                        >
                                            <h3 className="moviesName"
                                                draggable="false"
                                                onDragStart={(e) => e.preventDefault()}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >     {
                                                    movie.title.length > 20 ?
                                                        `${movie.title.slice(0, 20)}...`
                                                        : movie.title
                                                }
                                            </h3>
                                        </NavLink>
                                        <div className="movieCardInfo">
                                            <p
                                                draggable="false"
                                            >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio laboriosam...</p>
                                        </div>
                                    </div>
                                </div >
                                {/* View Arrow javascript start here  */}
                                {startTouchPosition > 0 && (width <= 462 && width > 320) && (
                                    <div className="ViewAll_Arrow" style={{ opacity: '1' }}>
                                        <NavLink to={movie.link} draggable="false"
                                            onClick={viewHandler}
                                        >
                                            <span>{movie.ViewAll}</span>
                                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                        </NavLink>
                                    </div>
                                )}
                                <div className="ViewAll_Arrow">
                                    <NavLink to={movie.link} draggable="false"  onClick={viewHandler}>
                                        <span>{movie.ViewAll}</span>
                                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                    </NavLink>
                                </div>
                                {/* View Arrow javascript End here  */}
                            </>
                        )
                    })}
                    <div className="savedMessageDiv" style={{ display: showMessage ? 'block' : 'none' }}>
                        {savedMessage && <button>{savedMessage}</button>}
                    </div>
                </div>
                <div className="rightArrowMovies" onClick={handleRightSlider}>❱</div>

            </div >

        </>
    );
};
export default MoviesSlider;



