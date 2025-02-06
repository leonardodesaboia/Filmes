import PropTypes from 'prop-types'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
      <div>        
          <img 
            src="/search.svg" 
            alt="Search icon" 
          />
          <input 
            type="text" 
            placeholder="Buscar filmes por nome" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
      </div>
    </div>
  )
}

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.string.isRequired
}

export default Search