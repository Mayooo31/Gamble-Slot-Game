import { motion } from "framer-motion";

// prettier-ignore
import {ArrowPathIcon,BookOpenIcon,PlayCircleIcon,ChevronUpIcon,ChevronDownIcon,PauseCircleIcon} from "@heroicons/react/24/solid";
import { bets } from "../utils/initialBoard";
import { formatCur } from "../utils/formatCurr";

type Props = {
  spinHandler: () => void;
  disableSpinButton: boolean;
  disableAutoSpinButton: boolean;
  setDisableAutoSpinButton: React.Dispatch<React.SetStateAction<boolean>>;
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  balance: number;
  totalWin: number | string;
  freeSpinsLeftRef: any;
};

const Panel = ({
  totalWin,
  spinHandler,
  disableSpinButton,
  setDisableAutoSpinButton,
  disableAutoSpinButton,
  bet,
  setBet,
  balance,
  freeSpinsLeftRef,
}: Props) => {
  const changeBet = (change: string) => {
    if (change === "increase") {
      if (bet === bets.length - 1) return;
      setBet(bet + 1);
    }
    if (change === "decrease") {
      if (bet === 0) return;
      setBet(bet - 1);
    }
  };

  return (
    <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 items-start ss:w-[580px] ss:justify-between z-10">
      <div className="flex gap-2 items-center">
        <button>
          <BookOpenIcon
            className={`h-10 w-10 text-yellow-500 hover:text-green-600 ease-linear duration-100`}
          />
        </button>
        <div className="flex flex-col">
          <p className="text-yellow-500">Balance:</p>
          <motion.p
            animate={{
              scale: typeof totalWin === "number" && totalWin !== 0 ? [1.3, 1] : 1,
              color:
                typeof totalWin === "number" && totalWin !== 0
                  ? ["rgb(34 197 94)", "rgb(234 179 8)"]
                  : "rgb(234 179 8)",
            }}
            transition={{
              duration: 0.4,
            }}
            className="text-2xl"
          >
            {formatCur(balance, "en-US", "EUR")}
          </motion.p>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <p className="text-yellow-500">Bet:</p>
            <p className="text-2xl text-yellow-500">
              {formatCur(bets[bet], "en-US", "EUR")}
            </p>
          </div>
          <div className="flex flex-col">
            <button onClick={() => changeBet("increase")}>
              <ChevronUpIcon
                className={`h-8 w-8 text-yellow-500 hover:text-green-600 ease-linear duration-100`}
              />
            </button>
            <button onClick={() => changeBet("decrease")}>
              <ChevronDownIcon
                className={`h-8 w-8 text-yellow-500 hover:text-green-600 ease-linear duration-100`}
              />
            </button>
          </div>
        </div>
        <div className="relative cursor-pointer" onClick={spinHandler}>
          <motion.button
            animate={{
              rotate: disableSpinButton ? 90 : 0,
              scale: !disableSpinButton ? 1 : 0.9,
            }}
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.5,
            }}
            className={`bg-green-600 ${
              !disableSpinButton &&
              "hover:bg-green-700 hover:ease-in-out hover:duration-100"
            } rounded-full p-2 ${disableSpinButton && "bg-red-500"}`}
          >
            {
              <ArrowPathIcon
                className={`h-12 w-12 text-yellow-500 ${
                  freeSpinsLeftRef.current.spins !== 0 &&
                  freeSpinsLeftRef.current.spins !== 10 &&
                  "opacity-0"
                }`}
              />
            }
          </motion.button>
          {freeSpinsLeftRef.current.spins !== 0 &&
            freeSpinsLeftRef.current.spins !== 10 && (
              <p className="absolute top-[50%] left-[50%] text-yellow-500 font-medium translate-x-[-50%] translate-y-[-50%] text-5xl">
                {freeSpinsLeftRef.current.spins}
              </p>
            )}
        </div>
        <button
          onClick={() => {
            setDisableAutoSpinButton(!disableAutoSpinButton);
          }}
        >
          {!disableAutoSpinButton && (
            <PlayCircleIcon
              className={`h-10 w-10 text-green-600 hover:text-green-700 ease-linear duration-100 bg-yellow-500 rounded-full`}
            />
          )}
          {disableAutoSpinButton && (
            <PauseCircleIcon
              className={`h-10 w-10 text-green-600 hover:text-green-700 ease-linear duration-100 bg-yellow-500 rounded-full`}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Panel;
