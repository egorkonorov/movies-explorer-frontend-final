import React from "react";
import promoLogo from "./../../../images/yandexLogo.svg";

function Promo(){

    return (
        <>
            <div className="promo">
                <img className="promo__logo" src={promoLogo} alt="Логотип Практикума"></img>
                <h1 className="promo__text">Учебный проект студента факультета Веб-разработки</h1>
            </div>
        </>
    
    
    );
};

export default Promo;
