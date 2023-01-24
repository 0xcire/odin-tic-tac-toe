// const Player = (mark) => {
//   let _mark = mark;

//   const setMark = (mark) => {
//     _mark = mark;
//   };

//   const getMark = () => _mark;

//   return {
//     setMark,
//     getMark,
//   };
// };

const DOM = (() => {
  //'','','' 0 1 2
  //'','','' 3 4 5
  //'','','' 6 7 8
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;

  const placeMark = (button, mark) => {
    button.textContent = mark;
  };

  const showWinMessage = (el, msg) => {
    el.textContent = msg;
  };

  return {
    getBoard,
    placeMark,
    showWinMessage,
  };
})();

// const Gameboard = (() => {
//   const winConditions = [
//     [0, 1, 2], //horizontal
//     [3, 4, 5], //horizontal
//     [6, 7, 8], //horizontal
//     [0, 3, 6], //vert
//     [1, 4, 7], //vert
//     [2, 5, 8], //vert
//     [0, 4, 8], //diag
//     [2, 4, 6], //diag
//   ];
// })();

const Controller = (() => {
  const buttons = document.querySelectorAll(".square");
  const winDisplay = document.querySelector(".winning-message");
  const restart = document.querySelector(".restart button");

  //determine marks
  //x goes first, o second
  // const firstPlayer = Player("X");
  // const secondPlayer = Player("O");
  const firstPlayer = "X";
  const secondPlayer = "O";

  let currentPlayer = firstPlayer;
  let board = DOM.getBoard();

  const handleSelection = (currentPlayer, button, index) => {
    console.log("clickity click");
    DOM.placeMark(button, currentPlayer);
    board[index] = currentPlayer;
    checkWin(currentPlayer);
    checkDraw(currentPlayer);
  };

  buttons.forEach((button, index) => {
    button.addEventListener(
      "click",
      () => {
        // checkWin(currentPlayer);
        //refactor this
        if (currentPlayer === firstPlayer) {
          handleSelection(currentPlayer, button, index);
          currentPlayer = secondPlayer;
        } else {
          handleSelection(currentPlayer, button, index);
          currentPlayer = firstPlayer;
        }
        console.log(board);
      },
      { once: true }
    );
  });

  //check win
  //obviously a cleaner solution here using the winCondition array i have above?
  const checkWin = (currentPlayer) => {
    console.log("checking");
    if (
      checkDiag(currentPlayer) ||
      checkHorizontal(currentPlayer) ||
      checkVert(currentPlayer)
    ) {
      const msg = `${currentPlayer} wins`;
      DOM.showWinMessage(winDisplay, msg);
      return true;
    } else {
      return false;
    }
  };

  const checkVert = (currentPlayer) => {
    //check first col 0, 3, 6
    if (
      board[0] === currentPlayer &&
      board[3] === currentPlayer &&
      board[6] === currentPlayer
    ) {
      return true;
      //check second col 1, 4, 7
    } else if (
      board[1] === currentPlayer &&
      board[4] === currentPlayer &&
      board[7] === currentPlayer
    ) {
      return true;
      //check third col 2, 5, 8
    } else if (
      board[2] === currentPlayer &&
      board[5] === currentPlayer &&
      board[8] === currentPlayer
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkHorizontal = (currentPlayer) => {
    //check first row 0, 1, 2
    if (
      board[0] === currentPlayer &&
      board[1] === currentPlayer &&
      board[2] === currentPlayer
    ) {
      return true;
      //check second row 3, 4 ,5
    } else if (
      board[3] === currentPlayer &&
      board[4] === currentPlayer &&
      board[5] === currentPlayer
    ) {
      return true;
      //check third row 6, 7, 8
    } else if (
      board[6] === currentPlayer &&
      board[7] === currentPlayer &&
      board[8] === currentPlayer
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkDiag = (currentPlayer) => {
    //check one diag 0, 4, 8
    if (
      board[0] === currentPlayer &&
      board[4] === currentPlayer &&
      board[8] === currentPlayer
    ) {
      return true;
      //check other diag 2, 4, 6
    } else if (
      board[2] === currentPlayer &&
      board[4] === currentPlayer &&
      board[6] === currentPlayer
    ) {
      return true;
    } else {
      return false;
    }
  };
  //dheck draw
  const checkDraw = () => {
    //if !board.includes('')
    //!checkWin
    //draw
    if (!board.includes("") && !checkWin(currentPlayer)) {
      console.log("draw");
      const msg = "draw";
      DOM.showWinMessage(winDisplay, msg);
    }
  };

  // const endGame = () => {
  //   if (checkWin) {
  //     console.log("win");
  //   }
  // };

  restart.addEventListener("click", () => {
    location.reload();
    //what is a work around to once: true event listener option
  });
})();
