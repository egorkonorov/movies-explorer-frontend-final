class MainApi {
    constructor(options) {
      this._url = options.baseUrl;
      this._contentType = options.headers.contentType;
    }
  
    _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }


    getMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
          'Content-Type': `${this._contentType}`,
          'authorization': `Bearer ${token}`,
        },
  })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

    deleteMovie(token, movieId) {
      return fetch(`${this._url}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': `${this._contentType}`,
            'authorization': `Bearer ${token}`,
          },
    })
      .then((res) => {
        return this._getResponseData(res);
      });
    }

    patchUserInfo(token, userName, userEmail) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: {
            'Content-Type': `${this._contentType}`,
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name:userName,
            email:userEmail
        })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
    }
  
    


  
    addMovie(
        movieCountry,
        movieDirector,
        movieDuration,
        movieDescription,
        movieImage,
        movieTrailer,
        movieNameRU,
        movieNameEN,
        movieThumbnail,
        movieId,
        movieYear,
        token
           ) {
      return fetch(`${this._url}/movies`, {
        method: "POST",
        headers: {
            'Content-Type': `${this._contentType}`,
            'authorization': `Bearer ${token}`,
          },
        body: JSON.stringify({
            country: movieCountry,
            director: movieDirector,
            duration: movieDuration,
            description: movieDescription,
            image: movieImage,  
            trailer: movieTrailer,
            nameRU: movieNameRU,
            nameEN: movieNameEN,
            thumbnail: movieThumbnail,
            movieId: movieId,
            year: movieYear,
        })
    })
      .then((res) => {
        return this._getResponseData(res);
      });
    }
  
  }
  
  const mainapi = new MainApi({
    baseUrl: "https://diploma.api.nomoredomains.rocks",
    headers: {
      contentType: "application/json",
    },
  });
  
  export default mainapi;