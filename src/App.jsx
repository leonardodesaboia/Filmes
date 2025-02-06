import { useState,useEffect } from 'react'
import Search from './components/Search'
import Loader from './components/Loader'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'


const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [deboucedSearchTerm, setDeboucedSearchTerm] = useState('')

  useDebounce(() => setDeboucedSearchTerm(searchTerm), 600, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try{
      const endpoint =query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)
      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()
      
      if(data.response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies')
        setMovieList([])
        return
      }

      setMovieList(data.results || [])
      console.log(data.results)

    }catch(error){
      console.error('Error fetching movies: ' + error)
      setErrorMessage('Error fetching movies. Please try again later.')
    }finally{
      setIsLoading(false)
    }

  }
  useEffect(() => {
    fetchMovies(deboucedSearchTerm)
  }, [deboucedSearchTerm])

  return (
    <main>
      <div className='pattern'/>
      
      <div className='wrapper'>
        <header>
            <img src="../public/hero-img.png" alt="Movie Heroes" />
          <h1>Encontre <span>Filmes</span> Que Você Gosta Sem Esforço</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2>Todos os filmes</h2>

          {isLoading ? 
            (<Loader />

            ): errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} {...movie}/>
              ))}
            </ul>
          )
          }
        </section>
        </div>
    </main>
  )
}

export default App