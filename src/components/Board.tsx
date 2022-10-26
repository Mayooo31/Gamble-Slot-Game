import { useCtx } from "../context/context";

const Board = () => {
  const { board } = useCtx();

  return (
    <div className="">
      <h1 className="text-6xl font-semibold text-yellow-600 text-center">Wanted</h1>
      <h3 className="text-3xl font-semibold text-green-600 text-center">
        Dead Or A Wild
      </h3>
      <div className="grid grid-cols-5 grid-rows-5 aspect-square gap-2 max-w-[600px] text-center m-auto px-2">
        {board.map((symbol, index) => {
          return (
            <div
              key={index}
              className="bg-[#361b14] rounded-md flex justify-center items-center"
            >
              <img src={symbol} className="max-h-[90%]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
