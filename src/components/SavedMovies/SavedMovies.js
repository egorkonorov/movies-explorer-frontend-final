import React, { useState, useEffect, useCallback} from "react";
import Header from "./../Header/Header";
import SearchForm from "./../SavedMovies/SearchForm/SearchForm";
import MoviesCardList from "./../SavedMovies/MoviesCardList/MoviesCardList";
import Preloader from "./../SavedMovies/Preloader/Preloader"
import Navigation from "./../Navigation/Navigation"
import Footer from "./../Footer/Footer";
import { Link, withRouter} from 'react-router-dom';
import headerLogo from "./../../images/logo.svg";
import profileIco from "./../../images/profile-ico.svg";
import mainapi from "./../../utils/MainApi";
import { CurrentUserContext } from "./../../contexts/CurrentUserContext";

function SavedMovies(){
const jwt = localStorage.getItem('token');
const currentUser = React.useContext(CurrentUserContext);
const [movies, setMovies] = useState([]);
const [wasSearched, setWasSearched] = useState(false);
const [preloaderNumber, setpreloaderNumber] = useState(0);
const [preloaderIncrease, setpreloaderIncrease] = useState(0);
const [isEmpty, setIsEmpty] = useState(false);
const [isEqual, setIsEqual] = useState(false);
const [responseError, setResponseError] = useState('moviesCardList__responseError_disabled');
const [isOverfilled, setisOverfilled] = useState([]);
const [emptyCardsClass, setEmptyCardsClass] = useState('moviesCardList__emptyParagraph_disabled')
const [emptyPreloaderClass, setEmptyPreloaderClass] = useState('preloader_disabled')

useEffect(() => {
    if (!wasSearched){
        mainapi
          .getMovies(jwt)
          .then((res) => {
            console.log(res)
            const currentUserMovies = res.data.filter(function (item) {
                return item.owner === currentUser.data._id
            })
            setMovies(currentUserMovies)
            console.log(currentUserMovies)
        })
    }
}, [wasSearched]);

useEffect(() => {
    if (window.innerWidth < 480) {
        setpreloaderNumber(5)
        setpreloaderIncrease(2)
    } else if(window.innerWidth < 768){
        setpreloaderNumber(8)
        setpreloaderIncrease(2)
    } else {
        setpreloaderNumber(12)
        setpreloaderIncrease(3)
    }
}, [movies]);


useEffect(() => {
    setIsEqual(preloaderNumber===movies.length || preloaderNumber > movies.length )
}, [preloaderNumber, movies]);

useEffect(() => {
    setIsEmpty(movies.length === 0)
    setisOverfilled(movies.length > 9)
    setEmptyPreloaderClass(`${isEmpty  || !isOverfilled || isEqual ? 'preloader_disabled': 'preloader'}`)
 }, [movies, isEmpty, isOverfilled, isEqual]);

 const resetIsEmpty= useCallback(
    (array) => {
        setEmptyCardsClass(`${array.length < 1 ? 'moviesCardList__emptyParagraph_enabled': 'moviesCardList__emptyParagraph_disabled'}`)
    },
    [movies]
  );  


  function handleCardDelete(cardId){
      console.log(cardId)
    mainapi.deleteMovie(jwt, cardId)
    .then((res) => {
        console.log(res)
        setMovies((state)=> state.filter((i) => i._id !== cardId))
    })
    .catch((err) => {
        console.log(err);
        });
      
    }



function handleSearch (searchedMovie, isChecked){
    console.log(isChecked)
        setWasSearched(true)
        setpreloaderNumber(9)
        mainapi
          .getMovies(jwt)
          .then((res) => {
            const currentUserMovies = res.data.filter(function (item) {
                return item.owner === currentUser.data._id
            })
            const array = currentUserMovies.filter((film) => film.nameRU.toLowerCase().includes(searchedMovie.toLowerCase()))
            if(isChecked){
                const finalArray = movies.filter((film) => film.duration < 40)
                setMovies(finalArray)
                resetIsEmpty(finalArray)
            }
            else{
                setMovies(array)
                resetIsEmpty(array)
            }
          })
          .catch((err) => {
            console.log(err);
            setResponseError('moviesCardList__responseError_enabled')
          });
          
}

function editpreloaderNumber (){
    setpreloaderNumber(preloaderNumber + preloaderIncrease)
}


    return (
        <>
        <div className="page_black">
            <Header>
                <Link  to="/" className="header__link"><img src={headerLogo} alt="Логотип" className="header__logo"></img></Link>
                <div className="header__films-base">
                    <Link to="/movies" className="header__films">Фильмы</Link>
                    <Link to="/saved-movies" className="header__saved-films">Сохраненные фильмы</Link>
                </div>
                <Link to="/profile" className="header__account-base">
                    <img className="header__account-ico" src={profileIco} alt="Иконка профиля"></img>
                    <p className="header__account-button" to="/profile">Аккаунт</p>
                </Link>
                <Navigation></Navigation>
            </Header>

            <SearchForm handleSearch={handleSearch}>

            </SearchForm>

            <MoviesCardList
                movies={movies}
                emptyCardsClass={emptyCardsClass}
                preloaderNumber={preloaderNumber}
                responseError={responseError}
                handleCardDeleteClick={handleCardDelete}
               >

            </MoviesCardList >

            <Preloader emptyPreloaderClass={emptyPreloaderClass} editpreloaderNumber={editpreloaderNumber}>

            </Preloader>

            <Footer>
                
            </Footer>

            </div>
        </>
    
    
    );
};

export default SavedMovies;
