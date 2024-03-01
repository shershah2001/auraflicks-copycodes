import React, { useContext, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Hollywood, KoreanDrama, Anime, Webseries, NewRelease,TodayMovieList } from './AllMoviesData';
import "../Style/DynamicDetailMoviePage.css";
import Footer from './Footer';
import { userContext } from './Context/GlobalContext';

// import { SearchQueryData } from '../App';
const DynamicDetailMoviePage = () => {
  const { id } = useParams();
  const movieId = parseInt(id);
  const location = useLocation();
  const [hoverIndex, setHoverIndex] = useState(-1);
  // const { state, dispatch } = useContext(userContext);
  let movieArray;
  if (location.pathname.includes('koreandrama')) {
    movieArray = [...KoreanDrama]
  } else if (location.pathname.includes('anime')) {
    movieArray = [...Anime]
  } else if (location.pathname.includes('webseries')) {
    movieArray = [...Webseries]
  } else if (location.pathname.includes('newRelease')) {
    movieArray = [...NewRelease]
  } else if (location.pathname.includes('todaymovie')) {
    movieArray = [...TodayMovieList]
  }
  else {
    movieArray = [...Hollywood]
  }

  const movie = movieArray.find((movie) => movie.id === movieId);

  if (!movie) {
    return <div>Movie is not found</div>
  }
  // const Episodes = Object.values(movie.Episode);
  const DynamicMouse_HoverIndex = () => {
    setHoverIndex(movieId)
  }
  const DynamicLeave_HoverIndex = () => {
    setHoverIndex()
  }
  const screenWidth = window.innerWidth;
  // watchHistory codes start here

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12  col-sm-12  col-md-12  col-lg-12">
            <div className="Dynamic_MainDiv"
              onMouseEnter={DynamicMouse_HoverIndex}
              onMouseLeave={DynamicLeave_HoverIndex}
            >
              <div className="Dark_Overlay"></div>
              <div className="Dynamic_MovieImage">
                <img src={movie.imageSrc} alt={movie.title} />
                {hoverIndex === movie.id &&
                  (<iframe src={movie.bigVideoSrc}
                    width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="auto"
                    allowfullscreen
                    className='dynamicDetalMovieTrailerVideo'
                    autoPlay='true'
                  >
                  </iframe>
                  )}
              </div>
              {/*movie Name section start here  */}
              <div className="Dynamic_Movie_Name">
                <h1>
                  {(screenWidth <= 461 && screenWidth > 300) ?
                    (movie.title.length > 10 ?
                      `${movie.title.slice(0, 10)}...`
                      : movie.title) : movie.title
                  }
                  {/* {movie.title} */}
                </h1>

              </div>
              {/* movie Name section end here  */}
              {/* Detail section start here */}
              <div className="Dynamic_Movie_Discription">
                <p>
                  {
                    movie.movieDiscription.length > 51
                      ? `${movie.movieDiscription.slice(0, 250)}...`
                      : movie.movieDiscription

                  }
                </p>
                <p className="Movie_Language"><span>Hindi | English , Dual Audio</span></p>
              </div>
              {/* movie Name and Detail secton end here  */}
              {/* watch button start here  */}
              <div className="Watch_Button">
                <span className="Watch_Movie">
                  <button
                    className='Watch_Movie_Button' >
                    <NavLink to={`/dynamicmoviepage/${movie.category}/${movie.id}`} className="Watch_Movie_Link">
                      <i class="fa fa-play" aria-hidden="true"></i>
                      Watch Now
                    </NavLink>
                  </button>
                </span>
                <span className="Watch_Trailer">
                  <button
                    className='Watch_Trailer_Button' >
                    <NavLink to="#" className="Watch_Trailer_Link" >
                      <i class="fa fa-download" aria-hidden="true"></i>
                      Download Now
                    </NavLink>
                  </button>
                </span>
              </div>
              {/* watch button end here */}
              <div className="Bottom_Overlay"></div>
            </div>
            {/* episode codes start here */}
            <div className="main_Episodes_Div">
              {movie.Episode ? (
                Object.values(movie.Episode).map((episodes, index) => {
                  return (
                    <div key={index} className="Episodes_Div">
                      <div className="Episodes_Image_Div">
                        <img className="Episodes_Image" src={episodes.EpisodeImage} alt="Episodes_Images" />
                        <div className="Play_Icon">
                          <i class="fa fa-play playButton" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="Episdoe_Number_Title">
                        <h3 className="Episodes_Number">{episodes.EpisodeNumber}</h3>
                        <h2 className="Episodes_Title">{episodes.EpisodeTitle}</h2>
                      </div>
                    </div>
                  )
                })
              ) : " "
              }
            </div>
            {/* episode codes end here  */}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default DynamicDetailMoviePage;

