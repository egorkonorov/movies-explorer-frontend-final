import React, { useState }  from "react";
import menuIco from "./../../images/menu-ico.svg";
import { Link, withRouter, NavLink} from 'react-router-dom';
import profileIco from "./../../images/profile-ico.svg";
import closeIco from "./../../images/ico-right.svg";

function Navigation(){

    const [overlayClass, setOverlayClass] = useState('navigation__overlay_hidden')
    const [navClass, setNavClass] = useState('navigation__menu_hidden')
    const [closeButtonClass, setcloseButtonClass] = useState('navigation__closeButton_hidden')
    function onNavButtonClick() {
        setOverlayClass('navigation__overlay_visible')
        setNavClass('navigation__menu_visible')
        setcloseButtonClass('navigation__closeButton_visible')
      }
    
      function onCloseClick() {
        setOverlayClass('navigation__overlay_hidden')
        setNavClass('navigation__menu_hidden')
        setcloseButtonClass('navigation__closeButton_hidden')
      }  



    return (
        <>   
            <div className={overlayClass}></div>
            <button className="navigation__menu-button" type="button" onClick={onNavButtonClick}><img className="navigation__menu-ico" src={menuIco} alt="Иконка меню"></img></button>
            <div className={navClass}>
            <button className="navigation__close-button" type="button" onClick={onCloseClick}><img src={closeIco} className={closeButtonClass} alt="Иконка закрытия"></img></button>
                <div className="navigation__links">
                    <NavLink className="navigation__link" to="/">Главная</NavLink>
                    <NavLink activeStyle={{textDecoration:"underline"}} to="/movies" className="navigation__link">Фильмы</NavLink>
                    <NavLink activeStyle={{textDecoration:"underline"}} to="/saved-movies" className="navigation__link">Сохраненные фильмы</NavLink>
                </div>
                <Link to="/profile" className="navigation__account-base">
                    <img className="navigation__account-ico" src={profileIco} alt="Иконка профиля"></img>
                    <p className="navigation__account-button" to="/profile">Аккаунт</p>
                </Link>
            </div>
        </>
    
    
    );
};

export default Navigation;