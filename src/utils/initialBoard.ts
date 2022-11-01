import a from "../assets/a.png";
import clubs from "../assets/clubs.png";
import diamond from "../assets/diamond.png";
import heart from "../assets/heart.png";
import j from "../assets/j.png";
import k from "../assets/k.png";
import q from "../assets/q.png";
import spades from "../assets/spades.png";
import wild from "../assets/wild.png";
import vs from "../assets/vs.png";
import ten from "../assets/ten.png";
import nine from "../assets/nine.png";

// prettier-ignore
export const initialBoard: string[] = [vs,q,wild,k,clubs,a,q,vs,k,j,heart,j,heart,j,vs,a,vs,diamond,wild,wild,clubs,clubs,clubs,vs,spades,];

export const bets = [0.5, 1, 2.5, 5, 10, 20, 30, 50, 75, 100];

export const winsPattern = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

export const cols = [
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
];

export const multipleWin = {
  diamond: {
    3: 0.1,
    4: 0.5,
    5: 1,
  },
  heart: {
    3: 0.1,
    4: 0.5,
    5: 1,
  },
  spades: {
    3: 0.1,
    4: 0.5,
    5: 1,
  },
  clubs: {
    3: 0.1,
    4: 0.5,
    5: 1,
  },
  nine: {
    3: 0.5,
    4: 1,
    5: 2,
  },
  ten: {
    3: 0.75,
    4: 1.75,
    5: 2.5,
  },
  j: {
    3: 1,
    4: 2,
    5: 3,
  },
  q: {
    3: 2,
    4: 3,
    5: 4,
  },
  k: {
    3: 3,
    4: 4,
    5: 5,
  },
  a: {
    3: 4,
    4: 5,
    5: 6,
  },
  wild: {
    3: 0,
    4: 0,
    5: 4,
  },
};

export const spin = () => {
  const newSpin: string[] = [];
  for (let i = 0; i < initialBoard.length; i++) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if (randomNumber <= 1) {
      newSpin.push(vs);
      continue;
    }
    if (randomNumber <= 5) {
      newSpin.push(wild);
      continue;
    }
    if (randomNumber <= 10) {
      newSpin.push(a);
      continue;
    }
    if (randomNumber <= 18) {
      newSpin.push(k);
      continue;
    }
    if (randomNumber <= 28) {
      newSpin.push(q);
      continue;
    }
    if (randomNumber <= 38) {
      newSpin.push(j);
      continue;
    }
    if (randomNumber <= 48) {
      newSpin.push(ten);
      continue;
    }
    if (randomNumber <= 58) {
      newSpin.push(nine);
      continue;
    }
    if (randomNumber <= 68) {
      newSpin.push(clubs);
      continue;
    }
    if (randomNumber <= 78) {
      newSpin.push(spades);
      continue;
    }
    if (randomNumber <= 88) {
      newSpin.push(heart);
      continue;
    }
    if (randomNumber <= 100) {
      newSpin.push(diamond);
      continue;
    }
  }
  return newSpin;
};
