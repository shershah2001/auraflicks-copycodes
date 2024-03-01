import React from 'react';
import { TodayMovieList } from './AllMoviesData';
import "../Style/TodayMovie.css";
const TodayMovie = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  let shuffledMovies = shuffleArray(TodayMovieList);
  return (
    <>
      <div className='TodayMovie_firstDiv'>
        <h3 className='TodayMovie_Heading'>Today Movie</h3>
        <div className="todayMovie_MainDiv" >
          {shuffledMovies.slice(0, 12).map((ele) => {
            return (
              <div className="todayMovie_secDiv">
                <img src={ele.imageSrc}
                  alt={ele.title}
                  draggable="false"
                  className='todayMovie_image'
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default TodayMovie;
