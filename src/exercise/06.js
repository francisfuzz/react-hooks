// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // Set up State Hooks.
  // Tracks status of the application
  const [status, setStatus] = React.useState('idle')
  // Tracks the pokemon to be shown
  const [pokemon, setPokemon] = React.useState(null)
  // Tracks the error(s) to be shown
  const [error, setError] = React.useState(null)

  // Set up an Effect Hook to fetch the pokemon data only when `pokemonName` changes.
  React.useEffect(() => {
    // If the pokemonName is falsy, we don't need to fetch anything.
    if (!pokemonName) {
      return
    }

    // Indicate we're starting a new request.
    setStatus('pending')
    // Reset the pokemon to null so we can appropriately render the fallback.
    setPokemon(null)
    // Reset the error if it was set previously.
    setError(null)

    // Fetch the pokemon data, and set the error if there is one.
    fetchPokemon(pokemonName)
      .then(function (pokemonData) {
        setPokemon(pokemonData)
        setStatus('resolved')
      }, function (error) {
        setError(error)
        setStatus('rejected')
      })
  }, [pokemonName])

  if (status === 'idle') {
    return <span>Submit a pokemon</span>
  }

  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }
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
