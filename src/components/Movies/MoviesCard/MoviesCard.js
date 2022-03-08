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
    card_year}){
    const currentUser = React.useContext(CurrentUserContext);
    const jwt = localStorage.getItem('token');
    const [cardSavedClass, setCardSavedClass] = useState('moviesCard__pic-unsaved')
    const [isEqualMovies, setisEqualMovies] = useState(false)

    useEffect(() => {
        mainapi.getMovies(jwt)
            .then((res) => {
                console.log(res)
                const currentUserMovies = res.data.filter(function (item) {
                    return item.owner === currentUser.data._id
                });
                setisEqualMovies(currentUserMovies.some(function (item) {
                    return item.movieId === card_id;
                })
                )
            })
            setCardSavedClass(`${isEqualMovies ? 'moviesCard__pic-saved': 'moviesCard__pic-unsaved'}` )
    }, [isEqualMovies]);


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
               console.log('Уже есть')
           }
    }



    return (
        <>
            <div className="moviesCard">
                <button className={cardSavedClass} alt='Иконка сохранения' type="button" onClick={onCardSaveClck}></button>
                <img className="moviesCard__pic" src={card_src} alt={card_alt}></img>
                <div className="moviesCard__base">
                    <p className="moviesCard__name">{card_name}</p>
                    <p className="moviesCard__duration">{card_duration}</p>
                </div>
            </div>

        </>
    
    
    );
};

export default MoviesCard;