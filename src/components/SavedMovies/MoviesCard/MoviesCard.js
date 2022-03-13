import React, {useState, useEffect} from "react";
import { CurrentUserContext } from "./../../../contexts/CurrentUserContext"
import mainapi from "./../../../utils/MainApi";

function MoviesCard({
    card_src,
    card_alt,
    card_name,
    card_duration,
    card_trailer,
    card_id, 
    handleCardDeleteClick
    }){
    const currentUser = React.useContext(CurrentUserContext);
    const jwt = localStorage.getItem('token');


    function onCardDeleteClick(){
        console.log(card_id)
        handleCardDeleteClick(card_id)
           }



    return (
        <>
            <div className="moviesCard">
                <button className="moviesCard__delete-button" alt='Иконка удаления' type="button" onClick={onCardDeleteClick}></button>
                <img className="moviesCard__pic" src={card_src} alt={card_alt}></img>
                <div className="moviesCard__base">
                    <p className="moviesCard__name">{card_name}</p>
                    <p className="moviesCard__duration">{`${Math.floor(card_duration/60)}ч ${card_duration%60} м`}</p>
                </div>
            </div>

        </>
    
    
    );
};

export default MoviesCard;