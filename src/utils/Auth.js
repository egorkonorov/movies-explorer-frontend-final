export const BASE_URL = 'https://diploma.api.nomoredomains.rocks';

export const register = (userPassword, userEmail, userName) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password: userPassword, email:userEmail, name:userName})
  })
  .then((res) => {
    return getResponseData(res);
  })
  
}; 

export const authorize = (userEmail, userPassword) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password: userPassword, email: userEmail})
    })
    .then((res) => {
      return getResponseData(res)
    })
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
    })
  }; 


  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      }
    })
    .then((res) => {
      return getResponseData(res);
    })
  } 

  export const getResponseData = (res) => {
    if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}