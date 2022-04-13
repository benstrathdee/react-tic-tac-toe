import React from "react";
import { useState } from "react";
import styles from "./TicTacToe.module.scss";

const TicTacToe = ({ size = 300 }) => {
	const [turn, setTurn] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [infoOpacity, setInfoOpacity] = useState(1);
	const [infoZIndex, setInfoZIndex] = useState(1);
	const [infoText, setInfoText] = useState("New Game?");

	// These values can be whatever you want
	// (although ideally just one character)
	const playerOne = "○";
	const playerTwo = "✖";

	// These values can be any valid CSS color
	const winnerColor = "lightgreen";
	const loserColor = "pink";

	const checkForWin = () => {
		const board = [];
		for (let i = 0; i < 9; i++) {
			const square = document.getElementById(`${i}`);
			board.push(square.textContent);
		}
		if (!gameOver) {
			for (let i = 0; i < 8; i += 3) {
				if (
					board[i] !== "" &&
					board[i] === board[i + 1] &&
					board[i] === board[i + 2]
				) {
					endGame([i, i + 1, i + 2], board[i]);
					return;
				}
			}
			for (let i = 0; i < 3; i++) {
				if (
					board[i] !== "" &&
					board[i] === board[i + 3] &&
					board[i] === board[i + 6]
				) {
					endGame([i, i + 3, i + 6], board[i]);
					return;
				}
			}
			if (
				board[0] !== "" &&
				board[0] === board[4] &&
				board[0] === board[8]
			) {
				endGame([0, 4, 8], board[0]);
				return;
			} else if (
				board[2] !== "" &&
				board[2] === board[4] &&
				board[2] === board[6]
			) {
				endGame([2, 4, 6], board[2]);
				return;
			} else if (turn === 8) {
				endGame("gameOver");
			}
		}
	};

	const endGame = (winningPattern, winner) => {
		if (typeof winningPattern === "string") {
			for (let i = 0; i < 9; i++) {
				const square = document.getElementById(`${i}`);
				square.style.backgroundColor = loserColor;
			}
			setInfoText("Game Over! Draw!");
		} else {
			for (let i = 0; i < 9; i++) {
				const square = document.getElementById(`${i}`);
				square.style.backgroundColor = winningPattern.includes(i)
					? winnerColor
					: loserColor;
			}
			setInfoText(`Victory! ${winner} wins!`);
		}
		setGameOver(true);
		setInfoZIndex(1);
		setInfoOpacity(1);
	};

	const resetGame = () => {
		for (let i = 0; i < 9; i++) {
			const square = document.getElementById(`${i}`);
			square.textContent = "";
			square.style.backgroundColor = "white";
		}
		setTurn(0);
		setGameOver(false);
		setInfoOpacity(0);
		setInfoZIndex(-1);
	};

	const handleClick = (e) => {
		const square = e.target;
		const input = document.createTextNode(
			turn % 2 === 0 ? playerOne : playerTwo
		);
		if (square.textContent === "" && !gameOver) {
			square.appendChild(input);
			setTurn(turn + 1);
		}
		checkForWin();
	};

	return (
		<>
			<div
				id="info"
				className={styles.TTTInfo}
				style={{
					width: size,
					height: size,
					opacity: infoOpacity,
					zIndex: infoZIndex,
				}}
			>
				<h2>Tic-Tac-Toe</h2>
				<p id="victor">{infoText}</p>
				<button onClick={() => resetGame()}>Play</button>
			</div>
			<div
				className={styles.TTTBoard}
				style={{ width: size, height: size }}
			>
				<div
					id="0"
					className={`${styles.TTTBoard_Square__Top} ${styles.TTTBoard_Square__Left}`}
					onClick={handleClick}
				></div>
				<div
					id="1"
					className={styles.TTTBoard_Square__Top}
					onClick={handleClick}
				></div>
				<div
					id="2"
					className={`${styles.TTTBoard_Square__Top} ${styles.TTTBoard_Square__Right}`}
					onClick={handleClick}
				></div>
				<div
					id="3"
					className={styles.TTTBoard_Square__Left}
					onClick={handleClick}
				></div>
				<div
					id="4"
					className={styles.TTTBoard_Square__Center}
					onClick={handleClick}
				></div>
				<div
					id="5"
					className={styles.TTTBoard_Square__Right}
					onClick={handleClick}
				></div>
				<div
					id="6"
					className={`${styles.TTTBoard_Square__Bottom} ${styles.TTTBoard_Square__Left}`}
					onClick={handleClick}
				></div>
				<div
					id="7"
					className={styles.TTTBoard_Square__Bottom}
					onClick={handleClick}
				></div>
				<div
					id="8"
					className={`${styles.TTTBoard_Square__Bottom} ${styles.TTTBoard_Square__Right}`}
					onClick={handleClick}
				></div>
			</div>
		</>
	);
};

export default TicTacToe;
