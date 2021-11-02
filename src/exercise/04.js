// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board() {
  const EMPTY_SQUARES = Array(9).fill(null)

  const [squares, setSquares] = useLocalStorageState(
    'squares',
    EMPTY_SQUARES
  )

  // State hook for tracking the history of gameplay.
  const [history, setHistory] = useLocalStorageState(
    'history',
    []
  )

  const nextValue = calculateNextValue(squares)
  const winner = calculateWinner(squares)
  const status = calculateStatus(winner, squares, nextValue)

  function selectSquare(square) {
    if (winner || squares[square]) {
      return
    }

    const nextValue = calculateNextValue(squares)

    // Update squares with the new move.
    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    setSquares(squaresCopy)

    // Update history now that the new move has been made.
    setHistory([...history, nextValue])
  }

  function restart() {
    setSquares(EMPTY_SQUARES)
    setHistory([])
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  const moves = history.map(function (move) {
    return <li>{move}</li>
  })

  return (
    <div>
      <div className="status">{status}</div>
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
      <button className="restart" onClick={restart}>
        restart
      </button>
      <ol>{moves}</ol>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
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
