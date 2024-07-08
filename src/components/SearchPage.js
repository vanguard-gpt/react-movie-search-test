import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../SearchPage.css'
const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9d2bff12ed955c7f1f74b83187f188ae&query=${query}`);
    setMovies(response.data.results);
  };

  return (
    <div className='search-page-contianer'>
      <h1>영화 검색</h1>
      <div className='search-container'>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={searchMovies}>검색</button>
      </div>
      <div className='movie-list'>
        <ul>
          {movies.map(movie => (
            <li className='movie-item' key={movie.id}>
              <Link className='movie-link' to={`/movie/${movie.id}`} state={{movie}}>
                {movie.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} style={{ maxWidth: '100%', maxHeight: 'auto' }} />
                ) : (
                  <p>이미지가 없습니다.</p>
                )}
                <div>{movie.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default SearchPage;