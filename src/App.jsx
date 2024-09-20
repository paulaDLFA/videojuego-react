import './App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'

  const TURNS = {
    X: 'x',
    O:'o'
  }

  const Square =({ children, isSelected, updadateBoard, index,}) => {
   const className=`square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updadateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6]
  [2,5,8]

]


function App() {

  const [board, setBoard]=useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner]=useState(null)

  const checkWinner=(boardCheck) => {
    for (const combo of WINNER) {
      const [a,b,c]=combo
      if (
        boardCheck[a] &&
        boardCheck[a] == boardCheck[b] &&
        boardCheck[a] == boardCheck[c]
       ) {
        return boardCheck [a]
      }
    }
    return null //no hay ganador
  }


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame=(newBoard) =>
  {
    return newBoard.every((square) => square !=null)
  }

  const updadateBoard=(index) => {

    if(board[index] || winner) return //Ya tiene algo o ya hay ganador

    const newBoard = [... board]
    newBoard [index] = turn
    setBoard(newBoard)
  
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner=checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (

    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
      {
        board.map((square,index) => {
            return (
              <Square
                key={index}
                index={index}
                updadateBoard={updadateBoard}
              >
                {square}
              </Square>
            )
        })
      }  
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

  

  {
    winner != null && (
      <section className="winner">
        <div className="text">
          <h2>
            {
             winner === false
              ? 'Empate'
              : 'Gano'
            }
          </h2>

          <header className="win">
            {winner && <Square>{winner}</Square>}
          </header>
        
          <footer>
            <button onClick={resetGame}> Empezar de nuevo </button>
          </footer>

        </div>
      </section>
    )    
  }
  </main>

  )
}
  
export default App
