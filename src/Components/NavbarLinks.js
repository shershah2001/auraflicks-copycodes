import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import WebSecLogo from "../assets/image/WebLogo3.webp";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Hollywood, KoreanDrama, Anime, NewRelease, TodayMovieList, Webseries } from './AllMoviesData';
// import { TodayMovieList } from './AllMoviesData';
// import { SearchQueryData } from '../App';
import "../Style/Navbar.css";
import { userContext } from './Context/GlobalContext';

const NavbarLinks = () => {
    const [submenuHollyWood, setSubmenuHollyWood] = useState(false);
    const [submenuKoreandrama, setSubmenuKoreanDrama] = useState(false);
    const [submenuAnime, setSubmenuAnime] = useState(false);
    const [submenuSearch, setSubmenuSearch] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showNavbar, setShowNavbar] = useState(false);
    const [showArrowSubmenu, setArrowSubmenu] = useState(true);
    const { todayListData } = useContext(userContext);
    const [filteredMovie, setFilteredMovie] = useState([]);
    const [isColorRed, setIsColorRed] = useState(true);
    const movie = [...Hollywood, ...KoreanDrama, ...Anime, ...NewRelease, ...TodayMovieList, ...Webseries];



    const iconClickHandler = () => {
        const inputSearch = document.querySelector(".search_bar_input");
        inputSearch.classList.toggle("VisibleInput");
        const Hide_Show_Input = document.querySelector(".searchIconDiv");
        Hide_Show_Input.classList.toggle("SearchBar_BorderRadius");
        const SearchBarName = document.querySelector("#searchbarName");
        if (inputSearch.classList.contains("VisibleInput")) {
            const changeSearchBar = document.querySelector("#searchIcon");
            changeSearchBar.classList.replace("fa-search", "fa-times");
            SearchBarName.innerHTML = "Close";
        } else {
            const changeSearchBar = document.querySelector("#searchIcon");
            changeSearchBar.classList.replace("fa-times", "fa-search");
            SearchBarName.innerHTML = "Search";
        }
    }
    const showSubmenuHollyWood = () => {
        const HollyWood = document.querySelector(".submenu");
        HollyWood.classList.toggle("submenuShow");
        const width = window.innerWidth;
        if (window.innerWidth <= 800) {
            if (HollyWood.classList.contains("submenuShow")) {
                const HollywoodDownArrow = document.querySelector("#hollywoodDownArrow");
                HollywoodDownArrow.style.transform = `rotate(180deg)`;
                HollywoodDownArrow.style.transition = `all 0.5s linear`;
                // window.scrollTo({ top: 0, behavior: "smooth" })
            }
            else {
                const HollywoodDownArrow = document.querySelector("#hollywoodDownArrow");
                HollywoodDownArrow.style.transform = `rotate(0deg)`;
            }

        }
        else {
            // window.scrollTo({ top: 680, behavior: "smooth" })
        }

    }

    const showSubmenuKorean = () => {
        const KoreanDrama = document.querySelector(".koreanSubmenu");
        KoreanDrama.classList.toggle("submenuShow");
        const width = window.innerWidth;
        if (window.innerWidth <= 800) {
            if (KoreanDrama.classList.contains("submenuShow")) {
                const KoreanDramaDownArrow = document.querySelector("#KoreanDramaDownArrow");
                KoreanDramaDownArrow.style.transform = `rotate(180deg)`;
                KoreanDramaDownArrow.style.transition = `all 0.5s linear`;
                // window.scrollTo({ top: 600, behavior: "smooth" })
            } else {
                const KoreanDramaDownArrow = document.querySelector("#KoreanDramaDownArrow");
                KoreanDramaDownArrow.style.transform = `rotate(0deg)`;
            }
        } else {
            // window.scrollTo({ top: 680, behavior: "smooth" })
        }

    }
    const showSubmenuAnime = () => {
        const AnimeDrama = document.querySelector(".AnimeSubmenu");
        AnimeDrama.classList.toggle("submenuShow");
        if (window.innerWidth <= 800) {
            if (AnimeDrama.classList.contains("submenuShow")) {
                const AnimeDramaDownArrow = document.querySelector("#AnimeDramaDownArrow");
                AnimeDramaDownArrow.style.transform = `rotate(180deg)`;
                AnimeDramaDownArrow.style.transition = `all 0.5s linear`;
            } else {
                const AnimeDramaDownArrow = document.querySelector("#AnimeDramaDownArrow");
                AnimeDramaDownArrow.style.transform = `rotate(0deg)`;
            }
        }
    }
    const showSubmenuSearch = () => {
        const SearchInfo = document.querySelector(".searchInfoSubmenu");
        SearchInfo.classList.toggle("submenuShow");
        if (window.innerWidth <= 800) {
            if (SearchInfo.classList.contains("submenuShow")) {
                const SearchInfoDownArrow = document.querySelector("#SearchInfoDownArrow");
                SearchInfoDownArrow.style.transform = `rotate(180deg)`;
                SearchInfoDownArrow.style.transition = `all 0.5s linear`;
            } else {
                const SearchInfoDownArrow = document.querySelector("#SearchInfoDownArrow");
                SearchInfoDownArrow.style.transform = `rotate(0deg)`;
            }
        }
    }
    const Show_HideNavbarHandler = () => {
        setShowNavbar(!showNavbar);
    }
    const SearchMovieHandler = (e) => {
        const inputSearch = document.querySelector(".search_bar_input");
        const query = e.target.value;
        setInputValue(query);
        // searchParams.set("q", query);
        // const searchQuery = searchParams.get("q", query) || " ";
        const filterMovie = movie.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
        setFilteredMovie(filterMovie);
        if (query === "") {
            setFilteredMovie([])
        } else {
            setFilteredMovie(filterMovie)
        }
        if (query.length > 0) {
            inputSearch.style.borderBottomLeftRadius = "0";
        } else {
            inputSearch.style.borderBottomLeftRadius = "5px";
        }
    }
    const DeleteSearchValue = () => {
        const inputSearch = document.querySelector(".search_bar_input");
        setInputValue("");
        // setSearchQueryData("");
        setFilteredMovie([])
        if (inputValue.length > 0) {
            inputSearch.style.borderBottomLeftRadius = "5px";
        }
        console.log(`input value ${inputValue}`)
    }
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100) {
                document.querySelector(".header").style.boxShadow = " rgba(181, 181, 181, 0.12) 0px 0px 38px 0px";
            } else {
                document.querySelector(".header").style.boxShadow = "none";
            }
            if (window.scrollY >= 701) {
                document.querySelector(".header").style.position = `absolute`;
                document.querySelector(".header").style.top = `0`;
            } else {
                document.querySelector(".header").style.position = `fixed`;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const hideSubmenu = () => {
        setShowNavbar(!showNavbar);
    }
    // this javascript codes is for navbar to slide down 
    const Down_Navbar = () => {
        const calculateScrollTop = () => {
            const width = window.innerWidth;

            if (width <= 480 && width > 320) {
                return 400;
            } else if (width <= 800) {
                return 600;
            } else if (width <= 900) {
                return 580;
            } else if (width <= 1200) {
                return 580;
            } else if (width <= 1300) {
                return 580;
            } else if (width <= 1400) {
                return 580;
            } else if (width <= 1500) {
                return 600;
            } else {
                return 680;
            }
        };
        const scrollTop = calculateScrollTop();
        window.scrollTo({ top: scrollTop, behavior: "smooth" });
    };
    // this javascript codes is for navbar to slide down 
    useEffect(() => {
        const NavlinkDownArrow = document.querySelectorAll(".NavlinkDownArrow");
        const DownArrow = document.querySelectorAll(".DownArrow");
        NavlinkDownArrow.forEach((ele, index) => {
            if (ele.classList.contains('active')) {
                DownArrow[index].style.color = "red"
            } else {
                DownArrow[index].style.color = "white"
            }
        })
    })
    // colorHandler css start here
    // const colorHandler = () => {
    //     const NavlinkDownArrows = document.querySelectorAll(".NavlinkDownArrow");
    //     const DownArrow = document.querySelector("#SearchInfoDownArrow");
    //     const searchInfo = document.querySelector(".searchInfo");


    //     // Assuming that the 'active' class is being toggled correctly elsewhere in your code
    //     const activeClass =NavlinkDownArrows.includes('active');
    //     if (activeClass) {
    //         console.log(searchInfo.style.color = "white",
    //             DownArrow.style.color = "white")
    //     } else {

    //         searchInfo.style.color = "red";
    //         DownArrow.style.color = "red";
    //     }

    // };

    // colorHandler css end here 
    return (
        <>
        <h1>hello git hub what 's app</h1>
            <header className="header" >
                <div className="hamburger-icon">
                    <i onClick={Show_HideNavbarHandler} class="fa fa-bars" aria-hidden="true"></i>
                </div>
                <NavLink to="/">
                    <div
                        className="WebSite_Logo"
                        onClick={() => {
                            Down_Navbar();
                        }}
                    >
                        <img
                            src={WebSecLogo}
                            alt="Logo"
                            draggable="false"
                        />
                    </div>
                </NavLink>
                <nav className={`navbar ${showNavbar ? "leftShow" : ""}`}>

                    <div className="Cross-icon">
                        <i onClick={Show_HideNavbarHandler} class="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <ul className="MainMenu">
                        <li className="Menu-links"
                            onClick={() => {
                                hideSubmenu();
                                Down_Navbar();
                            }} >
                            <NavLink to="/"
                                className="NavlinkDownArrow"
                                draggable="false"
                            >
                                All Movies
                            </NavLink>
                            <span className="DownArrow"></span>
                        </li>
                        <li
                            className="Menu-links"
                            onClick={() => {
                                showSubmenuHollyWood();

                            }}
                        >
                            <li style={{ display: "flex" }}>
                                <span>
                                    <NavLink
                                        to="/mapallmovies/hollywood"
                                        onClick={() => {
                                            hideSubmenu();
                                            Down_Navbar();
                                        }}
                                        className="NavlinkDownArrow"
                                        draggable="false"
                                    >
                                        HollyWood
                                    </NavLink>
                                </span>
                                <span>
                                    <MdKeyboardArrowDown
                                        id="hollywoodDownArrow"
                                        className="DownArrow"
                                    />
                                    {/* <i
                                        class="fa fa-chevron-down DownArrow" aria-hidden="true"
                                        id='KoreanDramaDownArrow'
                                    >
                                    </i> */}
                                </span>
                            </li>

                            {/* submenu links start here  */}
                            <ul className={`submenu ${submenuHollyWood ? "submenuShow" : ""}`}
                                onClick={() => {
                                    hideSubmenu();
                                }}

                            >
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/hollywood/action"
                                        draggable="false"
                                    >
                                        Action
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/hollywood/comedy"
                                        draggable="false"
                                    >
                                        Comedy
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/hollywood/thriller"
                                        draggable="false"
                                    >
                                        Thriller
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/hollywood/adventure"
                                        draggable="false"
                                    >
                                        adventure
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/hollywood/horror"
                                        draggable="false"
                                    >
                                        horror
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/hollywood/scifi"
                                        draggable="false"
                                    >
                                        sci-fi
                                    </NavLink>
                                </li>
                                <li className="menu-links" >
                                    <NavLink to="/mapallmovies/hollywood/magical"
                                        draggable="false"
                                    >
                                        magical
                                    </NavLink>
                                </li>
                            </ul>
                            {/* submenu links end here  */}
                        </li>
                        <li
                            className="Menu-links"
                            onClick={() => {
                                showSubmenuKorean();
                            }}

                        >
                            <li style={{ display: "flex" }}>
                                <span>
                                    <NavLink
                                        to="/mapallmovies/koreandrama"
                                        onClick={() => {
                                            hideSubmenu();
                                            Down_Navbar();
                                        }}
                                        className="NavlinkDownArrow"
                                        draggable="false"
                                    >
                                        Korean Drama
                                    </NavLink>
                                </span>
                                <span>
                                    <MdKeyboardArrowDown
                                        id='KoreanDramaDownArrow'
                                        className="DownArrow"
                                    />
                                    {/* <i
                                        class="fa fa-chevron-down DownArrow" aria-hidden="true"
                                        id='KoreanDramaDownArrow'
                                    >
                                    </i> */}
                                </span>
                            </li>
                            {/* submenu links start here  */}
                            <ul className={`submenu koreanSubmenu ${submenuKoreandrama ? "submenuShow" : ""}`}
                                onClick={() => {
                                    hideSubmenu();
                                }}
                            >
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/koreandrama/action"
                                        draggable="false"
                                    >
                                        Action
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/koreandrama/comedy"
                                        draggable="false"
                                    >
                                        Comedy
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/koreandrama/thriller"
                                        draggable="false"
                                    >
                                        Thriller
                                    </NavLink>
                                </li>
                            </ul>
                            {/* submenu links end here  */}
                        </li>
                        <li
                            className="Menu-links"
                            onClick={() => {
                                showSubmenuAnime();

                            }}
                        >
                            <li style={{ display: "flex" }}>
                                <span>
                                    <NavLink
                                        to="/mapallmovies/anime"
                                        onClick={() => {
                                            hideSubmenu();
                                            Down_Navbar();
                                        }}
                                        className="NavlinkDownArrow"
                                        draggable="false"
                                    >
                                        Anime
                                    </NavLink>
                                </span>
                                <span>
                                    <MdKeyboardArrowDown
                                        id='AnimeDramaDownArrow'
                                        className="DownArrow"
                                    />
                                    {/* <i
                                        class="fa fa-chevron-down DownArrow" aria-hidden="true"
                                        id='AnimeDramaDownArrow'
                                    >
                                    </i> */}
                                </span>
                            </li>
                            {/* submenu links start here  */}
                            <ul className={`submenu AnimeSubmenu ${submenuAnime ? "submenuShow" : ""}`}
                                onClick={() => {
                                    hideSubmenu();
                                }}
                            >
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/anime/action"
                                        draggable="false"
                                    >
                                        Action
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/anime/comedy"
                                        draggable="false"
                                    >
                                        Comedy
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/mapallmovies/anime/thriller"
                                        draggable="false"
                                    >
                                        Thriller
                                    </NavLink>
                                </li>
                            </ul>
                            {/* submenu links end here  */}
                        </li>
                        {/* watch Movie History information start here */}
                        <li
                            className="Menu-links"
                            onClick={() => {
                                showSubmenuSearch();
                            }}
                        >
                            <li style={{ display: "flex" }}>
                                <span>
                                    <NavLink
                                        onClick={() => {
                                            hideSubmenu();
                                            Down_Navbar();
                                        }}
                                        // className="NavlinkDownArrow"
                                        draggable="false"
                                    >
                                        Search Info
                                    </NavLink>
                                </span>
                                <span>
                                    <MdKeyboardArrowDown
                                        id='SearchInfoDownArrow'
                                        className="DownArrow"
                                        style={{ color: "white" }}
                                    />
                                </span>
                            </li>
                            {/* submenu links start here  */}
                            <ul className={`submenu searchInfoSubmenu ${submenuSearch ? "submenuShow" : ""}`}
                                onClick={() => {
                                    hideSubmenu();
                                }}
                            >
                                <li className="menu-links">
                                    <NavLink to="/watchlater"
                                        // onClick={colorHandler}
                                        draggable="false"
                                    >
                                        Watch Later
                                    </NavLink>
                                </li>
                                <li className="menu-links">
                                    <NavLink to="/watchhistory"
                                        // onClick={colorHandler}
                                        draggable="false"
                                    >
                                        Watch History
                                    </NavLink>
                                </li>
                                <li className="menu-links"
                                // onClick={colorHandler}
                                >
                                    <NavLink to="/todaymovie"
                                        draggable="false"
                                    >
                                        Today Movie
                                    </NavLink>
                                </li>
                            </ul>
                            {/* submenu links end here  */}
                        </li>
                        {/* watch Movie History information end here */}
                        <Outlet />
                    </ul>
                </nav>
                {/* social site icons codes start here  */}
                <div>
                    <ul className='social-icons'>
                        <div className="search_icon">
                            <div className="searchIconDiv">
                                <i id='searchIcon' onClick={iconClickHandler}
                                    class="fa fa-search search_bar_icon" aria-hidden="true">
                                </i>
                            </div>
                            <span id='searchbarName'>Search</span>
                            <div className="search_bar_input">
                                <input
                                    type="search"
                                    value={inputValue}
                                    onChange={SearchMovieHandler}
                                    placeholder="Search Movie..."
                                />
                                {inputValue.length > 0 && (
                                    <i class="fa fa-times"
                                        aria-hidden="true"
                                        onClick={DeleteSearchValue}
                                    />
                                )}
                                <div className='MainSearch_Div'>
                                    {filteredMovie.length > 0 &&
                                        (
                                            <div className="MovieMap" onClick={() => setFilteredMovie([])}>
                                                {
                                                    filteredMovie.slice(0, 5).map((movie, index) => {
                                                        console.log(movie.id);
                                                        return (
                                                            <>
                                                                <NavLink to={`/dynamicdetailmoviepage/${movie.category}/${movie.id}`}>
                                                                    <div className='movie' key={index}>
                                                                        <img style={{ width: "100px", height: '50px' }}
                                                                            src={movie.imageSrc} alt="movieImage" />
                                                                        <p style={{ paddingLeft: "5px" }}>{movie.title}</p>
                                                                    </div>
                                                                </NavLink>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <li className='social-icons-li'>
                            <a href="#">
                                <div className="icon">
                                    <i className="fa fa-telegram" aria-hidden="true"></i>
                                    <i className="fa fa-telegram" aria-hidden="true"></i>
                                </div>
                                <div className="name" >
                                    <span className="telegram" data-text="Telegram">Telegram</span>
                                </div>
                            </a>
                        </li>
                        <li className='social-icons-li'>
                            <a href="#">
                                <div className="icon">
                                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                                </div>
                                <div className="name">
                                    <span className="youtube" data-text="Youtube">Youtube</span>
                                </div>
                            </a>
                        </li>
                        <li className='social-icons-li'>
                            <a href="#">
                                <div className="icon">
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                </div>
                                <div className="name">
                                    <span className="facebook" data-text="Facebook">Facebook</span>
                                </div>
                            </a>
                        </li>
                        <li className='social-icons-li'>
                            <a href="#">
                                <div className="icon">
                                    <i className="fa fa-instagram" aria-hidden="true"></i>
                                    <i className="fa fa-instagram" aria-hidden="true"></i>
                                </div>
                                <div className="name">
                                    <span className="instagram" data-text="instagram">instagram</span>
                                </div>
                            </a>
                        </li>
                    </ul>

                </div>
                {/* social site codes end here  */}
            </header>

        </>

    )
}

export default NavbarLinks;
