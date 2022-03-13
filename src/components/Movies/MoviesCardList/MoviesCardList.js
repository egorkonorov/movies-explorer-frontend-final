import React, { useState, useEffect} from "react";
import MoviesCard from "./../MoviesCard/MoviesCard"


function MoviesCardList({movies, emptyCardsClass, preloaderNumber, responseError}){


    return (
        <>
            <div className="moviesCardList">
            <p className={emptyCardsClass}>Ничего не найдено</p>
            <p className={responseError}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> 
            {movies.slice(0, preloaderNumber).map((movie) => {
          return (
            <MoviesCard
            card_src={`https://api.nomoreparties.co/${movie.image.url}`}
            card_alt={movie.nameRU}
            card_director={movie.director}
            card_name={movie.nameRU}
            card_country={movie.country}
            card_description={movie.description}
            card_trailer={movie.trailerLink}
            card_nameEN={movie.nameEN}
            card_thumbnail={`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`}
            card_id={movie.id}
            card_year={movie.year}
            card_duration={movie.duration}
            cardId={movie._id} 
            />
          );
        })}
            </div>

        </>
    
    
    );
};

export default MoviesCardList;