// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

// Module dependencies
import * as React from 'react'
import {useLocalStorageState} from '../utils'

/**
 * Utility function for rendering a tic-tac-toe board
 *
 * @param {function} onClick handler for the squares in the board
 * @param {array} squares expects an array of 9 elements (3x3 board)
 * @returns React.Component
 */
function Board({onClick, squares}) {

  /**
   * Utility function for rendering a square in the board
   * @param {number} i positive integer [1, 9]
   * @returns React.Component
   */
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

/**
 * Tic Tac Toe game
 *
 * @returns React.Component
 */
function Game() {
  // State hook that represents the current state of the game
  const [squares, setSquares] = useLocalStorageState('squares', EMPTY_SQUARES)
  // State hook that represents the history of the game
  const [history, setHistory] = useLocalStorageState('history', [])

  // Initializers for the starting state of the game
  const EMPTY_SQUARES = Array(9).fill(null)
  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  /**
   * Event handler for when a square is selected
   *
   * @param {number} square positive integer [0, 8]
   * @returns undefined
   */
  function selectSquare(square) {
    // If the winner is already determined or square was previously selected, do nothing
    if (winner || squares[square]) {
      return
    }

    // Update the board with the next value.
    const nextValue = calculateNextValue(squares)
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)

    // Update history with a snapshot of the board. 📸
    setHistory([...history, squaresCopy])
  }

  /**
   * Event handler for when the game is restarted
   *
   * @returns undefined
   */
  function restart() {
    setSquares(EMPTY_SQUARES)
    setHistory([])
  }

  /**
   * A collection of list items representing the history of the game.
   *
   * @returns React.Component
   */
  const moves = history.map(function (move, index) {
    return (
      <li key={index}>{move} <button onClick={() => {
        // Reset the board back at this move.
        setSquares(move)
        // Clean up history.
        setHistory(history.slice(0, index + 1))
      }}>🔙 </button></li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={squares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
/**
 *
 * @param {string|null} winner The winner of the board (if already determined)
 * @param {array} squares
 * @param {string} nextValue
 * @returns {string}
 */
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
/**
 * Utility function for returning the next value to be used in a tic-tac-toe
 * @param {array} squares
 * @returns {string} 'X' or 'O'
 */
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
/**
 * Utility function for calculating the winner of a 3x3 tic-tac-toe board
 * @param {array} squares
 * @returns {string|null} 'X', 'O', or null
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
