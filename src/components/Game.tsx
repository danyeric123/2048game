import { useState, useEffect } from 'react'
import Board from './Board'

interface GameProps {
  rows?: number,
  columns?: number
}

const Game = ({rows = 4, columns = 4}: GameProps) => {

  //create initial board
  const [board, setBoard] = useState<number[][]>(Array(rows).fill(0).map(() => Array(columns).fill(0)))
  const [score, setScore] = useState<number>(0)

  const initializeBoard = () => {
    let newBoard = Array(rows).fill(0).map(() => Array(columns).fill(0));
    newBoard = addTwo(newBoard)
    newBoard = addTwo(newBoard)
    setBoard(newBoard)
  }

  // initialize board on first render
  useEffect(() => {
    const moveUp = () => {
      let newBoard = board.map(row => [...row]);
      for (let c = 0; c < columns; c++) {
        const slideColumn = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
        [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]] = slide(slideColumn)
      }
      newBoard = addTwo(newBoard)
      setBoard(newBoard)
    }

    const moveDown = () => {
      let newBoard = board.map(row => [...row]);
      for (let c = 0; c < columns; c++) {
        const slideColumn = [newBoard[3][c], newBoard[2][c], newBoard[1][c], newBoard[0][c]];
        [newBoard[3][c], newBoard[2][c], newBoard[1][c], newBoard[0][c]] = slide(slideColumn)
      }
      newBoard = addTwo(newBoard)
      setBoard(newBoard)
    }


    const moveRight = () => {
      let newBoard = board.map(row => [...row]);
      for (let r = 0; r < rows; r++) {
        const slideRow = [newBoard[r][0], newBoard[r][1], newBoard[r][2], newBoard[r][3]];
        [newBoard[r][0], newBoard[r][1], newBoard[r][2], newBoard[r][3]] = slide(slideRow)
      }
      newBoard = addTwo(newBoard)
      setBoard(newBoard)
    }

    const moveLeft = () => {
      let newBoard = board.map(row => [...row]);
      for (let r = 0; r < rows; r++) {
        const slideRow = [newBoard[r][3], newBoard[r][2], newBoard[r][1], newBoard[r][0]];
        [newBoard[r][3], newBoard[r][2], newBoard[r][1], newBoard[r][0]] = slide(slideRow)

      }
      newBoard = addTwo(newBoard)
      setBoard(newBoard)
    }


    const handleKeyUp = (e: KeyboardEvent) => {
      e.preventDefault()
      switch (e.key) {
        case 'ArrowUp':
          moveUp()
          break
        case 'ArrowDown':
          moveDown()
          break
        case 'ArrowLeft':
          moveLeft()
          break
        case 'ArrowRight':
          moveRight()
          break
        default:
          break
      }
    }

    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [board])

  // Second useEffect for initializing the board state
useEffect(() => {
  initializeBoard();
}, []);

  const addTwo = (board: number[][]): number[][] => {
    //find random row and column to place a 2 in
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * columns); 
    //if that spot is empty, place a 2
    if (board[r][c] === 0) {
      board[r][c] = 2
      return board
    } else {
      //otherwise, try again
      return addTwo(board)
    }
  }


  const slide = (row: number[]): number[] => {
    //remove all 0s
    const filteredRow = row.filter(tile => tile !== 0)
    for (let i = 0; i < filteredRow.length; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] = filteredRow[i] * 2
        filteredRow[i + 1] = 0
        setScore(score + filteredRow[i])
      }
    }
    //remove all 0s
    const filteredRow2 = filteredRow.filter(tile => tile !== 0)
    //add 0s to the end
    while (filteredRow2.length < rows) {
      filteredRow2.push(0)
    }
    return filteredRow2
  }

  const newGame = () => {
    initializeBoard()
    setScore(0)
  }

  return (
    <div className="game">
      <h1>2048</h1>
      <h2>Score: {score}</h2>
      <button onClick={newGame}>New Game</button>
      <Board board={board} />
    </div>
  )
}

export default Game