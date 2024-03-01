import React from 'react';
import WebLogo from "../assets/image/WebLogo3.webp";
import "../Style/Footer.css";
import { NavLink } from 'react-router-dom';
const Footer = () => {
    return (
        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="footer_column">
                        <h4 className="company_Name">AuraFlicks</h4>
                        <ul>
                            <li><NavLink to="">For You</NavLink></li>
                            <li><NavLink to="">Sports</NavLink></li>
                            <li><NavLink to="">Movies</NavLink></li>
                            <li><NavLink to="">TV Shows</NavLink></li>
                            <li><NavLink to="">Watch List</NavLink></li>
                        </ul>
                    </div>
                    <div class="footer_column">
                        <h4 className="support">Support</h4>
                        <ul>
                            <li><NavLink to="">Help Center</NavLink></li>
                            <li><NavLink to="">Terms of Use</NavLink></li>
                            <li><NavLink to="">Privacy Policy</NavLink></li>
                            <li><NavLink to="">Content Complaints</NavLink></li>
                        </ul>
                    </div>
                    <div class="footer_column">
                        <h4 className="Online_Watch">online Watch</h4>
                        <ul>
                            <li><NavLink to="#">Watch Movies</NavLink></li>
                            <li><NavLink to="#">Web Series</NavLink></li>
                            <li><NavLink to="#">Korean Dramas</NavLink></li>
                            <li><NavLink to="#">Japenes Animes </NavLink></li>
                        </ul>
                    </div>
                    <div class="footer_column">
                        <h4 className="follow_us">follow us</h4>
                        <div class="social-links">
                            <NavLink to="#"><i class="fab fa-facebook-f"></i></NavLink>
                            <NavLink to="#"><i class="fab fa-twitter"></i></NavLink>
                            <NavLink to="#"><i class="fab fa-instagram"></i></NavLink>
                            <NavLink to="#"><i class="fab fa-linkedin-in"></i></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
