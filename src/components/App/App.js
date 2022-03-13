import React, {useState, useEffect} from "react";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import Main from "./../Main/Main";
import Movies from "./../Movies/Movies";
import SavedMovies from "./../SavedMovies/SavedMovies";
import Profile from "./../Profile/Profile";
import Register from "./../Register/Register";
import Login from "./../Login/Login";
import Error404 from "./../Errors/Error404/Error404";
import * as Auth from './../../utils/Auth';
import ProtectedRoute from "./../ProtectedRoute";
import { CurrentUserContext } from "./../../contexts/CurrentUserContext";

function App() {

  if (!localStorage.getItem('loggedIn')) {
    localStorage.setItem('loggedIn', JSON.stringify(false))
 } 
  const history = useHistory()

  const [currentUser, setCurrentUser] = useState('') 
  const [errorRegisterClassName, setErrorRegisterClassName] = useState('register__error_disabled')
  const [errorRegistrationText, setErrorRegistrationText] = useState('')
  const [errorLoginClassName, setErrorLoginClassName] = useState('login__error_disabled')
  const [errorLoginText, setErrorLoginText] = useState('')

  function tokenCheck () {
    const jwt = localStorage.getItem('token');
    console.log(jwt)
  if (jwt){
    Auth.getContent(jwt).then((res) => {
      if (res){
        localStorage.setItem('loggedIn', JSON.stringify(true))
        setCurrentUser(res)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

  useEffect(() => {
    tokenCheck()
  }, [])

  function handleLogin (email, password) {
    Auth.authorize(email, password)
        .then((data) => {
            if (data.token) {
              setErrorLoginClassName('login__error_disabled')
              console.log(data.token)
                history.push('/')
                window.location.reload()
            }
        })
        .catch((err) => {
            console.log(err)
            setErrorLoginClassName('login__error_enabled')
            setErrorLoginText(`${err === 'Ошибка: 401'? 'Неправильный логин или пароль' : err}`)
        })
  }


  function handleRegister (password, email, name) {
    Auth.register(password, email, name)
        .then((res) => {
                setErrorRegisterClassName('register__error_disabled')
                handleLogin (email, password)
                console.log(res)
        })
        .catch((err) => {
          console.log(err)
          setErrorRegisterClassName('register__error_enabled')
          setErrorRegistrationText(`${err === 'Ошибка: 409'? 'Такой email уже используется' : err}`)
      })
  }

 
  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
    <Switch>

  <ProtectedRoute
          path="/movies"
          loggedIn={JSON.parse(localStorage.getItem('loggedIn'))}
          component={Movies}
    />
  <ProtectedRoute
          path="/saved-movies"
          loggedIn={JSON.parse(localStorage.getItem('loggedIn'))}
          component={SavedMovies}
    />
    <ProtectedRoute
          path="/profile"
          loggedIn={JSON.parse(localStorage.getItem('loggedIn'))}
          component={Profile}
    />      

      <Route path="/register">
        <Register handleRegister={handleRegister} errorRegisterClassName={errorRegisterClassName} errorRegistrationText={errorRegistrationText}>
          
        </Register>
      </Route >

      <Route path="/login">
        <Login handleLogin={handleLogin} errorLoginClassName={errorLoginClassName} errorLoginText={errorLoginText}>

        </Login>
      </Route >

      <Route exact path="/">
        <Main loggedIn={JSON.parse(localStorage.getItem('loggedIn'))}>
          
        </Main>
      </Route>

      <Route path="*">
        <Error404>

        </Error404>
      </Route >
      </Switch>
      </CurrentUserContext.Provider>
  </>
  );
}

export default App;
