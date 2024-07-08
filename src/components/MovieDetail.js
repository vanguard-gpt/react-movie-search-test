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
      <table style={{ width: '100%', marginTop: '20px' }}>
        <tbody>
          <tr>
            <td style={{ width: '30%', textAlign: 'center' }}>
              {movie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} style={{ maxWidth: '100%', maxHeight: 'auto' }} />
              ) : (
                <p>이미지가 없습니다.</p>
              )}
            </td>
            <td style={{ paddingLeft: '20px' }}>
              <h1>{movie.title}</h1>
              <p>시놉시스: {movie.overview}</p>
              <p>평점: {movie.vote_average}</p>
              <p>인기도: {movie.popularity}</p>
              <p>비디오 출시 여부: {movie.video ? '예' : '아니오'}</p>
            </td>
          </tr>
          <tr>
            <td>
              {videos.length === 0 ? (
                <p>비디오가 없습니다.</p>
              ) : (
                <div>
                  <h2>동영상 클립</h2>
                  {videos.map(video => (
                    <YouTube key={video.id} videoId={video.key} />
                  ))}
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MovieDetail;
