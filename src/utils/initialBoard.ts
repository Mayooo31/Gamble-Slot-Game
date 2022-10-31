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
export const initialBoard: string[] = [wild,q,wild,k,wild,a,q,wild,k,j,heart,vs,vs,vs,heart,a,k,diamond,wild,wild,clubs,clubs,clubs,diamond,spades,];

export const bets = [0.5, 1, 2.5, 5, 10, 20, 30, 50, 75, 100];

export const spin = () => {
  const newSpin: string[] = [];
  for (let i = 0; i < initialBoard.length; i++) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    if (randomNumber <= 1) {
      const randomNumb = Math.floor(Math.random() * 3) + 1;
      if (randomNumb < 3) {
        newSpin.push(vs);
      } else newSpin.push(wild);
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
