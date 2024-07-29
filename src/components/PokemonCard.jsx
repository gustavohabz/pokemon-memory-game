import React from 'react'

export const PokemonCard = ({pokemon, selectPokemon}) => {
  return (
    <div className="col-md-2 col-lg-2 col-4 mt-5">
        <div 
            className="card flip-card 
                      card-text bg-danger 
                      hover-card text-center pb-3"
            onClick={() => selectPokemon(pokemon)}
        >
          <img 
            className="shadow-image img-pokemon"
            src={pokemon.url} alt={pokemon.name}/>
          <div className="card-footer text-white text-center">
            {pokemon.name}
          </div>
        </div>
    </div>
  )
}
