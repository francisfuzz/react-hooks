// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

function Tilt({children}) {
  // 🐨 create a ref here with React.useRef()
  // This ref will be set on the `.tilt-root` element
  const tiltRef = React.useRef()

  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  // div look fancy.
  React.useEffect(() => {
    // `useRef` is like a "box" that can hold a mutable value in its `.current` property
    // Here, React will set its `.current` property to the DOM element that has the `.tilt-root` class
    const tiltNode = tiltRef.current

    // Initializes an instance of VanillaTilt on the element with some configuration
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5,
    })

    // 💰 Don't forget to return a cleanup function. VanillaTilt.init will add an
    // object to your DOM node to cleanup.
    // If you don't return a cleanup function, VanillaTilt will leak memory.
    return () => tiltNode.vanillaTilt.destroy()
  }, [])

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
