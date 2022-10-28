import { useCtx } from "../context/context";
import { spin } from "../utils/initialBoard";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Panel from "./Panel";

const Board = () => {
  const { board, setBoard } = useCtx();
  const [newBoard, setNewBoard] = useState<string[]>([] as string[]);
  const [animateBoard, setAnimateBoard] = useState<boolean>(false);
  const [disableSpinButton, setDisableSpinButton] = useState<boolean>(false);
  const [disableAutoSpinButton, setDisableAutoSpinButton] = useState<boolean>(false);

  const cols = [
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
  ];

  const setDelayHandler = (index: number) => {
    if (cols[0].includes(index)) return 0;
    if (cols[1].includes(index)) return 0.3;
    if (cols[2].includes(index)) return 0.6;
    if (cols[3].includes(index)) return 0.9;
    if (cols[4].includes(index)) return 1.2;
  };

  const spinHandler = () => {
    if (disableSpinButton) return;
    setDisableSpinButton(true);
    const newSpin = spin();
    setNewBoard(newSpin);
    setAnimateBoard(true);

    setTimeout(() => {
      setBoard(newSpin);
      setAnimateBoard(false);
    }, 1700);

    setTimeout(() => {
      if (disableAutoSpinButton) return spinHandler();
      setDisableSpinButton(false);
    }, 1750);
  };

  return (
    <section className="flex flex-col gap-3 justify-center items-center">
      <h1 className="text-6xl font-semibold text-yellow-600 text-center mt-5">Wanted</h1>
      <h3 className="text-3xl font-semibold text-green-600 text-center">
        Dead Or A Wild
      </h3>
      <div className="grid grid-cols-5 grid-rows-5 aspect-square gap-2 max-w-[600px] text-center m-auto px-2 overflow-hidden">
        {board.map((symbol, index) => {
          return (
            <div
              key={index}
              className="relative bg-[#361b14] rounded-md flex aspect-square justify-center items-center"
            >
              <motion.img
                animate={{
                  y: animateBoard ? `605px` : "0px",
                }}
                transition={{
                  delay: animateBoard ? setDelayHandler(index) : 0,
                  type: animateBoard ? "spring" : "none",
                  duration: animateBoard ? 0.4 : 0,
                }}
                src={newBoard[index]}
                className={`max-h-[90%] absolute top-[-600px] z-10`}
              />
              <motion.img
                animate={{
                  y: animateBoard ? `605px` : "0px",
                }}
                transition={{
                  delay: animateBoard ? setDelayHandler(index) : 0,
                  type: animateBoard ? "spring" : "none",
                  duration: animateBoard ? 0.4 : 0,
                }}
                src={symbol}
                className="max-h-[90%] z-10"
              />
            </div>
          );
        })}
      </div>
      <Panel
        spinHandler={spinHandler}
        disableSpinButton={disableSpinButton}
        disableAutoSpinButton={disableAutoSpinButton}
        setDisableAutoSpinButton={setDisableAutoSpinButton}
      />
    </section>
  );
};

export default Board;
