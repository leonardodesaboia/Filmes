import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import Search from '../components/Search'
import Loader from '../components/Loader'
import MovieCard from '../components/MovieCard'
import { API_BASE_URL, API_OPTIONS } from '../services/api'
import Navbar from '../components/Navbar'

const Home = () => {

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
        <Navbar />
        <div className='pattern'/>
        
        <div className='wrapper'>
          <header>
              <img src="../public/hero-img.png" alt="Movie Heroes" />
            <h1>Encontre <span style={{color: '#8b5cf6' }}>Filmes</span> Que Você Gosta Sem Esforço</h1>
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
  
  export default Home