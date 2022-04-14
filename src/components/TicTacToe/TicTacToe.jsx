import React from "react";
import { useState, useRef } from "react";
import s from "./TicTacToe.module.css";

const TicTacToe = ({ size = 300, playerOne = "○", playerTwo = "✖" }) => {
	const [infoState, setInfoState] = useState(1); // controls info visibility
	const [infoText, setInfoText] = useState("New Game?"); // info content
	const [filledSquares, setFilledSquares] = useState([]); // board status
	const board = useRef(); // board reference

	// These values can be any valid CSS color
	const winnerColor = "lightgreen"; // square colour of winner
	const loserColor = "pink"; // square colour of loser
	const playerColor = "black"; // colour of player tokens
	const previewColor = "lightgray"; // colour of preview tokens

	const getClassName = (i) => {
		// used when generating grid to determine lines
		const list = [];
		if (i < 3) list.push(s.Board_Square__Top);
		if (i === 4) list.push(s.Board_Square__Center);
		if (i > 5) list.push(s.Board_Square__Bottom);
		if (i % 3 === 0) list.push(s.Board_Square__Left);
		if ((i + 1) % 3 === 0) list.push(s.Board_Square__Right);
		return list.join(" ");
	};

	const checkForWin = () => {
		const checkPattern = (threeSquares) => {
			// takes in the value of three squares and checks if they're a match
			const joined = threeSquares.join("");
			if (
				joined === `${playerOne}${playerOne}${playerOne}` ||
				joined === `${playerTwo}${playerTwo}${playerTwo}`
			) {
				endGame(threeSquares[0]);
				return true;
			}
		};
		// grab the contents of the board
		const pattern = [];
		for (let i = 0; i < 9; i++) {
			const square = board.current.children[i];
			pattern.push(square.textContent);
		}
		console.log(pattern);
		// check for winning game patterns
		// horizontal patterns
		if (checkPattern([pattern[0], pattern[1], pattern[2]])) return;
		if (checkPattern([pattern[3], pattern[4], pattern[5]])) return;
		if (checkPattern([pattern[6], pattern[7], pattern[8]])) return;
		// vertical patterns
		if (checkPattern([pattern[0], pattern[3], pattern[6]])) return;
		if (checkPattern([pattern[1], pattern[4], pattern[7]])) return;
		if (checkPattern([pattern[2], pattern[5], pattern[8]])) return;
		// diagonal patterns
		if (checkPattern([pattern[0], pattern[4], pattern[8]])) return;
		if (checkPattern([pattern[2], pattern[4], pattern[6]])) return;
		// if board is full and no winner, game over
		if (filledSquares.length === 8) endGame(false);
	};

	const endGame = (winner) => {
		for (let i = 0; i < 9; i++) {
			const square = board.current.children[i];
			if (!winner) {
				// Draw - all squares lose
				square.style.backgroundColor = loserColor;
			} else {
				console.log(square.textContent);
				// Color winner and loser squares appropriately
				square.style.backgroundColor =
					square.textContent === winner ? winnerColor : loserColor;
			}
		}
		// set info content and pull up info
		setInfoText(winner ? `Victory! ${winner} wins!` : "Game Over! Draw!");
		setInfoState(1);
	};

	const resetSquare = (square) => {
		square.textContent = "";
		square.style.color = playerColor;
		square.style.backgroundColor = "white";
	};

	const resetGame = () => {
		for (let i = 0; i < 9; i++) {
			// reset square colours
			const square = board.current.children[i];
			resetSquare(square);
		}
		// reset board
		setFilledSquares([]);
		// hide info
		setInfoState(-1);
	};

	const handleClick = (e) => {
		const square = e.target;
		const squareVal = square.getAttribute("data-value");
		const input = document.createTextNode(
			// alternate between players
			filledSquares.length % 2 === 0 ? playerOne : playerTwo
		);
		if (!filledSquares.includes(squareVal)) {
			// remove preview
			resetSquare(square);
			// place player
			square.appendChild(input);
			setFilledSquares(filledSquares.concat(squareVal));
		}
		checkForWin();
	};

	const handleMouseEnter = (e) => {
		// places preview icon in square on hover
		const square = e.target;
		const squareVal = square.getAttribute("data-value");
		if (!filledSquares.includes(squareVal)) {
			const input = document.createTextNode(
				filledSquares.length % 2 === 0 ? playerOne : playerTwo
			);
			square.style.color = previewColor;
			square.appendChild(input);
		}
	};

	const handleMouseLeave = (e) => {
		// removes preview icon after leaving square
		const square = e.target;
		const squareVal = square.getAttribute("data-value");
		if (!filledSquares.includes(squareVal)) {
			resetSquare(square);
		}
	};

	return (
		<>
			<div
				className={s.Info}
				style={{
					width: size,
					height: size,
					opacity: infoState,
					zIndex: infoState,
				}}
			>
				<p className={s.Info_Title}>Tic-Tac-Toe</p>
				<p className={s.Info_Content}>{infoText}</p>
				<button className={s.Info_Button} onClick={resetGame}>
					Play
				</button>
			</div>
			<div
				ref={board}
				className={s.Board}
				style={{ width: size, height: size }}
			>
				{Array.from(Array(9)).map((e, i) => {
					return (
						<div
							key={"square" + i}
							data-value={i}
							className={getClassName(i)}
							onClick={handleClick}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						></div>
					);
				})}
			</div>
		</>
	);
};

export default TicTacToe;
