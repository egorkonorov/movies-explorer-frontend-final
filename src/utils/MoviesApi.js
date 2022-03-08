class MoviesApi {
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
  
    getMovies() {
      return fetch(`${this._url}`, {
        method: "GET",
      }).then((res) => {
        return this._getResponseData(res);
      });
    }
  
  }
  
  const moviesapi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
      contentType: "application/json",
    },
  });
  
  export default moviesapi;