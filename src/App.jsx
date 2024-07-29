import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import './assets/pokemon_font_solid.ttf'
import { Title } from './components/Title';
import { fetchPokemon } from './services/PokemonService'
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PokemonCard } from './components/PokemonCard';
import { pokemonNames } from './globals'
import { GameWonComponent } from './components/GameWonComponent';

function App() {
  const [pokemonCardList, setPokemonCardList] = useState([
    {name: '', id: uuidv4(), url: ''}
  ])
  const [selectedPokemons, setSelectedPokemons] = useState([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [gameWon, setGameWon] = useState(false)

  const checkGameOver = () => {
    if(score == pokemonCardList.length){
      setGameWon(true)
      resetGame()
    }
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const populatePokemonCardList = async () => {
    const pokemonArray = []
      setLoading(true)
      for(let i=0; i<pokemonNames.length; i++){
        const response = await fetchPokemon(pokemonNames[i])
        pokemonArray.push(
          {
            id: uuidv4(),
            name: response.name,
            url: response.sprites.front_default
          }
        )
    }
    shufflePokemonsMount(pokemonArray)
    setLoading(false)
  }

  const checkPokemonIsSelected = (pokemon) => {
    if (typeof pokemon != 'undefined'){
      return selectedPokemons.includes(pokemon.name)
    }
  }

  const shufflePokemons = () => {
    let currentIndex = pokemonCardList.length
    const array = pokemonCardList
    while(currentIndex != 0){
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    setPokemonCardList(array)
  }

  const shufflePokemonsMount = (pokemons) => {
    let currentIndex = pokemons.length
    const array = pokemons
    while(currentIndex != 0){
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    setPokemonCardList(array)
  }

  const checkAndSetHighScore = () => {
    if(score > highScore) setHighScore(score)
  }

  const resetGame = () => {
    checkAndSetHighScore()
    setScore(0)
    setSelectedPokemons([])
    shufflePokemons()
  }

  const notClickedPreviousPokemon = (name) => {
    if(!selectedPokemons.includes(name)) return true
    resetGame()
  }

  const selectPokemon = (pokemon) => {
    if(notClickedPreviousPokemon(pokemon.name)){
      setSelectedPokemons([...selectedPokemons, pokemon.name])
      setScore((score) => score + 1)
      shufflePokemons()
    }
  }
  const loadingSpinner = <div className="text-center text-danger"><div className="spinner-border"></div></div>

  useEffect(() => {
    populatePokemonCardList()
  }, [])

  useEffect(() => {
    checkGameOver()
  }, [score])

  return (
    <>
      <div className="container-fluid">
        <Title />
        {(gameWon ? <GameWonComponent setGameWon={setGameWon} /> : (<>
          <div className="row pb-5">
            {loading ? loadingSpinner : 
              pokemonCardList.map((pokemon, index) => {
              return <PokemonCard 
                      key={pokemon.id}
                      pokemon={pokemon}
                      selectPokemon={selectPokemon}
                    />
            })}
          </div>
          <footer className="footer">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-6 text-center">
                <h4 className='pokemon-font' >Score: {score}</h4>
              </div>
              <div className="col-md-6 col-lg-6 col-6 text-center">
                <h4 className='pokemon-font'>High Score: {highScore}</h4>
              </div>
            </div>
          </footer>
        </>))}
      </div>
    </>
  )
}

export default App
