import { TURNS } from "../constants";
import { checkWinerFrom } from "./board";

const EMPTY_CELL = null;
const MAX_DEPTH = 8;

const evaluationCache = new Map();

export const aiMove = (currentBoard) => {
  let bestScore = -Infinity;
  let bestMove = null;
  const moves = generateMoves(currentBoard);

  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    currentBoard[move] = TURNS.O;
    let score = minimax(currentBoard, 0, false, -Infinity, Infinity);
    currentBoard[move] = EMPTY_CELL;

    if (score === 1) {
      return move;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};

const minimax = (currentBoard, depth, isMaximizing, alpha, beta) => {
  const result = checkWinerFrom(currentBoard);

  if (result !== null) {
    if (result === TURNS.O) {
      return 1 - depth;
    } else if (result === TURNS.X) {
      return -1 + depth;
    } else if (result === "tie") {
      return 0;
    }
  }

  if (depth >= MAX_DEPTH) {
    const cachedScore = evaluationCache.get(currentBoard);
    if (cachedScore !== undefined) {
      return cachedScore;
    }

    const score = evaluateBoard(currentBoard, isMaximizing);
    evaluationCache.set(currentBoard, score);
    return score;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    const moves = generateMoves(currentBoard);

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      currentBoard[move] = TURNS.O;
      let score = minimax(currentBoard, depth + 1, false, alpha, beta);
      currentBoard[move] = EMPTY_CELL;

      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
        break;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    const moves = generateMoves(currentBoard);

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      currentBoard[move] = TURNS.X;
      let score = minimax(currentBoard, depth + 1, true, alpha, beta);
      currentBoard[move] = EMPTY_CELL;

      bestScore = Math.min(score, bestScore);
      beta = Math.min(beta, score);
      if (beta <= alpha) {
        break;
      }
    }
    return bestScore;
  }
};

const generateMoves = (currentBoard) => {
  const moves = [];

  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === EMPTY_CELL) {
      moves.push(i);
    }
  }

  return moves;
};

const EVALUATION_FACTORS = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1], // Factor de ocupación del tablero
  [1, 0.5, 0.6, 0.5, 1, 0.5, 0.6, 0.5, 1], // Factor de importancia de las posiciones
  [0, 1, 1, 1.2, 1.2, 1.2, 1, 1, 0], // Factor de formación de líneas
  [0, 1, 1, 1.2, 1.2, 1.2, 1, 1, 0], // Factor de bloqueo de jugadas ganadoras del oponente
];

const evaluateBoard = (currentBoard, isMaximizing) => {
  const result = checkWinerFrom(currentBoard);

  if (result === TURNS.O) {
    return Infinity;
  } else if (result === TURNS.X) {
    return -Infinity;
  } else if (result === "tie") {
    return 0;
  }

  let score = 0;

  for (let i = 0; i < EVALUATION_FACTORS.length; i++) {
    for (let j = 0; j < 9; j++) {
      if (currentBoard[j] === TURNS.O) {
        score += EVALUATION_FACTORS[i][j];
      } else if (currentBoard[j] === TURNS.X) {
        score -= EVALUATION_FACTORS[i][j];
      }
    }
  }

  const opponent = isMaximizing ? TURNS.X : TURNS.O;
  const opponentResult = checkWinerFrom(currentBoard, opponent);
  if (opponentResult === opponent) {
    score -= 10;
  }

  return score;
};