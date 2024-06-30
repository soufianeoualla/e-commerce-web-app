"use client";
import { ReactNode, createContext, useState } from "react";

export const dataUpdate = createContext({
  trigger: 0,
  handleUpdate: () => {},
});

export const DataUpdateProvider = ({ children }: { children: ReactNode }) => {
  const [trigger, setTrigger] = useState<number>(0);

  const handleUpdate = () => {
    setTrigger(Math.random() * 100);
  };

  return (
    <dataUpdate.Provider value={{ trigger, handleUpdate }}>
      {children}
    </dataUpdate.Provider>
  );
};
