// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm} from '../pokemon'

// Source: https://reactjs.org/docs/error-boundaries.html
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false, error: null}
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error}
  }

  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{this.state.error.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    // Tracks status of the application.
    status: 'idle',
    // Tracks the pokemon to be shown.
    pokemon: null,
    // Tracks the error(s) to be shown.
    error: null,
  })

  const {status, pokemon, error} = state

  // Set up an Effect Hook to fetch the pokemon data only when `pokemonName` changes.
  React.useEffect(() => {
    // If the pokemonName is falsy, we don't need to fetch anything.
    if (!pokemonName) {
      return
    }

    // Indicate this is a pending request and nullify any previously set `pokemon` or `error`.
    setState({
      status: 'pending',
      pokemon: null,
      error: null,
    })

    // Fetch the pokemon data, and set the error if there is one.
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({
          status: 'resolved',
          pokemon: pokemonData,
        })
      }, (error) => {
        setState({
          status: 'rejected',
          error: error,
        })
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
    // Let the Error Boundary component handle how to display the error.
    throw error
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
        <ErrorBoundary>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
