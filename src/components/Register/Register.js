import React, {useState, useEffect, useCallback} from "react";
import headerLogo from "./../../images/logo.svg";
import { Link, withRouter} from 'react-router-dom';

function Register({handleRegister, errorRegistrationText, errorRegisterClassName}){


    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [buttonEnabled, setButtonEnabled] = useState(false)
    const [registerButtonClassName, setRegisterButtonClassName] = useState('register__button_inactive')
    const [registerNameSpanClass, setRegisterNameSpanClass] = useState('register-name__span_inactive')
    const [registerEmailSpanClass, setRegisterEmailSpanClass] = useState('register-name__span_inactive')
    const [registerPasswordSpanClass, setRegisterPasswordSpanClass] = useState('register-name__span_inactive')
    const [isValidName, setIsValidName] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [isValidPassword, setIsValidPassword] = useState(false)

    
    function handleChangeEmail(e) {
        setEmailValue(e.target.value)
        resetEmail(e.target.value)
      }

    function handleChangePassword(e) {
        setPasswordValue(e.target.value)
        resetPassword(e.target.value)
      }

      function handleChangeName(e) {
        setNameValue(e.target.value)
        resetName(e.target.value)
        
      }  

      const resetEmail= useCallback(
        (value) => {
            setIsValidEmail((/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value))
            setRegisterEmailSpanClass(`${(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value) ? 'register-email__span_inactive' : 'register-email__span_active'}`)
        },
        [emailValue, isValidEmail]
      );
      
      const resetPassword= useCallback(
        (value) => {
            setIsValidPassword((/^[a-zA-Z0-9]+$/gi).test(value) && value.length > 7)
            setRegisterPasswordSpanClass(`${(/^[a-zA-Z0-9]+$/gi).test(value) && value.length > 7 ? 'register-password__span_inactive' : 'register-password__span_active'}`)
        },
        [passwordValue, isValidPassword]
      );

      const resetName= useCallback(
        (value) => {
            setIsValidName((/^[??-????-??????a-zA-Z0-9/-]+$/gi).test(value) && value.length > 1 && value.length <30)
            setRegisterNameSpanClass(`${(/^[??-????-??????a-zA-Z0-9/-]+$/gi).test(value) && value.length > 1 && value.length <30 ? 'register-name__span_inactive' : 'register-name__span_active'}`)
        },
        [nameValue, isValidName]
      );

      useEffect(() => {
        setRegisterButtonClassName(`${isValidEmail && isValidPassword && isValidName ? 'register__button_active' : 'register__button_inactive'}`)
        setButtonEnabled(!(isValidEmail && isValidPassword && isValidName))
     }, [isValidEmail, isValidPassword, isValidName]);


     function handleSubmit(e){
        e.preventDefault()
        handleRegister(passwordValue, emailValue, nameValue)
    } 
    


    return (
        <>
            <div className="page_black">
                <div className="register">
                    <Link  to="/" className="register__link"> <img src={headerLogo} alt="??????????????" className="register__logo"></img></Link>
                    <p className="register__heading">?????????? ????????????????????!</p>
                    <form className="register__form" onSubmit={handleSubmit} noValidate>
                        <p className="register__input-heding">??????</p>
                        <input
                            className="register__input"
                            id="name-input"
                            type="text"
                            minLength="2"
                            maxLength="30"
                            name="name"
                            placeholder="??????????????"
                            onChange={handleChangeName}
                            >
                        </input>
                        <span className={registerNameSpanClass}>???? 2-?? ???? 30-???? ???????????????? ??????????????????, ?????????????? ?????????? ?? ??????????</span>
                        <p className="register__input-heding">Email</p>
                        <input
                            className="register__input"
                            id="email-input"
                            type="email"
                            minLength="2"
                            maxLength="30"
                            name="password"
                            placeholder="pochta@yandex.ru"
                            onChange={handleChangeEmail}
                            >
                        </input>
                        <span className={registerEmailSpanClass}>???????????????????????? email</span>
                        <p className="register__input-heding">????????????</p>
                        <input
                            className="register__input"
                            id="password-input"
                            type="password"
                            minLength="8"
                            name="password"
                            placeholder="example1122"
                            onChange={handleChangePassword}
                            >
                        </input>
                        <span className={registerPasswordSpanClass}>???????????? ???????????? ???????????????? ???? ?????????????????? ???????? ?????? ???????? ?? ???????? ???? ???????????? 8 ????????????????</span>
                        <button className={registerButtonClassName} type="submit" disabled={buttonEnabled}>????????????????????????????????????</button>
                        <p className="register__subtitle">?????? ?????????????????????????????????&nbsp;
                    <Link className="register__link" to="/login">
                            ??????????
                        </Link>
                    </p>
                    <span className={errorRegisterClassName}>{errorRegistrationText}</span>   
                    </form> 
                </div>
            </div>
        </>
    
    
    );
};

export default withRouter(Register);