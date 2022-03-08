import React, {useEffect, useState} from "react";
import { Link, withRouter} from 'react-router-dom';
import Header from "./../Header/Header";
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "./../Footer/Footer";
import headerLogo from "./../../images/logo.svg";
function Main({loggedIn}){

    const [headerLinkFirst, setHeaderLinkFirst] = useState('')
    const [headerLinkFirstText, setHeaderLinkFirstText] = useState('')

    const [headerLinkSecondClassname, setHeaderLinkSecondClassname] = useState('')
    
    const [headerLinkThirdClassname, setHeaderLinkThirdClassname] = useState('')

    useEffect(() => {
        setHeaderLinkFirst(`${loggedIn ? '/movies': '/register' }`)
        setHeaderLinkFirstText(`${loggedIn ? 'Фильмы': 'Регистрация' }`)

        setHeaderLinkSecondClassname(`${loggedIn ? 'header__button_disabled': 'header__button' }`)

        setHeaderLinkThirdClassname(`${loggedIn ? 'header__link': 'header__link_disabled' }`)
      }, [loggedIn])


    return (
        <>
        <div className="page">
            <Header>
            <Link  to="/" className="header__link"> <img src={headerLogo} alt="Логотип" className="header__logo"></img></Link>
            <div className="header__userBase">
                <p><Link className="header__link" to={headerLinkFirst}>{headerLinkFirstText}</Link></p>
                <button className={headerLinkSecondClassname} ><Link className="header__buttonLink" to="/login">Войти</Link></button>
                <p><Link className={headerLinkThirdClassname} to="/saved-movies">Сохраненные фильмы</Link></p>
                <p><Link className={headerLinkThirdClassname} to="/profile">Аккаунт</Link></p>
            </div>
            </Header>

            <Promo>

            </Promo>

            <NavTab>

            </NavTab>

            <AboutProject id="aboutProject">
                
            </AboutProject>

            <Techs id="techs">

            </Techs>

            <AboutMe id="aboutMe">

            </AboutMe>

            <Portfolio>
                
            </Portfolio>

            <Footer>

            </Footer>

        </div>
        </>
    
    
    );
};

export default Main;
