import React, { useState, useContext } from 'react';
import { NewRelease } from './AllMoviesData.js';
import "../Style/NewReleaseSlider.css"
// import { watchCategoryContext, watchMovieIdContext } from "./NavbarRoute.js";
import { NavLink } from 'react-router-dom';
const NewReleaseSlider = ({ Heading }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [touchStartPosition, setTouchStartPosition] = useState(0);
  const [touchEndPosition, setTouchEndPosition] = useState(0);
  const [touched, setTouched] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const [mouseStartPosition, setMouseStartPosition] = useState(0);
  const [mouseEndPosition, setMouseEndPosition] = useState(0);
  const [mouseTouched, setMouseTouched] = useState(false);
  const [mouseSwiped, setMouseSwiped] = useState(false);
  const movieSlider = 102;
  const rightArrow = () => {
    let newPosition = sliderPosition;
    const ReleaseMovie = document.querySelectorAll(".third_ReleaseDiv");
    if (newPosition < ReleaseMovie.length - 2) {
      newPosition = newPosition + 2;
    } else if (newPosition >= ReleaseMovie.length - 2) {
      newPosition = 0;
    }
    transformSlider(newPosition, ReleaseMovie);
    setSliderPosition(newPosition);
  }
  const leftArrow = () => {
    let newPosition = sliderPosition;
    const ReleaseMovie = document.querySelectorAll(".third_ReleaseDiv");
    if (newPosition > 0) {
      newPosition = newPosition - 2;
    } else if (newPosition <= 0) {
      newPosition = ReleaseMovie.length - 2;
    }
    transformSlider(newPosition, ReleaseMovie);
    setSliderPosition(newPosition);
  }
  const transformSlider = (newPosition, ReleaseMovie) => {
    const totalTransform = -movieSlider * newPosition;
    ReleaseMovie.forEach((movie, index) => {
      const transformValue = `translateX(${totalTransform}%)`;
      movie.style.transform = transformValue;
    })
  }
  // touch js codes start here 
  const touchStartHandler = (e) => {
    setTouchStartPosition(e.targetTouches[0].clientX)
    setTouchEndPosition(e.targetTouches[0].clientX)
    setTouched(true);
  }
  const touchMoveHandler = (e) => {
    setTouchEndPosition(e.targetTouches[0].clientX);
    const frameWidth = document.querySelectorAll(".third_ReleaseDiv").offsetWidth;
    const ReleaseMovie = document.querySelectorAll(".third_ReleaseDiv");
    const slidingDist = (touchEndPosition - touchStartPosition) / frameWidth * 100;
    translatePartialSlider(slidingDist, ReleaseMovie);
    if (touched === true) {
      setSwiped(true);
    }
  }

  const translatePartialSlider = (slidingDist, ReleaseMovie) => {
    const currentPosition = -movieSlider * sliderPosition;
    const totalPosition = currentPosition + slidingDist;
    ReleaseMovie.forEach((movie, index) => {
      const translateValue = `translateX(${totalPosition}%)`;
      movie.style.transform = translateValue;
    })
  }

  const touchEndHandler = () => {
    if (swiped) {
      if (touchStartPosition - touchEndPosition > 75) {
        rightArrow()
      } else if (touchEndPosition - touchStartPosition > 75) {
        leftArrow()
      }
    }
    setSwiped(false);
    setTouched(false);
  }
  // mouse touch js start here 
  const mouseDownHandler = (e) => {
    setMouseStartPosition(e.clientX)
    setMouseEndPosition(e.clientX);
    setMouseTouched(true);
    setMouseSwiped(true);
  }
  const mouseMoveHandler = (e) => {
    setMouseEndPosition(e.clientX);
    const frameWidth = document.querySelectorAll(".third_ReleaseDiv").offsetWidth;
    const ReleaseMovie = document.querySelectorAll(".third_ReleaseDiv");
    const slidingDist = (mouseEndPosition - mouseStartPosition) / frameWidth * 100;
    translateMouseSlider(slidingDist, ReleaseMovie);
    if (mouseTouched === true) {
      setSwiped(true);
    }
  }
  const translateMouseSlider = (slidingDist, ReleaseMovie) => {
    const currentPosition = - movieSlider * sliderPosition;
    const totalMouseTouchedDist = currentPosition + slidingDist;
    ReleaseMovie.forEach((movie, index) => {
      const translateValue = `translateX(${totalMouseTouchedDist}%)`;
      movie.style.transform = translateValue;
    })
  }
  const mouseUpHandler = () => {
    if (mouseSwiped) {
      if (mouseStartPosition - mouseEndPosition > 10) {
        rightArrow()
      } else if (mouseEndPosition - mouseStartPosition > 10) {
        leftArrow()
      }
    }
    setMouseTouched(false)
    setMouseSwiped(false);

  }
  // when click image then dynamic page will open from top start here
  const imageHandler = () =>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
 
  // when click image then dynamic page will open from top end here 
  return (
    <>
      <div className="container-fluid" >
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12">
            <div className="Main_ReleaseDiv">
              <div className="leftArrow" style={{ color: 'white' }} onClick={leftArrow}>❰</div>
              <div className="Release_Heading">
                <h4>{Heading}</h4>
              </div>
              <div className="Sec_ReleaseDiv">
                {
                  NewRelease.map((releasMovie, index) => {
                    return (
                      <>
                        <div className="third_ReleaseDiv"
                          onTouchStart={touchStartHandler}
                          onTouchMove={touchMoveHandler}
                          onTouchEnd={touchEndHandler}
                          onMouseDown={mouseDownHandler}
                          onMouseMove={mouseMoveHandler}
                          onMouseUp={mouseUpHandler}
                        >
                          <div className="Release_Image">
                            <NavLink to={`/dynamicdetailmoviepage/${releasMovie.category}/${releasMovie.id}`} onClick={imageHandler}>
                              <img src={releasMovie.imageSrc}
                                alt="releaseImage"
                                draggable="false"
                              />
                            </NavLink>
                          </div>
                        </div>
                      </>
                    )
                  })}
              </div>
              <div className="rightArrow" style={{ color: "white" }} onClick={rightArrow}>❱</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewReleaseSlider;
