// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemonInfoState, setPokemonInfoState] = React.useState({
    // Tracks status of the application.
    status: 'idle',
    // Tracks the pokemon to be shown.
    pokemon: null,
    // Tracks the error(s) to be shown.
    error: null,
  })

  // Set up an Effect Hook to fetch the pokemon data only when `pokemonName` changes.
  React.useEffect(() => {
    // If the pokemonName is falsy, we don't need to fetch anything.
    if (!pokemonName) {
      return
    }

    // Indicate this is a pending request and nullify any previously set `pokemon` or `error`.
    setPokemonInfoState({
      status: 'pending',
      pokemon: null,
      error: null,
    })

    // Fetch the pokemon data, and set the error if there is one.
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setPokemonInfoState({
          status: 'resolved',
          pokemon: pokemonData,
        })
      }, (error) => {
        setPokemonInfoState({
          status: 'rejected',
          error: error,
        })
      })
  }, [pokemonName])

  if (pokemonInfoState.status === 'idle') {
    return <span>Submit a pokemon</span>
  }

  if (pokemonInfoState.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (pokemonInfoState.status === 'resolved') {
    return <PokemonDataView pokemon={pokemonInfoState.pokemon} />
  }

  if (pokemonInfoState.status === 'rejected') {
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{pokemonInfoState.error.message}</pre>
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
