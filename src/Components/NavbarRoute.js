import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllMovies from './AllMovies';
import MapAllMovies from './MapAllMovies';
import DynamicDetailMoviePage from "./DynamicDetailMoviePage"
import DynamicMoviePage from './DynamicMoviePage';
import WatchLater from './WatchLater';
import WatchHistory from './WatchHistory';
import TodayMovie from './TodayMovie';
// import SliderChildren from './SliderChildren';

const NavbarRoute = () => {
    return (
        <div>
            <Routes>
                <Route path="/" exact element={<AllMovies />} />
                <Route path='/dynamicdetailmoviepage/:category/:id' element={<DynamicDetailMoviePage />} />
                <Route path='/dynamicmoviepage/:category/:id' element={<DynamicMoviePage />} />
                <Route path="/mapallmovies/:category/:subcategory" element={<MapAllMovies />} />
                <Route path="/watchlater" element={<WatchLater />} />
                <Route path="/watchhistory" element={<WatchHistory />} />
                <Route path="/todaymovie" element={<TodayMovie />} />
                {/*  this is category and subcategory comes from NavbarLinks.js which i was passed as a link address  */}
                {/* like this <NavLink to="/mapallmovies/koreandrama/action"> */}
                {/* here koreandrama is category and action is subcategory */}
                <Route path="/mapallmovies/:category" element={<MapAllMovies />} />
            </Routes>
        </div>
    )
}

export default NavbarRoute;

