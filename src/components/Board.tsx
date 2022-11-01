import { useState, useRef } from "react";
import { useCtx } from "../context/context";
import { motion } from "framer-motion";
import {
  bets,
  initialBoard,
  cols,
  spin,
  winsPattern,
  multipleWin,
} from "../utils/initialBoard";

import Panel from "./Panel";
import { formatCur } from "../utils/formatCurr";

const Board = () => {
  const { board, setBoard } = useCtx();
  const [newBoard, setNewBoard] = useState<string[]>([] as string[]);
  const [animateBoard, setAnimateBoard] = useState<boolean>(false);
  const [disableSpinButton, setDisableSpinButton] = useState<boolean>(false);
  const [disableAutoSpinButton, setDisableAutoSpinButton] = useState<boolean>(false);
  const [bet, setBet] = useState<number>(3);
  const [balance, setBalance] = useState<number>(5000);
  const [isWin, setIsWin] = useState<number[]>([0, 7, 14, 16, 23] as number[]);
  const [totalWin, setTotalWin] = useState<number>(99999);

  // refs for current states in setTimeout...
  const autoSpinRef = useRef<boolean>(disableAutoSpinButton);
  const balanceRef = useRef<number>(balance);
  const betRef = useRef<number>(bet);
  const isWinRef = useRef<number[]>(isWin);
  const totalWinRef = useRef<number>(totalWin);

  autoSpinRef.current = disableAutoSpinButton;
  balanceRef.current = balance;
  betRef.current = bet;
  isWinRef.current = isWin;
  totalWinRef.current = totalWin;

  const setDelayHandler = (index: number) => {
    let delay = 0;
    for (let i = 0; i < cols.length; i++) {
      if (cols[i].includes(index)) break;
      delay += 0.3;
    }
    return delay;
  };

  const spinHandler = () => {
    setIsWin([]);
    if (disableSpinButton || bets[betRef.current] > balanceRef.current) return;
    setBalance(balanceRef.current - bets[betRef.current]);
    setDisableSpinButton(true);
    const newSpin = spin();
    // const newSpin = initialBoard;
    setNewBoard(newSpin);
    setAnimateBoard(true);

    setTimeout(() => {
      setBoard(newSpin);
      setAnimateBoard(false);
    }, 1700);

    // I know...
    setTimeout(() => {
      let wonMoney = 0;
      const wins: number[] = [];

      for (let i = 0; i < winsPattern.length; i++) {
        let possibleWin: number[] = [];
        let values: string[] = [];

        winsPattern[i].forEach((val, index) => {
          if (index === 0) {
            possibleWin.push(val);
            values.push(newSpin[val]);
          } else if (
            values.find(value => value.includes(newSpin[val])) ||
            newSpin[val].includes("wild") ||
            values.find(val => val.includes("wild"))
          ) {
            if (
              values.length === 2 &&
              values[0].includes("wild") &&
              !values[1].includes("wild") &&
              !newSpin[val].includes("wild")
            ) {
              if (values[1] !== newSpin[val]) {
                possibleWin = [val];
                values = [newSpin[val]];
              } else {
                possibleWin.push(val);
                values.push(newSpin[val]);
              }
            } else if (
              values.length === 2 &&
              values[1].includes("wild") &&
              !values[0].includes("wild") &&
              !newSpin[val].includes("wild")
            ) {
              if (values[0] === newSpin[val]) {
                possibleWin.push(val);
                values.push(newSpin[val]);
              } else {
                possibleWin.shift();
                values.shift();
                possibleWin.push(val);
                values.push(newSpin[val]);
              }
            } else {
              if (possibleWin[possibleWin.length - 1] === winsPattern[i][index - 1]) {
                if (newSpin[val].includes("wild")) {
                  possibleWin.push(val);
                  values.push(newSpin[val]);
                } else {
                  let wilds = 0;
                  values.forEach(value => {
                    if (value === "/static/media/wild.10a3f2a1bc8605262bb7.png") {
                      wilds += 1;
                    }
                  });

                  if (wilds === values.length) {
                    possibleWin.push(val);
                    values.push(newSpin[val]);
                  } else {
                    if (values.includes(newSpin[val])) {
                      possibleWin.push(val);
                      values.push(newSpin[val]);
                    }
                  }
                }
              }
            }
          } else {
            if (possibleWin.length < 3) {
              possibleWin = [val];
              values = [newSpin[val]];
            }
          }

          // if (i === 0) {
          //   console.log(values);
          // }

          if (index === 4) {
            if (possibleWin.length > 2) {
              wins.push(...possibleWin);

              const differentCartThanWild = values.find(card => !card.includes("wild"));
              if (differentCartThanWild === undefined) {
                wonMoney += values.length * bets[betRef.current] * multipleWin.wild[5];
                return;
              }

              const card = differentCartThanWild.split("media/")[1].split(".")[0];
              if (values.length === 3) {
                wonMoney +=
                  values.length *
                  bets[betRef.current] *
                  multipleWin[card as keyof typeof multipleWin][3];
              } else if (values.length === 4) {
                wonMoney +=
                  values.length *
                  bets[betRef.current] *
                  multipleWin[card as keyof typeof multipleWin][4];
              } else {
                wonMoney +=
                  values.length *
                  bets[betRef.current] *
                  multipleWin[card as keyof typeof multipleWin][5];
              }
            }
          }
        });
      }

      setBalance(balanceRef.current + wonMoney);
      setTotalWin(wonMoney);
      setIsWin(wins);
      if (autoSpinRef.current) {
        if (wonMoney === 0) {
          return spinHandler();
        } else {
          setTimeout(() => {
            return spinHandler();
          }, 1500);
        }
      } else {
        setDisableSpinButton(false);
      }
    }, 1750);
  };

  return (
    <section className="flex flex-col gap-3 justify-center items-center">
      <h1 className="text-6xl font-semibold text-yellow-600 text-center mt-5">Wanted</h1>
      <h3 className="text-3xl font-semibold text-green-600 text-center">
        Dead Or A Wild
      </h3>
      <div className="relative grid grid-cols-5 grid-rows-5 aspect-square gap-2 max-w-[600px] text-center m-auto px-2 overflow-hidden">
        {board.map((symbol, index) => {
          return (
            <motion.div
              animate={{
                background: isWin.includes(index) ? "#187b3c" : "#361b14",
              }}
              transition={{
                background: {
                  type: "spring",
                  duration: isWin.includes(index) ? 0.4 : 0.2,
                },
              }}
              key={index}
              className="relative bg-[#361b14] rounded-md flex aspect-square justify-center items-center"
            >
              <motion.img
                animate={{
                  y: animateBoard ? `605px` : "0px",
                  scale: isWin.length > 0 && isWin.includes(index) ? 1.1 : 1,
                }}
                transition={{
                  delay: animateBoard ? setDelayHandler(index) : 0,
                  type: animateBoard ? "spring" : "none",
                  duration: animateBoard ? 0.6 : 0,
                  scale: {
                    type: "spring",
                    duration: isWin.length > 0 ? 0.4 : 0.2,
                  },
                }}
                src={newBoard[index]}
                className={`max-h-[90%] absolute top-[-600px] z-10`}
              />
              <motion.img
                animate={{
                  y: animateBoard ? `605px` : "0px",
                  scale: isWin.length > 0 && isWin.includes(index) ? 1.1 : 1,
                }}
                transition={{
                  y: {
                    delay: animateBoard ? setDelayHandler(index) : 0,
                    type: animateBoard ? "spring" : "none",
                    duration: animateBoard ? 0.6 : 0,
                  },
                  scale: {
                    type: "spring",
                    duration: isWin.length > 0 ? 0.4 : 0.2,
                  },
                }}
                src={symbol}
                className="max-h-[90%] z-10"
              />
            </motion.div>
          );
        })}

        <motion.div
          animate={{
            scale: isWin.length > 0 ? 1 : 0,
            translateX: "-50%",
            translateY: "-50%",
          }}
          transition={{
            duration: 0,
            scale: {
              bounce: 0.5,
              type: "spring",
              duration: isWin.length > 0 ? 0.4 : 0.2,
            },
          }}
          className="absolute p-4 rounded-xl bg-green-600 text-yellow-500 w-max top-[50%] left-[50%] z-20"
        >
          <h1 className="text-4xl font-medium">
            {totalWin === 99999 ? "Up to 5000x" : formatCur(totalWin, "en-US", "EUR")}
          </h1>
        </motion.div>
      </div>
      <Panel
        spinHandler={spinHandler}
        disableSpinButton={disableSpinButton}
        disableAutoSpinButton={disableAutoSpinButton}
        setDisableAutoSpinButton={setDisableAutoSpinButton}
        bet={bet}
        setBet={setBet}
        balance={balance}
      />
    </section>
  );
};

export default Board;
