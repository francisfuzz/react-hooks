// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // Set up a State Hook to track the pokemon to be shown.
  const [pokemon, setPokemon] = React.useState(null)

  // Set up an Effect Hook to fetch the pokemon data
  // only when `pokemonName` changes.
  React.useEffect(() => {
    // If the pokemonName is falsy, we don't need to fetch anything.
    if (!pokemonName) {
      return
    }

    // Reset the pokemon to null so we can appropriately render the fallback.
    setPokemon(null)

    // Fetch the pokemon data, and catch+log any errors.
    fetchPokemon(pokemonName).then(pokemonData => {
      setPokemon(pokemonData)
    }).catch((e) => console.error(e))
  }, [pokemonName])

  // Prompt the user to enter a pokemon name if we don't have one.
  if (!pokemonName) {
    return <span>Submit a pokemon</span>
  }

  // If we don't have a pokemon, show the fallback.
  if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  }

  // Otherwise, show the pokemon data.
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
