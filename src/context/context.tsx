import React, { useContext, useState, createContext } from "react";
import { initialBoard } from "../utils/initialBoard";

type ContextType = {
  board: string[];
  setBoard: React.Dispatch<React.SetStateAction<string[]>>;
};

const Context = createContext<ContextType>({} as ContextType);

export const useCtx = () => useContext(Context);

type Props = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: Props) => {
  const [board, setBoard] = useState(initialBoard);

  return <Context.Provider value={{ board, setBoard }}>{children}</Context.Provider>;
};
