import { WINNER } from "../constants"

export const checkWinner=(boardCheck) => {
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

export const checkEndGame=(newBoard) =>
    {
      return newBoard.every((square) => square !=null)
    }