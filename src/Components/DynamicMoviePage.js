import React, { useState } from 'react';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import { All_Movie_SliderData } from "./SliderData";
import { Hollywood, KoreanDrama, Anime } from "./AllMoviesData"
import "../Style/DynamicMoviePage.css";
const DynamicMoviePage = () => {
  const { category, id } = useParams();
  const location = useLocation()
  const movieId = parseInt(id);
  const All_DynamicMovies = [...Hollywood, ...KoreanDrama, ...Anime];
  const Slider_Movies = All_Movie_SliderData.filter((Slidermovie) => Slidermovie.category === category && Slidermovie.id === movieId ? Slidermovie : "")
  let DynamicMovie;
  if (location.pathname.includes("koreandrama")) {
    DynamicMovie = [...KoreanDrama]
  } else if (location.pathname.includes("anime")) {
    DynamicMovie = [...Anime]
  } else {
    DynamicMovie = [...Hollywood];
  }
  const DynamicMovie_List = DynamicMovie.find((movie) => movie.id === movieId);
  // console.log(DynamicMovie_List)
  return (
    <>
    {/* this codes for Slider Movie */}
      <div className="Slider_Movies">
        {
          Slider_Movies.map((movie, index) => {
            return (
              <>
                <div key={index} >
                  <iframe 
                  src={movie.videoSrc}
                    width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="auto"
                    allowfullscreen
                    className='TrailerVideo'
                    style={{ zIndex: "1000" }}
                  >
                  </iframe>
                </div>
              </>
            )
          })
        }
      </div>
          {/* this codes for Slider Movie */}

      {/* this codes for different movies */}
      <div className='All_Movies'>
        <div className="Slider_Movies" style={{width:"100%",height:"100%"}}>
          {DynamicMovie_List && (
            <div className="DynamicMovie">
              <iframe
                src="https://mega.nz/file/B303AZTR#YRgVErOqxtK3fq8onE5-t7YQhnbCacczcfoSwOGEF6g"
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="auto"
                allowFullScreen
                className='TrailerVideo '
              >
              </iframe>
            </div>
          )}
        </div>
      </div>
      {/* this codes for different movies */}
    </>
  )
}

export default DynamicMoviePage;

