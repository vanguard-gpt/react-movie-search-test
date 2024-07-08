import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Movies = () =>{
const [movieName, setMovieName] = useState('');
const [movies,setMovies] = useState([]);
const search = () =>{
axios.get(`https://api.themoviedb.org/3/search/movie?api_key=9d2bff12ed955c7f1f74b83187f188ae&query=${movieName}`)
.then((res)=>{
console.log(res);
setMovies(res.data.results);
}).catch(e=>{
console.log(e);
})
}

const name = (e) =>{
setMovieName(e.target.value);
}

useEffect(()=>{
console.log(movies)
},[movies])

return(
    <>
        <input onChange={(e) => name(e)} type="text" placeholder="영화 제목을 입력하세요" />
        <button onClick={search}>검색</button>
        <div>
            {
            movies.map((movie)=>(
                <div>
                <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path}/>
                <div>{movie.original_title}</div>
                </div>
            ))
            }
        </div>
        </>
);
}

export default Movies;