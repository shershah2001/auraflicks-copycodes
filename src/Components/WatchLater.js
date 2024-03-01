import React, { useContext } from 'react';
import { userContext } from './Context/GlobalContext.js';
import "../Style/WatchLater.css"
import { NavLink } from 'react-router-dom';
const WatchLater = () => {
  const { state, dispatch } = useContext(userContext);

  const removeHandler = (movieId) => {
    dispatch({
      type: "Remove_Movie_From_WatchLater",
      payload: {
        id: movieId
      }
    })
  }

  return (
    <>
      <div className="container-fluid">
   
        <div className="startingWatchLaterDiv">
        <h3 className='componentName'>Watch Later</h3>  
          {state.watchLater.length > 0 ?
            (state.watchLater.map((movie) => {
              // console.log("watchLater =>", movie)
              return (
                <>
                  <div className="mainWatchLater" key={movie.id}>
                    <div key={movie.id} className="WatchLaterImgDiv">
                      <img src={movie.imageSrc} alt="image" draggable="false" />
                    </div>
                    <div className="WatchLaterMovieInfo">
                      <div className="movieName">
                        <h3
                          className="WatchLaterMovieTitle">
                          {
                            movie.title.length > 10 ? `${movie.title.slice(0, 10)}...` : movie.title
                          }
                        </h3>
                      </div>
                      <div className="watchLaterButn">
                        <NavLink
                          to={`/dynamicdetailmoviepage/${movie.category}/${movie.id}`}
                        >
                          <button className="watchLaterMovieButton ">Watch Now</button>
                        </NavLink>
                        <button onClick={() => removeHandler(movie.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </>
              )
            })) : <h1 className="watchHistory_Heading">
              <span>Watch Later is Empty !</span>
              <span>Add Something</span>
            </h1>
          }
        </div>
      </div>
    </>
  )
}

export default WatchLater;

