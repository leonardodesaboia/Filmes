import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ title, vote_average, poster_path, release_date, original_language, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
  navigate(`/movie/${id}`);
};
  return (
   <div className="movie-card" onClick={handleClick}>
     <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '../../public/No-Poster.png'} 
          alt={title} />
        <div>
            <h3>{title}</h3>
            <div className='content'>
                <div className='rating'> 
                    <img src="/star.svg" alt="Rating"/>
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    <span>•</span>
                    <p className='lang'>{original_language.toUpperCase()}</p>
                    <span>•</span>
                    <p className='year' {...release_date ? release_date.split('-')[0] : 'N/A'}>{release_date}</p>
                </div>
            </div>
        </div>
   </div>
 )
}

MovieCard.propTypes = {
 title: PropTypes.string.isRequired,
 vote_average: PropTypes.number.isRequired,
 poster_path: PropTypes.string,
 release_date: PropTypes.string.isRequired,
 original_language: PropTypes.string.isRequired,
 id: PropTypes.number.isRequired
}

export default MovieCard