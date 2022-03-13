import React, {useState, useEffect, useCallback} from "react";
import Header from "./../Header/Header";
import { Link, withRouter} from 'react-router-dom';
import headerLogo from "./../../images/logo.svg";
import profileIco from "./../../images/profile-ico.svg";
import Navigation from "./../Navigation/Navigation"
import { CurrentUserContext } from "./../../contexts/CurrentUserContext"
import mainapi from "./../../utils/MainApi";
import {useHistory } from 'react-router-dom';
import * as Auth from './../../utils/Auth';

function Profile(){

    const jwt = localStorage.getItem('token');
    const history = useHistory()
    const currentUser = React.useContext(CurrentUserContext);
    const [currentUserName, setCurrentUserName] = useState(currentUser.data.name)
    const [currentUserEmail, setCurrentUserEmail] = useState(currentUser.data.email)
    const [nameValue, setNameValue] = useState(currentUser.data.name)
    const [emailValue, setEmailValue] = useState(currentUser.data.email)
    const [profileNameSpanClass, setProfileNameSpanClass] = useState('profile-name__span_inactive')
    const [profileEmailSpanClass, setProfileEmailSpanClass] = useState('profile-email__span_inactive')
    const [isValidName, setIsValidName] = useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [profileButtonClassName, setRegisterButtonClassName] = useState('profile__button-edit_inactive')
    const [buttonEnabled, setButtonEnabled] = useState(true)
    const [profileErrorSpanClass, setProfileErrorSpanClass] = useState('profile__error_disabled')
    const [profileErrorText, setProfileErrorText] = useState('')

    function handleChangeEmail(e) {
        setEmailValue(e.target.value)
        resetEmail(e.target.value)
        setProfileErrorSpanClass('profile__error_disabled')
      }

      function handleChangeName(e) {
        setNameValue(e.target.value)
        resetName(e.target.value)
        setProfileErrorSpanClass('profile__error_disabled')
      }  


      useEffect(() => {
        Auth.getContent(jwt).then((res) => {
            if (res){
                setCurrentUserName(res.data.name)
                setCurrentUserEmail(res.data.email)
                setNameValue(res.data.name)
                setEmailValue(res.data.email)
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }, [currentUser])



      const resetEmail= useCallback(
        (value) => {
            setIsValidEmail((/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value))
            setProfileEmailSpanClass(`${(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value) ? 'profile-email__span_inactive' : 'profile-email__span_active'}`)
        },
        [emailValue, isValidEmail]
      );

      const resetName= useCallback(
        (value) => {
            setIsValidName((/^[а-яА-ЯёЁa-zA-Z0-9/-]+$/gi).test(value) && value.length > 1 && value.length <30)
            setProfileNameSpanClass(`${(/^[а-яА-ЯёЁa-zA-Z0-9/-]+$/gi).test(value) && value.length > 1 && value.length <30 ? 'profile-name__span_inactive' : 'profile-name__span_active'}`)
        },
        [nameValue, isValidName]
      );

      useEffect(() => {
        setRegisterButtonClassName(`${isValidEmail && isValidName ? 'profile__button-edit_active' : 'profile__button-edit_inactive'}`)
        setButtonEnabled(!(isValidEmail && isValidName))
     }, [isValidEmail, isValidName]);


     function handleSubmit(e){
         e.preventDefault()
        if (currentUser.data.email === emailValue && currentUser.data.name === nameValue) {
            setProfileErrorSpanClass('profile__error_enabled')
            setProfileErrorText('Email и Имя совпадает с уже используемым')
        }
        else {
            mainapi
            .patchUserInfo(jwt, nameValue, emailValue)
            .then((res) => {
                setCurrentUserName(nameValue)
                setCurrentUserEmail(emailValue)
                setProfileErrorSpanClass('profile__error_no-error')
                setProfileErrorText('Данные изменены успешно')
                setTimeout(() => setProfileErrorSpanClass('profile__error_disabled'), 1000);
              })
              .catch((err) => {
                setProfileErrorSpanClass('profile__error_enabled')
                setProfileErrorText(err)
              });
        }
    } 

    function handleExit(){
        localStorage.clear()
        history.push('/')
        window.location.reload()
    }


    return (
        <>
            <div className="page_black">
                <Header>
                    <Link  to="/" className="header__link"><img src={headerLogo} alt="Логотип" className="header__logo"></img></Link>
                    <div className="header__films-base">
                        <Link  to="/movies"  className="header__films">Фильмы</Link>
                        <Link  to="/saved-movies" className="header__saved-films">Сохраненные фильмы</Link>
                    </div>
                    <Link to="/profile" className="header__account-base">
                        <img className="header__account-ico" src={profileIco} alt="Иконка профиля"></img>
                        <p className="header__account-button" to="/profile">Аккаунт</p>
                    </Link>
                    <Navigation></Navigation>
                </Header>
                <div className="profile">
                    <p className="profile__heading">{`Привет, ${currentUserName}!`}</p>
                    <form className="profile__form" onSubmit={handleSubmit} noValidate>
                        <div className="profile__inputs-base">
                            <div className="profile__input-base">
                                <p className="profile__input-naming">Имя</p>   
                                <input
                                className="profile__input"
                                id="name-input"
                                type="text"
                                minLength="2"
                                maxLength="30"
                                name="name"
                                required
                                onChange={handleChangeName}
                                value={nameValue}
                            >
                            </input>
                            </div>
                            <span className={profileNameSpanClass}>от 2-х до 30-ти символов латинские, русские буквы и дефис</span>
                            <div className="profile__inputs-line"></div>
                            <div className="profile__input-base">
                                <p className="profile__input-naming">Email</p>
                                <input
                                className="profile__input"
                                id="email-input"
                                type="email"
                                minLength="2"
                                maxLength="100"
                                name="email"
                                required
                                onChange={handleChangeEmail}
                                value={emailValue}
                                >
                            </input>
                            </div>
                            <span className={profileEmailSpanClass}>Некорректный email</span>
                        </div>
                        <div className="profile__buttons">
                            <button className={profileButtonClassName} type="submit" disabled={buttonEnabled}>Редактировать</button>
                            <span className={profileErrorSpanClass}>{profileErrorText}</span>
                            <button className="profile__button-exit" type="button" onClick={handleExit}>Выйти из аккаунта</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    
    
    );
};

export default Profile;