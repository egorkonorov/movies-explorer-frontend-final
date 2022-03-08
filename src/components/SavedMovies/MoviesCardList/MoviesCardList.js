import React, { useState, useEffect} from "react";
import MoviesCard from "./../MoviesCard/MoviesCard"


function MoviesCardList({movies, emptyCardsClass, preloaderNumber, responseError, handleCardDeleteClick}){


    return (
        <>
            <div className="moviesCardList">
            <p className={emptyCardsClass}>Ничего не найдено</p>
            <p className={responseError}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> 
            {movies.slice(0, preloaderNumber).map((movie) => {
          return (
            <MoviesCard
            card_src={movie.image}
            card_alt={movie.nameRU}
            card_name={movie.nameRU}
            card_trailer={movie.trailerLink}
            card_id={movie._id}
            card_duration={movie.duration}
            handleCardDeleteClick={handleCardDeleteClick}
            />
          );
        })}
            </div>

        </>
    
    
    );
};

export default MoviesCardList;