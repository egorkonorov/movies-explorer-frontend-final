import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";

function NavTab(){

    return (
        <>
            <div className="navTab">
                <div className="navTab__tabs">
                    <Link activeClass="active" to="aboutProject" spy={true}   smooth={true}offset={-0} duration= {1000} className="navtab__link">О проекте</Link>
                    <Link activeClass="active" to="techs" spy={true}   smooth={true}offset={-20} duration= {1000} className="navtab__link">Технологии</Link>
                    <Link activeClass="active" to="aboutMe" spy={true}   smooth={true}offset={-20} duration= {1000} className="navtab__link">Студент</Link>
                </div>
            </div>
        </>
    
    
    );
};

export default NavTab;