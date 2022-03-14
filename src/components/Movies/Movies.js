import React, { useState, useEffect, useCallback} from "react";
import Header from "./../Header/Header";
import SearchForm from "./../Movies/SearchForm/SearchForm";
import MoviesCardList from "./../Movies/MoviesCardList/MoviesCardList";
import Preloader from "./../Movies/Preloader/Preloader"
import Navigation from "./../Navigation/Navigation"
import Footer from "./../Footer/Footer";
import { Link, withRouter} from 'react-router-dom';
import headerLogo from "./../../images/logo.svg";
import profileIco from "./../../images/profile-ico.svg";
import moviesapi from "./../../utils/MoviesApi";

function Movies(){

 if (!localStorage.getItem('movies')) {
    localStorage.setItem('movies', JSON.stringify([]))
 }   
const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')));
const [preloaderNumber, setpreloaderNumber] = useState(0);
const [preloaderIncrease, setpreloaderIncrease] = useState(0);
const [isEmpty, setIsEmpty] = useState(false);
const [isEqual, setIsEqual] = useState(false);
const [responseError, setResponseError] = useState('moviesCardList__responseError_disabled');
const [isOverfilled, setisOverfilled] = useState([]);
const [emptyCardsClass, setEmptyCardsClass] = useState('moviesCardList__emptyParagraph_disabled')
const [emptyPreloaderClass, setEmptyPreloaderClass] = useState('preloader_disabled')
const [preloaderClass, setPreloaderClass] = useState('movies_preloader_inactive');
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

function handleSearch (searchedMovie, isChecked){
        setpreloaderNumber(9)
        handlePreloader(true)
        moviesapi
          .getMovies()
          .then((res) => {
            localStorage.removeItem('movies');
            localStorage.removeItem('checkbox');
            localStorage.setItem('checkbox', JSON.stringify(isChecked));
            const array = res.filter((film) => film.nameRU.toLowerCase().includes(searchedMovie.toLowerCase()))
            if(isChecked){
                const finalArray = movies.filter((film) => film.duration < 40)
                setMovies(finalArray)
                localStorage.setItem('movies', JSON.stringify(finalArray));
                resetIsEmpty(finalArray)
            }
            else{
                setMovies(array)
                localStorage.setItem('movies', JSON.stringify(array));
                resetIsEmpty(array)
            }
          })
          .catch((err) => {
            console.log(err);
            setResponseError('moviesCardList__responseError_enabled')
          })
          .finally(() =>{
            handlePreloader(false)
          });
          
}

function handlePreloader(isLoading) {
    if (isLoading){
        setPreloaderClass('movies_preloader_active')
    }
    else{
        setPreloaderClass('movies_preloader_inactive')
    }
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
            <div className={preloaderClass}></div>
            <MoviesCardList
                movies={movies}
                emptyCardsClass={emptyCardsClass}
                preloaderNumber={preloaderNumber}
                responseError={responseError}
               >

            </MoviesCardList>

            <Preloader emptyPreloaderClass={emptyPreloaderClass} editpreloaderNumber={editpreloaderNumber}>

            </Preloader>

            <Footer>
                
            </Footer>

            </div>
        </>
    
    
    );
};

export default withRouter(Movies);
