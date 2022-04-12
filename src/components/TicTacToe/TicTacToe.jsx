import React from "react";
import styles from "./TicTacToe.module.scss";

const TicTacToe = ({ size }) => {
	return (
		<div className={styles.Board} style={{ width: size, height: size }}>
			<div id="1" className={`${styles.Top} ${styles.Left}`}></div>
			<div id="2" className={styles.Top}></div>
			<div id="3" className={`${styles.Top} ${styles.Right}`}></div>
			<div id="4" className={styles.Left}></div>
			<div id="5" className={styles.Center}></div>
			<div id="6" className={styles.Right}></div>
			<div id="7" className={`${styles.Bottom} ${styles.Left}`}></div>
			<div id="8" className={styles.Bottom}></div>
			<div id="9" className={`${styles.Bottom} ${styles.Right}`}></div>
		</div>
	);
};

export default TicTacToe;
