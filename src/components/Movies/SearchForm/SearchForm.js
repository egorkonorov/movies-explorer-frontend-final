import React, { useState, useCallback, useEffect }  from "react";
import searchPic from "./../../../images/find-button.svg"

function SearchForm({handleSearch}){

    const [searchedMovie, setsearchedMovie] = useState(JSON.parse(localStorage.getItem('inputValue')))
    const [isChecked, setisChecked] = useState(JSON.parse(localStorage.getItem('checkbox')))
    const [inputValue, setInputValue] = useState(JSON.parse(localStorage.getItem('inputValue')))
    const [isValidMovie, setIsValidMovie] = useState(false)
    const [spanClass, setSpanClass] = useState('searchForm__span_inactive')
  
    

    function handleChangeMovie(e) {
        setInputValue(localStorage.setItem('inputValue', JSON.stringify(e.target.value)))
        setsearchedMovie(e.target.value)
        resetMovie(e.target.value)
      }

    function handleChangeCheckbox() {
        resetCheckbox()
    }


    const resetCheckbox= useCallback(
        () => {
            setisChecked(!isChecked);
        },
        [isChecked]
      );  

    const resetMovie= useCallback(
    (value) => {
        setIsValidMovie(value.length > 0)
        setSpanClass(`${value.length > 0 ? 'searchForm__span_inactive':  'searchForm__span_active'}`)
    },
    [searchedMovie]
    );  
    function handleSubmit(e){
    e.preventDefault()
    if (isValidMovie || inputValue.length > 0) {
        handleSearch(searchedMovie, isChecked)
        setSpanClass('searchForm__span_inactive')
    }
    else {
        setSpanClass('searchForm__span_active')
    }
}   
    return (
        <>
            <div className="searchForm">
            <form className="searchForm__form" onSubmit={handleSubmit} noValidate>
                <div className="searchForm__base">
                    <input 
                        className="searchForm__input"
                        id="film-input"
                        type="text"
                        minLength="1"
                        maxLength="500"
                        placeholder="Фильм"
                        onChange={handleChangeMovie}
                        value={inputValue}
                    ></input>       
                     <button className="searchForm__button-pic" type="submit"></button>  
                </div>
                <p className={spanClass}>Необходимо ввести название фильма</p>
                <div className="searchForm__checkbox-base">
                <input type="checkbox" className="searchForm__checkbox" id="checkbox" onChange={handleChangeCheckbox} checked={`${isChecked? 'checked': ''}`} />
                <label for="checkbox" className="searchForm__switch">Короткометражки</label>
                </div>
                <div className="searchForm__line"></div>
            </form>
            </div>
        </>
    
    
    );
};

export default SearchForm;