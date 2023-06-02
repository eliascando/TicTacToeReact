import { useState, useEffect } from "react"
import {PropTypes} from 'prop-types'
import { Square } from "./Square"
import { WinnerModal } from "./WinnerModal"
import { TURNS } from "../constants"
import { resetGameStorage, saveGameToStorage, salirGameStorage} from "../logic/storage"
import { checkWinerFrom, checkEndGame } from "../logic/board"
import { aiMove } from "../logic/ia"
import confetti from 'canvas-confetti'
import { SetNameModal } from "./SetNameModal"

export const Game = ({
    setHaElegidoModo,
    setModoJuego,
    modoJuego
}) => {
      
    const [board, setBoard] = useState( () => {
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage 
          ? JSON.parse(boardFromStorage)
          : Array(9).fill(null)
    })
      const [turn, setTurn] = useState( () => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? TURNS.X
      })
    const [playerName1, setPlayerName1] = useState(()=>{
        const nameFromStorage = window.localStorage.getItem('nombre1')
        return nameFromStorage ?? ''
    });
    const [playerName2, setPlayerName2] = useState(()=>{
        const nameFromStorage = window.localStorage.getItem('nombre2')
        return nameFromStorage ?? ''
    });
    const [nameWiner, setNameWinner] = useState('')
    
    useEffect(() => {
        if(modoJuego == 'ia'){
            if (turn === TURNS.O) {
            // Turno de la IA
            setTimeout(() => {
                const aiMoveIndex = aiMove(board);
                updateBoard(aiMoveIndex);
            }, 250);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn, board]);  

      //null es que no hay ganador, false es que hay un empate
      const [winner, setWinner] = useState(null)
    
      const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
        setNameWinner('')
        resetGameStorage()
      }
    
      const updateBoard = (index) => {
        //no actualizamos esto si ya tiene algo
        if(board[index] || winner) return
        //actualizar el tablero
        const newBoard = [... board]
        newBoard[index] = turn
        setBoard(newBoard)
        //cambiar el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        //guardar aqui partida
        saveGameToStorage({
          board : newBoard,
          turn : newTurn
        })
        //revisar si hay ganador
        const newWinner = checkWinerFrom(newBoard)
        if(newWinner){
          confetti()
          setWinner(newWinner)
          if(newWinner == TURNS.X) {setNameWinner(playerName1)}
          if(newWinner == TURNS.O) {setNameWinner(playerName2)}
        }else if(checkEndGame(newBoard)){
          setWinner(false)
        }
      }
  return (
    <main className="board">
      <h1>TicTacToe</h1>
      <section className="game">
        {
          board.map((cell, index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <p className="nombres nombre1">{playerName1}</p>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
        <p className="nombres nombre2">{playerName2}</p>
      </section>
      <footer>
        <button onClick={resetGame}>Reiniciar el Juego</button>
        <button 
        onClick={() => {
            setHaElegidoModo(false);
            setModoJuego('');
            salirGameStorage();
        }}
        >Salir del Juego</button>
      </footer>
      <SetNameModal
          setPlayerName1={setPlayerName1}
          setPlayerName2={setPlayerName2}
          playerName1={playerName1}
          playerName2={playerName2}
          setHaElegidoModo={setHaElegidoModo}
          setModoJuego={setModoJuego}
          modoJuego={modoJuego}
        />
      <WinnerModal nameWiner={nameWiner} winner={winner} resetGame={resetGame} />
    </main>
  )
}

Game.propTypes = {
    setHaElegidoModo: PropTypes.func,
    setModoJuego: PropTypes.func,
    modoJuego: PropTypes.string
}