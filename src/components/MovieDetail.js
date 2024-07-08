import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=9d2bff12ed955c7f1f74b83187f188ae`);
      setMovie(response.data);
    };

    const fetchVideos = async () => {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9d2bff12ed955c7f1f74b83187f188ae`);
      setVideos(response.data.results);
    };

    fetchMovie();
    fetchVideos();
  }, [id]);

  if (!movie) return <div>로딩중...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      {videos.map(video => (
        <YouTube key={video.id} videoId={video.key} />
      ))}
    </div>
  );
};

export default MovieDetail;
