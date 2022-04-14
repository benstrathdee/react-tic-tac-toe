# Tic Tac Toe Component

A simple game of Tic Tac Toe that can be loaded into any react app made with CRA
without any other dependencies (Alternatively, if the app is made without CRA I
believe the only dependency required is `react-scripts` to allow for CSS Module
files, which you can get around by just renaming the classes)

## How To Use

Download the project files and either add the component to your own project
files, or run the whole project to test using:

### `npm start`

Runs the app in the development mode. Open
[http://localhost:3000](http://localhost:3000) to view it in your browser. The
page will reload when you make changes. You may also see any lint errors in the
console.

## Properties

### `size (default 300)`

Sets the dimensions of the game board. Can go as low as 200 before it starts
getting cramped, high as 800 before things look silly.

### `playerOne (default ○)`

The first player token. Can be any string value, although the shorter the better
to fit in the game squares.

### `playerTwo (default ✖)`

The second player token. Same idea as `playerOne`
