import React from "react";
import { useState } from "react";
import styles from "./TicTacToe.module.css";

const TicTacToe = ({ size = 300 }) => {
	const [infoOpacity, setInfoOpacity] = useState(1);
	const [infoZIndex, setInfoZIndex] = useState(1);
	const [infoText, setInfoText] = useState("New Game?");
	const [previewSquare, setPreviewSquare] = useState("");
	const [filledSquares, setFilledSquares] = useState([]);

	// These values can be whatever you want
	// (although ideally just one character)
	const playerOne = "○";
	const playerTwo = "✖";

	// These values can be any valid CSS color
	const winnerColor = "lightgreen";
	const loserColor = "pink";
	const playerColor = "black";
	const previewColor = "lightgray";

	const checkForWin = () => {
		// grabs the contents of the board
		const board = [];
		for (let i = 0; i < 9; i++) {
			const square = document.getElementById(`${i}`);
			board.push(square.textContent);
		}
		// checks for winning game patterns
		// horizontal patterns
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
		// vertical patterns
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
		// diagonal patterns
		if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
			endGame([0, 4, 8], board[0]);
			return;
		} else if (
			board[2] !== "" &&
			board[2] === board[4] &&
			board[2] === board[6]
		) {
			endGame([2, 4, 6], board[2]);
			return;
		} else if (filledSquares.length === 8) {
			// if board is full and no winner, game over
			endGame(false);
		}
	};

	const endGame = (winningPattern, winner) => {
		if (typeof winningPattern === "boolean") {
			// game over scenario
			for (let i = 0; i < 9; i++) {
				const square = document.getElementById(`${i}`);
				square.style.backgroundColor = loserColor;
			}
			setInfoText("Game Over! Draw!");
		} else {
			// color winning and losing tiles appropriately
			for (let i = 0; i < 9; i++) {
				const square = document.getElementById(`${i}`);
				square.style.backgroundColor = winningPattern.includes(i)
					? winnerColor
					: loserColor;
			}
			setInfoText(`Victory! ${winner} wins!`);
		}
		// pull up info
		setInfoZIndex(1);
		setInfoOpacity(1);
	};

	const resetGame = () => {
		for (let i = 0; i < 9; i++) {
			// reset square colours
			const square = document.getElementById(`${i}`);
			square.textContent = "";
			square.style.backgroundColor = "white";
		}
		// reset board
		setPreviewSquare("");
		setFilledSquares([]);
		// hide info
		setInfoOpacity(0);
		setInfoZIndex(-1);
	};

	const handleClick = (e) => {
		const square = e.target;
		const input = document.createTextNode(
			// alternate between players
			filledSquares.length % 2 === 0 ? playerOne : playerTwo
		);
		if (!filledSquares.includes(square.id)) {
			// remove preview
			square.textContent = "";
			square.style.color = playerColor;
			// place player
			square.appendChild(input);
			setFilledSquares(filledSquares.concat(square.id));
		}
		checkForWin();
	};

	const handleMouseEnter = (e) => {
		// places preview icon in square on hover
		const square = e.target;
		const input = document.createTextNode(
			filledSquares.length % 2 === 0 ? playerOne : playerTwo
		);
		if (!filledSquares.includes(square.id)) {
			square.style.color = previewColor;
			square.appendChild(input);
			setPreviewSquare(square.id);
		}
	};

	const handleMouseLeave = (e) => {
		// removes preview icon after leaving square
		const square = e.target;
		if (previewSquare === square.id && !filledSquares.includes(square.id)) {
			square.style.color = playerColor;
			square.textContent = "";
		}
	};

	return (
		<>
			<div
				className={styles.TTTInfo}
				style={{
					width: size,
					height: size,
					opacity: infoOpacity,
					zIndex: infoZIndex,
				}}
			>
				<p className={styles.TTTInfo_Title}>Tic-Tac-Toe</p>
				<p className={styles.TTTInfo_Content}>{infoText}</p>
				<button
					className={styles.TTTInfo_Button}
					onClick={() => resetGame()}
				>
					Play
				</button>
			</div>
			<div
				className={styles.TTTBoard}
				style={{ width: size, height: size }}
			>
				<div
					id="0"
					className={`${styles.TTTBoard_Square__Top} ${styles.TTTBoard_Square__Left}`}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				></div>
				<div
					id="1"
					className={styles.TTTBoard_Square__Top}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				></div>
				<div
					id="2"
					className={`${styles.TTTBoard_Square__Top} ${styles.TTTBoard_Square__Right}`}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				></div>
				<div
					id="3"
					className={styles.TTTBoard_Square__Left}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				></div>
				<div
					id="4"
					className={styles.TTTBoard_Square__Center}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				></div>
				<div
					id="5"
					className={styles.TTTBoard_Square__Right}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				></div>
				<div
					id="6"
					className={`${styles.TTTBoard_Square__Bottom} ${styles.TTTBoard_Square__Left}`}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				></div>
				<div
					id="7"
					className={styles.TTTBoard_Square__Bottom}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				></div>
				<div
					id="8"
					className={`${styles.TTTBoard_Square__Bottom} ${styles.TTTBoard_Square__Right}`}
					onClick={handleClick}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				></div>
			</div>
		</>
	);
};

export default TicTacToe;
