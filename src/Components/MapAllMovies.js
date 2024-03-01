import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Hollywood, KoreanDrama, Anime,Webseries } from './AllMoviesData';

import "../Style/MapAllMovies.css"
// import SliderChildren from './SliderChildren';
import Slider3d from './Slider3d';
// import { Scroll } from '../App';
import Footer from "./Footer";
// import WatchLater from './WatchLater';

const MapAllMovies = () => {
    const { category, subcategory } = useParams();
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const location = useLocation();
    // const Scroll_Ref = useContext(Scroll);
    let videoTimeout;
    // this category comes from AllMovies.js which i passed into it as an attribute 
    // like this <MoviesSlider movies={MoviesHollyWood} category="Hollywood" />

    const movies = [...Hollywood, ...KoreanDrama, ...Anime,...Webseries];
    const filterMovies = category === "all"
        ? movies
        : subcategory
            ? movies.filter(movie => movie.category === category && movie.subcategory === subcategory)
            : movies.filter(movie => movie.category === category);
    // search Filtered movies start here


    // search Filtered movies end here
    const startVideoDelay = (index) => {
        videoTimeout = setTimeout(() => {
            setHoveredIndex(index); // Activate hover effect
        }, 1000); // 0.5 seconds delay
    }
    const clearVideoDelay = () => {
        clearTimeout(videoTimeout);
    }
    let Heading = "";

    if (category === "hollywood") {
        Heading = "Hollywood Movies";
        if (subcategory) {
            Heading += ` - ${subcategory}`;
        }
    } else if (category === "koreandrama") {
        Heading = "Korean Drama and Movies";
        if (subcategory) {
            Heading += ` - ${subcategory}`;
        }
    } else if (category === "anime") {
        Heading = "Anime Movies";
        if (subcategory) {
            Heading += ` - ${subcategory}`;
        }
    } else if(category ==="webseries"){
        Heading = "Webseries";
        if(subcategory){
            Heading +=`-${subcategory}`
        }
    }
     else {
        Heading = "This category is not valid";
    }
   const watchNow = ()=>{
     document.body.scrollTop = 0;
     document.documentElement.scrollTop = 0;
   }

    return (
        <>

            {category === "hollywood" && <Slider3d category="hollywood" />}
            {category === "koreandrama" && <Slider3d category="koreandrama" />}
            {category === "anime" && <Slider3d category="anime" />}

            <div className={`${category}_Heading MapAllMovies_movies_Heading`}>
                <h3>{Heading}</h3>
            </div>
            <div className={`${category}_MainDiv MainFilter_Div`}>
                {
                    filterMovies.map((movie, index) => {

                        return (
                            <>
                                <div
                                    className={`${category}_Movies All_Movies_Card`}
                                    key={index}
                                    onMouseEnter={() => startVideoDelay(index)}
                                    onMouseLeave={() => {
                                        clearVideoDelay();
                                        setHoveredIndex(-1);
                                    }}
                                >
                                    <img className={`${category}_MoviesImage All_Movies_Image`} src={movie.imageSrc} alt="images"
                                        draggable='false'
                                    />
                                    {hoveredIndex === index && (
                                        <div >
                                            <iframe src={movie.videoSrc}
                                                height="209"
                                                width="208"
                                                frameborder="0"
                                                scrolling="auto"
                                                allowfullscreen
                                                className='TrailerVideo'
                                            >
                                            </iframe>
                                        </div>
                                    )}
                                    <div className="play_plus_like_dislink_icons icons_MapAllMovies">
                                        <NavLink
                                            to={`/dynamicdetailmoviepage/${category}/${movie.id}`}
                                            className="DynamicLink_MoviesSlider"
                                        >
                                            <span>
                                                <button
                                                   onClick={watchNow}
                                                >
                                                    Watch Now
                                                </button>
                                            </span>
                                        </NavLink>
                                        <span className='WatchLater'>
                                            <button>Watch Later</button>
                                        </span>
                                    </div>
                                    <NavLink
                                        to={`/dynamicdetailmoviepage/${category}/${movie.id}`}
                                        className="DynamicLink_MapAllMovies"
                                    >
                                        <h4
                                            className='moviesName  
                                        moviesName_MapAllMovies'
                                            draggable='false'
                                        >
                                            {
                                                movie.title.length > 20 ?
                                                    `${movie.title.slice(0, 20)}...`
                                                    : movie.title
                                            }
                                        </h4>
                                    </NavLink>
                                    <div className="movieCardInfo movieCardInfo_MapAllMovies">
                                        <p
                                            draggable='false'
                                        >
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio laboriosam...
                                        </p>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }

            </div >
            <Footer />
        </>
    )
}

export default MapAllMovies;
