// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState (key, defaultValue = '') {
  const [state, setState] = React.useState(() => {
    const item = window.localStorage.getItem(key)
    return item ? item : defaultValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  // Only run the effect if `name` changes.
  // https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
