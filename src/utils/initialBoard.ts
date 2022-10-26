import a from "../assets/a.png";
import clubs from "../assets/clubs.png";
import diamond from "../assets/diamond.png";
import heart from "../assets/heart.png";
import j from "../assets/j.png";
import k from "../assets/k.png";
import q from "../assets/q.png";
import spades from "../assets/spades.png";
import wild from "../assets/wild.png";

// prettier-ignore
export const initialBoard: string[] = [spades,a,diamond,clubs,j,a,heart,clubs,q,q,wild,k,j,heart,heart,a,k,diamond,wild,wild,clubs,clubs,clubs,diamond,spades,];

// prettier-ignore
const symbols = {0:"a",1:"clubs",2:"diamond",3:"heart",4:"j",5:"k",6:"q",7:"spades",8:"wild"
};

export const spin = () => {
  const newSpin = [];
  for (let i = 0; i < initialBoard.length; i++) {
    const randomNumber = Math.floor(Math.random() * 9);
    newSpin.push(symbols[randomNumber as keyof typeof symbols]);
  }
  return newSpin;
};
