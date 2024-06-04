"use client";
import React, { ReactNode, createContext, useState } from "react";
import { Sonner } from "@/components/store/Sonner";

interface ContextProps {
  handleSonner: (value: string) => void;
}

export const SonnerContext = createContext<ContextProps>({
  handleSonner: (value: string) => {},
});

export const SonnerProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const handleSonner = (value: string) => {
    setMounted(true);
    setText(value);
    setTimeout(() => {
      setMounted(false);
    }, 3000);
  };
  return (
    <SonnerContext.Provider value={{ handleSonner }}>
      {mounted && <Sonner text={text} />}
      {children}
    </SonnerContext.Provider>
  );
};
