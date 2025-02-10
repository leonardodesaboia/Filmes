// src/MovieDetails/index.jsx
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import { API_BASE_URL, API_OPTIONS } from '../services/api'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'


const MovieDetails = () => {
 const { id } = useParams()
 const [movie, setMovie] = useState(null)
 const [isLoading, setIsLoading] = useState(true)
 const [error, setError] = useState(null)

 const navigate = useNavigate();

 const handleBuyClick = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  cartItems.push({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path
  });
  localStorage.setItem('cart', JSON.stringify(cartItems));
  navigate('/cart');
};

 useEffect(() => {
   const fetchMovieDetails = async () => {
     try {
       const response = await fetch(
         `${API_BASE_URL}/movie/${id}?append_to_response=videos,credits`,
         API_OPTIONS
       )

       if (!response.ok) {
         throw new Error('Movie not found')
       }

       const data = await response.json()
       setMovie(data)
     } catch (error) {
       setError(error.message)
       console.error('Error fetching movie details:', error)
     } finally {
       setIsLoading(false)
     }
   }

   fetchMovieDetails()
 }, [id])

 if (isLoading) return <Loader />
 if (error) return <div className="error-message">{error}</div>
 if (!movie) return <div className="error-message">Movie not found</div>

 const trailerVideo = movie.videos?.results.find(
   video => video.type === "Trailer" && video.site === "YouTube"
 )

 return (
  <div>
    <Navbar />
      <div className="movie-page">
        <div className="movie-container">
          <div className="movie-content">
            <div className="movie-poster">
              <img 
                src={movie.poster_path ? 
                  `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 
                  '/No-Poster.png'} 
                alt={movie.title} 
              />
            </div>
            
            <div className="movie-details">
              <div className="movie-header">
                <div>
                  <h1>{movie.title}</h1>
                  <div className="movie-meta">
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <span className="separator">•</span>
                    <span>{movie.runtime} min</span>
                    <span className="separator">•</span>
                    <span>{movie.original_language.toUpperCase()}</span>
                  </div>
                </div>
                <div className="movie-rating">
                  <img src="/star.svg" alt="Rating" />
                  <span className="rating-value">{movie.vote_average.toFixed(1)}</span>
                  <span className="rating-count">/10 ({movie.vote_count})</span>
                </div>
              </div>

              {trailerVideo && (
                <div className="trailer-container">
                  <img 
                    src={`https://img.youtube.com/vi/${trailerVideo.key}/maxresdefault.jpg`}
                    alt="Trailer thumbnail"
                  />
                  <a 
                    href={`https://www.youtube.com/watch?v=${trailerVideo.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="play-button"
                  >
                    <div className="play-button-outer">
                      <div className="play-button-inner">
                        <div className="play-triangle"></div>
                      </div>
                    </div>
                  </a>
                </div>
              )}

              <div className="info-grid">
                <div className="overview">
                  <h2>Overview</h2>
                  <p>{movie.overview}</p>
                </div>
                
                <div className="movie-info">
                  <div className="info-item">
                    <h3>Release date</h3>
                    <p>{new Date(movie.release_date).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="info-item">
                    <h3>Genres</h3>
                    <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
                  </div>

                  {movie.budget > 0 && (
                    <div className="info-item">
                      <h3>Budget</h3>
                      <p>${(movie.budget / 1000000).toFixed(1)} million</p>
                    </div>
                  )}
                  
                  {movie.revenue > 0 && (
                    <div className="info-item">
                      <h3>Revenue</h3>
                      <p>${(movie.revenue / 1000000).toFixed(1)} million</p>
                    </div>
                  )}
                </div>
              </div>

                <a onClick={() => {navigate('/cart'); handleBuyClick()}} target="_blank" rel="noopener noreferrer" className="homepage-button">
                  Comprar 
                </a>
            </div>
          </div>
        </div>
      </div>
   </div>
 )
}

export default MovieDetails