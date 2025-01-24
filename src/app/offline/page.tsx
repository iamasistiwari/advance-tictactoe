'use client';
import Block from '@/components/Block';
import { CircularQueue } from '@/components/Queue';
import { Loader2 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

type CellValue = 'O' | 'X' | null;

export default function Page() {
  const [state, setState] = useState<CellValue[]>(Array(9).fill(null));
  const [currentMove, setcurrentMove] = useState<'X' | 'O'>('X');
  const [totalMoves, settotalMoves] = useState<number>(0);
  const [isYourTurn, setIsYourTurn] = useState<boolean>(false);

  const [, setClickedIndex] = useState<number | null>(null);
  const [scalingIndex, setScalingIndex] = useState<number | null>(null);

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
    setcurrentMove('O');
    settotalMoves(0);
    xCircularQueue.current = new CircularQueue<number>();
    oCircularQueue.current = new CircularQueue<number>();
    xlastDim.current = null;
    olastDim.current = null;
    setClickedIndex(null);
    setScalingIndex(null);
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
        toast.success(`${currentMove.toUpperCase()} WINS`);
        resetGame();
      }, 200);
    } else {
      if (currentMove === 'O') {
        setIsYourTurn(false);
      } else {
        setIsYourTurn(true);
      }
      setcurrentMove((move) => (move === 'X' ? 'O' : 'X'));
    }
  }, [state]);

  const onClickAction = (index: number) => {
    if (state[index] !== null) {
      toast.error('You cannot overwrite the existing move');
      return;
    }
    if (currentMove === 'X') {
      xCircularQueue.current.add(index);
    } else {
      oCircularQueue.current.add(index);
    }
    setState((prevState) => {
      const newState = [...prevState];
      const xarr = xCircularQueue.current.getQueue();
      const oarr = oCircularQueue.current.getQueue();

      newState.fill(null);

      xarr.forEach((move) => {
        if (move !== null) newState[move] = 'X';
      });
      oarr.forEach((move) => {
        if (move !== null) newState[move] = 'O';
      });
      return newState;
    });
    setClickedIndex(index);
    setScalingIndex(index);

    setTimeout(() => {
      setScalingIndex(null);
    }, 300);

    settotalMoves((moves) => moves + 1);
  };
  return (
    <div className="flex w-screen flex-col">
      <div className="mt-10 flex h-full flex-col items-center justify-center 2xl:mt-20">
        <div className="flex rounded-xl border border-neutral-800 px-8 py-2">
          <span className="opacity-90">Total Played Moves -</span>
          <span className="pl-2 text-base font-semibold">{totalMoves}</span>
        </div>
        <div className="mt-12 flex rounded-xl px-8">
          {isYourTurn ? (
            <span className="font-semibold text-green-400">
              Your Turn Rock It!
            </span>
          ) : (
            <span className="flex font-semibold text-red-300">
              <Loader2 className="mr-2 animate-spin" />
              Wait for opponent move
            </span>
          )}
        </div>
        <div className="flex flex-col space-y-3 lg:mt-8 lg:space-y-5">
          <div className="flex flex-row items-center justify-center space-x-5 lg:space-x-8">
            {[0, 1, 2].map((index) => (
              <Block
                key={index}
                value={state[index]}
                onClick={() => onClickAction(index)}
                style={{
                  transform:
                    scalingIndex === index ? 'scale(0.85)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                className={`h-24 w-24 cursor-pointer rounded-xl border border-gray-200 lg:h-28 lg:w-28 ${olastDim.current === index ? 'opacity-20' : ''} ${xlastDim.current === index ? 'opacity-20' : ''} `}
              />
            ))}
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 lg:space-x-8">
            {[3, 4, 5].map((index) => (
              <Block
                key={index}
                value={state[index]}
                onClick={() => onClickAction(index)}
                style={{
                  transform:
                    scalingIndex === index ? 'scale(0.85)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                className={`h-24 w-24 cursor-pointer rounded-xl border border-gray-200 lg:h-28 lg:w-28 ${olastDim.current === index ? 'opacity-20' : ''} ${xlastDim.current === index ? 'opacity-20' : ''} `}
              />
            ))}
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 lg:space-x-8">
            {[6, 7, 8].map((index) => (
              <Block
                key={index}
                value={state[index]}
                onClick={() => onClickAction(index)}
                style={{
                  transform:
                    scalingIndex === index ? 'scale(0.85)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                className={`h-24 w-24 cursor-pointer rounded-xl border border-gray-200 lg:h-28 lg:w-28 ${olastDim.current === index ? 'opacity-20' : ''} ${xlastDim.current === index ? 'opacity-20' : ''} `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
