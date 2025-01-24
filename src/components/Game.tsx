'use client';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import Block from './Block';
import { Loader2 } from 'lucide-react';
type CellValue = 'O' | 'X' | null;

export default function Game({
  socket,
  roomId,
  moveType,
}: {
  socket: WebSocket;
  roomId: string;
  moveType: 'X' | 'O';
}) {
  const [gameState, setGameState] = useState<CellValue[]>(Array(9).fill(null));
  const [totalMoves, settotalMoves] = useState<number>(0);

  const [, setClickedIndex] = useState<number | null>(null);
  const [scalingIndex, setScalingIndex] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const playerOneLastDim = useRef<number | null>(null);
  const playerTwoLastDim = useRef<number | null>(null);

  const [isYourTurn, setIsYourTurn] = useState<boolean>();
  useEffect(() => {
    if (moveType === 'X') {
      setIsYourTurn(true);
    } else {
      setIsYourTurn(false);
    }
  }, [gameOver]);

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as ReceivedData;
      if (
        data.type === 'state' &&
        data.state !== undefined &&
        data.totalMoves !== undefined &&
        data.playerOneLastEle !== undefined &&
        data.playerTwoLastEle !== undefined
      ) {
        const newState = data.state as unknown as CellValue[];
        playerOneLastDim.current = data.playerOneLastEle;
        playerTwoLastDim.current = data.playerTwoLastEle;
        if (moveType === data.currentMove) {
          setIsYourTurn(true);
        } else {
          setIsYourTurn(false);
        }
        setGameState(newState);
        settotalMoves(data.totalMoves);
      }
      if (data.type === 'error' && data.message !== undefined) {
        toast.error(data.message);
      }

      if (data.type === 'gameEnd' && data.message !== undefined) {
        if (data.message === 'Congratulations You won opponent exited') {
          toast.success(data.message);
          setTimeout(() => {
            window.location.assign('/dashboard');
          }, 2000);
          return;
        }
        if (data.message === 'Congratulations') {
          toast.success(data.message);
          setTimeout(() => {
            resetGame();
          }, 400);
        } else {
          toast.error(data.message);
          setTimeout(() => {
            resetGame();
          }, 400);
        }
      }
    };
  }, [socket]);

  const resetGame = () => {
    setGameState(Array(9).fill(null));
    playerOneLastDim.current = null;
    playerTwoLastDim.current = null;
    setClickedIndex(null);
    setScalingIndex(null);
    settotalMoves(0);
    setGameOver((value) => !value);
  };

  const onClickAction = (index: number) => {
    socket.send(JSON.stringify({ type: 'played', roomId, move: index }));
    setClickedIndex(index);
    setScalingIndex(index);
    setTimeout(() => {
      setScalingIndex(null);
    }, 300);
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
                value={gameState[index]}
                onClick={() => onClickAction(index)}
                style={{
                  transform:
                    scalingIndex === index ? 'scale(0.85)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                className={`h-24 w-24 cursor-pointer rounded-xl border border-gray-200 lg:h-28 lg:w-28 ${playerOneLastDim.current === index ? 'opacity-20' : ''} ${playerTwoLastDim.current === index ? 'opacity-20' : ''} `}
              />
            ))}
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 lg:space-x-8">
            {[3, 4, 5].map((index) => (
              <Block
                key={index}
                value={gameState[index]}
                onClick={() => onClickAction(index)}
                style={{
                  transform:
                    scalingIndex === index ? 'scale(0.85)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                className={`h-24 w-24 cursor-pointer rounded-xl border border-gray-200 lg:h-28 lg:w-28 ${playerOneLastDim.current === index ? 'opacity-20' : ''} ${playerTwoLastDim.current === index ? 'opacity-20' : ''} `}
              />
            ))}
          </div>
          <div className="flex flex-row items-center justify-center space-x-5 lg:space-x-8">
            {[6, 7, 8].map((index) => (
              <Block
                key={index}
                value={gameState[index]}
                onClick={() => onClickAction(index)}
                style={{
                  transform:
                    scalingIndex === index ? 'scale(0.85)' : 'scale(1)',
                  transition: 'transform 0.3s ease-in-out',
                }}
                className={`h-24 w-24 cursor-pointer rounded-xl border border-gray-200 lg:h-28 lg:w-28 ${playerOneLastDim.current === index ? 'opacity-20' : ''} ${playerTwoLastDim.current === index ? 'opacity-20' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
