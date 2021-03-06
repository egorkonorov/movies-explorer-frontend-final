import React, {useState, useEffect} from "react";
import { CurrentUserContext } from "./../../../contexts/CurrentUserContext";
import mainapi from "./../../../utils/MainApi";

function MoviesCard({
    card_src,
    card_alt,
    card_name,
    card_duration,
    card_country,
    card_director,
    card_description,
    card_trailer, 
    card_nameEN,
    card_thumbnail,
    card_id,
    card_year, cardId}){
    const currentUser = React.useContext(CurrentUserContext);
    const jwt = localStorage.getItem('token');
    const [cardSavedClass, setCardSavedClass] = useState('moviesCard__pic-unsaved')
    const [isEqualMovies, setisEqualMovies] = useState(false)
    const [currentUserMovies, setCurrentUserMovies] = useState([])

    useEffect(() => {
        mainapi.getMovies(jwt)
            .then((res) => {
                console.log(res)
                const currentUserMovies = res.data.filter(function (item) {
                    return item.owner === currentUser.data._id
                });
                setCurrentUserMovies(currentUserMovies)
                setisEqualMovies(currentUserMovies.some(function (item) {
                    return item.movieId === card_id;
                })
                )
            })
            setCardSavedClass(`${isEqualMovies ? 'moviesCard__pic-saved': 'moviesCard__pic-unsaved'}` )
    }, [cardSavedClass, isEqualMovies]);


    function onCardSaveClck(){
           if (!isEqualMovies) {
            mainapi.addMovie(
                card_country,
                card_director,
                card_duration, 
                card_description, 
                card_src,
                card_trailer, 
                card_name, 
                card_nameEN, 
                card_thumbnail, 
                card_id, 
                card_year, 
                jwt
                )
                .then((res) => {
                    console.log(res)
                    setCardSavedClass('moviesCard__pic-saved')
                })
                .catch((err) => {
                    console.log(err);
                    });
           }
           else {
               console.log('?????? ????????')
               const currentUserMovie = currentUserMovies.filter(function (item) {
                return item.movieId === card_id
                });
               mainapi.deleteMovie(jwt, currentUserMovie[0]._id)
                .then((res) => {
                    console.log(res)
                    setCardSavedClass('moviesCard__pic-unsaved')
                })
                .catch((err) => {
                    console.log(err);
                    });
           }
    }



    return (
        <>
            <div className="moviesCard">
                <button className={cardSavedClass} alt='???????????? ????????????????????' type="button" onClick={onCardSaveClck}></button>
                <img className="moviesCard__pic" src={card_src} alt={card_alt}></img>
                <div className="moviesCard__base">
                    <p className="moviesCard__name">{card_name}</p>
                    <p className="moviesCard__duration">{`${Math.floor(card_duration/60)}?? ${card_duration%60} ??`}</p>
                </div>
            </div>

        </>
    
    
    );
};

export default MoviesCard;