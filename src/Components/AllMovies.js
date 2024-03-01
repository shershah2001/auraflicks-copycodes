import { Hollywood, KoreanDrama, Anime,Webseries } from '../Components/AllMoviesData';
import MoviesSlider from '../Components/MoviesSlider';
// import SliderChildren from './SliderChildren';
import Slider3d from './Slider3d';
import Footer from "./Footer";
import NewReleaseSlider from './NewReleaseSlider';
const AllMovies = () => {
  const MoviesHollyWood = [...Hollywood];
  const MoviesKoreanDrama = [...KoreanDrama];
  const MoviesAnime = [...Anime];
  const MovieWebseries = [...Webseries]

  return (

    <div className="Movies_List">
      <Slider3d category="all" />
      {/* <Slider3d category="all" /> */}
      {/* NewRelease Slider start here  */}
      <NewReleaseSlider Heading={"Release Movies"}/>
      {/* NewRelease Slider end here  */}
      {/* Hollywood Movies */}
      <div className="slider-container">
        <MoviesSlider movies={MoviesHollyWood} category="hollywood" Heading="HollyWood Movies" />
      </div>
      {/* Korean Drama Movies */}
      <div className="slider-container">
        <MoviesSlider movies={MoviesKoreanDrama} category="koreandrama" Heading="Korean Drama & Movies" />
      </div>
      {/* Anime Movies */}
      <div className="slider-container">
        <MoviesSlider movies={MoviesAnime} category="anime" Heading="Anime Movies & Series" />
      </div>
      {/* Webseries  */}
      <div className="slider-container">
        <MoviesSlider movies={MovieWebseries} category="webseries" Heading="Webseries" />
      </div>
      <Footer />
    </div>
  );
};

export default AllMovies;



