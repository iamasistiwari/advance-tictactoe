"use client";
import Block from "@/components/Block";
import { CircularQueue } from "@/components/Queue";
import React, { useState, useEffect, useRef } from "react";

type CellValue = "O" | "X" | null;

export default function Page() {
  const [state, setState] = useState<CellValue[]>(Array(9).fill(null));
  const [currentMove, setcurrentMove] = useState<"X" | "O">("O");
  const [totalMoves, settotalMoves] = useState<number>(0);

  const xCircularQueue = useRef(new CircularQueue<number>());
  const oCircularQueue = useRef(new CircularQueue<number>());

  const xlastDim = useRef<number | null>(null);
  const olastDim = useRef<number | null>(null);


  const xisFull = xCircularQueue.current.isFull();
  if (xisFull) {
    xlastDim.current = xCircularQueue.current.getFirstElement();
  }

  const oisFull = oCircularQueue.current.isFull();
  if (oisFull) {
    olastDim.current = oCircularQueue.current.getFirstElement();
  }

  const resetGame = () => {
    setState(Array(9).fill(null));
    setcurrentMove("X");
    settotalMoves(0);
    xCircularQueue.current = new CircularQueue<number>();
    oCircularQueue.current = new CircularQueue<number>();
    xlastDim.current = null
    olastDim.current = null
  };

  const winnerCheck = (): boolean => {
    const winingCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const xtarget = xCircularQueue.current.getQueue().sort();
    const otarget = oCircularQueue.current.getQueue().sort();

    const xIsWinner = winingCombinations.some(
      (combination) =>
        combination.length === xtarget.length &&
        combination.every((value, index) => value === xtarget[index])
    );
    const oIsWinner = winingCombinations.some(
      (combination) =>
        combination.length === otarget.length &&
        combination.every((value, index) => value === otarget[index])
    );
    if (xIsWinner) {
      return true;
    }
    if (oIsWinner) {
      return true;
    }
    return false;
  };

  

  useEffect(() => {
    if (totalMoves > 4 && winnerCheck()) {
      setTimeout(() => {
        alert(`${currentMove} wins`);
        resetGame();
      }, 200);
    } else {
      setcurrentMove((move) => (move === "X" ? "O" : "X"));
    }
  }, [state]);

  const onClickAction = (index: number) => {
    if (state[index] !== null) {
      window.alert("CANNOT DO THIS");
      return;
    }
    if (currentMove === "X") {
      xCircularQueue.current.add(index);
    } else {
      oCircularQueue.current.add(index);
    }
    setState((prevState) => {
      const newState = [...prevState];
      // Get the elements from both circular queues
      const xarr = xCircularQueue.current.getQueue();
      const oarr = oCircularQueue.current.getQueue();

      // Clear the state array and add the X and O moves from their queues
      newState.fill(null); // Reset the state to all nulls

      // Fill the state array with X and O moves from the respective queues
      xarr.forEach((move) => {
        if (move !== null) newState[move] = "X"; // Ensure move is not null
      });
      oarr.forEach((move) => {
        if (move !== null) newState[move] = "O"; // Ensure move is not null
      });
      return newState
    });
    
    settotalMoves((moves) => moves + 1);
  };

  return (
    <div className="h-screen justify-center items-center flex flex-col">
      <div className="absolute top-10 flex gap-x-10 border py-2 px-8 rounded-xl">
        <div>Total Played Moves - {totalMoves}</div>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row space-x-8">
          {[0, 1, 2].map((index) => (
            <Block
              key={index}
              value={state[index]}
              onClick={() => onClickAction(index)}
              className={`border border-gray-200 h-28 w-28 rounded-xl hover:cursor-pointer active:scale-75 transition-transform duration-300 ease-in-out 
                ${olastDim.current === index ? "opacity-20" : ""}
                ${xlastDim.current === index ? "opacity-20" : ""}
              `}
            />
          ))}
        </div>
        <div className="flex flex-row space-x-8">
          {[3, 4, 5].map((index) => (
            <Block
              key={index}
              value={state[index]}
              onClick={() => onClickAction(index)}
              className={`border border-gray-200 h-28 w-28 rounded-xl hover:cursor-pointer active:scale-75 transition-transform duration-300 ease-in-out 
                ${olastDim.current === index ? "opacity-20" : ""}
                ${xlastDim.current === index ? "opacity-20" : ""}
              `}
            />
          ))}
        </div>
        <div className="flex flex-row space-x-8">
          {[6, 7, 8].map((index) => (
            <Block
              key={index}
              value={state[index]}
              onClick={() => onClickAction(index)}
              className={`border border-gray-200 h-28 w-28 rounded-xl hover:cursor-pointer active:scale-75 transition-transform duration-300 ease-in-out 
                ${olastDim.current === index ? "opacity-20" : ""}
                ${xlastDim.current === index ? "opacity-20" : ""}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
