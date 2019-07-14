import React, { Component } from 'react';
import './App.css';
import Row from './components/Row/Row';
import mp3_file from '../src/audio/connect-4-insert.mp3';

const MAXROWVERTICAL = 3;
const MAXCOLHORIZONATAL = 4;
const MINROWDIAGONAL = 3;
const MAXROWDIAGONAL = 6;
const MINCOLDIAGONALRIGHT = 0;
const MAXCOLDIAGONALRIGHT = 4;
const MINCOLDIAGONALLEFT = 3;
const MAXCOLDIAGONALLEFT = 7;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1, 
      player2: 2,
      currentPlayer: null,
      board: [],
      dimentions: {
        width: 7,
        height: 6,
      },
      gameEnded: false,
      status: ''
    };
  
    // Bind play function to App component
    this.play = this.play.bind(this);
  }

  // Init new board (6X7) or reset game.
  initBoard() {
    let { height, width } = this.state.dimentions;
    let board = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push(null);
      }
      board.push(row);
    }

    this.setState({
      board,
      currentPlayer: this.state.player1,
      gameEnded: false,
      status: 'New Game Started'
    });
  }

  play(column) {
    if (!this.state.gameEnded) {
      // find most bottom row to place piece
      let board = this.state.board;
      let row;
      let isSet = false;
      for (row = 5; row >= 0; row--) {
        if (!board[row][column]) {  // if not null
          board[row][column] = this.state.currentPlayer;
          var sound1 = document.getElementById("myAudio"); 
          sound1.play();
          isSet = true;
          break;
        }
      }
      
      if (isSet) { // check if play was set
        // Check status of board
      let result = this.checkAll(board,row,column);
      switch (result){
        case this.state.player1:
            this.setState({ board, gameEnded: true, status: 'Player 1, red wins!' });
            break;
        case this.state.player2:
            this.setState({ board, gameEnded: true, status: 'Player 2, yellow wins!' });
            break;
        case 'draw':
            this.setState({ board, gameEnded: true, status: 'Draw.' });
            break;
        default:
            this.setState({ board, currentPlayer: this.togglePlayer() });
            break;
      }
    }
      

  } else {
    this.setState({ status: 'Game over. Please start a new game.' });
  }
  }
  
  togglePlayer() {
    return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1;
  }

  checkVertical(board,r,c) {
    // Check only for 4 in columb below new point
    if (r < MAXROWVERTICAL){
      if (board[r][c] === board[r + 1][c] &&
          board[r][c] === board[r + 2][c] &&
          board[r][c] === board[r + 3][c]) {           
            return board[r][c];
          }
    }
  }

  checkHorizontal(board,r) {
    // check only for 4-in-a-row at the row of new point
    for (let c = 0; c < MAXCOLHORIZONATAL; c++) {
      if (board[r][c] === board[r][c + 1] && 
          board[r][c] === board[r][c + 2] &&
          board[r][c] === board[r][c + 3]) {
            return board[r][c];
        }
    }
  }

  checkDiagonalRight(board) {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = MINROWDIAGONAL; r < MAXROWDIAGONAL; r++) {
      for (let c = MINCOLDIAGONALRIGHT; c < MAXCOLDIAGONALRIGHT; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c + 1] &&
              board[r][c] === board[r - 2][c + 2] &&
              board[r][c] === board[r - 3][c + 3]) {
                return board[r][c];
          }
        }
      }
    }
  }
  
  checkDiagonalLeft(board) {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = MINROWDIAGONAL; r < MAXROWDIAGONAL; r++) {
      for (let c = MINCOLDIAGONALLEFT; c < MAXCOLDIAGONALLEFT; c++) {
        if (board[r][c]) {
          if (board[r][c] === board[r - 1][c - 1] &&
              board[r][c] === board[r - 2][c - 2] &&
              board[r][c] === board[r - 3][c - 3]) {
                return board[r][c];
          }
        }
      }
    }
  }

  checkDraw(board) {
    let { height, width } = this.state.dimentions;
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return 'draw';    
  }
  
  checkAll(board,r,c) {
    return this.checkVertical(board,r,c) || this.checkDiagonalRight(board) || this.checkDiagonalLeft(board) || this.checkHorizontal(board,r) || this.checkDraw(board);
  }

  componentDidMount() {

  }
  // make sure component mount on first load
  componentWillMount() {
    this.initBoard();
  }
  
  render() {
    return (
      
      <div>
        <table>
          <thead>
          </thead>
          <tbody>
            {this.state.board.map((row, i) => (<Row key={i} row={row} play={this.play} />))}
          </tbody>
        </table>
        <br></br>
        <div className="button" onClick={() => {this.initBoard()}}>New Game</div>
        <div className="notice info"> <p className="message">{this.state.status}</p> </div> 
        <audio id="myAudio" >
        <source id="src_mp3" type="audio/mp3" src={mp3_file}/>
        </audio>
      </div>
    );
  }
}

export default App;
