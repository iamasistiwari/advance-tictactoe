'use client';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { CircularQueue } from './Queue';
import Block from './Block';

type CellValue = 'O' | 'X' | null;

interface SendData {
  type: 'join_room' | 'leave_room' | 'played';
  roomId: string;
  move?: string;
}
interface ReceivedData {
  type: 'game_start' | 'error' | 'role' | 'move';
  role?: 'X' | 'O'
  move?: number;
}

export default function Game({socket, roomId}: {socket: WebSocket, roomId: string}) {

  const [state, setState] = useState<CellValue[]>(Array(9).fill(null));
  const [isFull, setIsFull] = useState<boolean>(false)
  const [yourMove, setyourMove] = useState<'X' | 'O'>();
  const [totalMoves, settotalMoves] = useState<number>(0);

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
    setyourMove(undefined);
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
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as ReceivedData;
      if(data.type === 'role'){
        setyourMove(data.role)
      }
      if(data.type === 'game_start'){
        setIsFull(true)
      }
      if(data.type === 'move'){
        if(data.move){
          onClickAction(data.move)
        }
      }
    };

  }, [socket]);

  const sendMove = (move: number) => {
    if (onClickAction(move)){
      socket.send(
        JSON.stringify({
          type: 'played',
          roomId,
          move,
        })
      );
    }
  }

  useEffect(() => {
    if (totalMoves > 4 && winnerCheck() && yourMove) {
      setTimeout(() => {
        toast.success(`${yourMove.toUpperCase()} WINS`);
        resetGame();
      }, 200);
    }
  }, [state]);

  const onClickAction = (index: number): boolean => {
    if (state[index] !== null) {
      toast.error('You cannot overwrite the existing move');
      return false;
    }
    if (yourMove === 'X') {
      xCircularQueue.current.add(index);
    } 
    else {
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
    return true
  };

  return (
    <div className="h-screen justify-center items-center flex flex-col">
      <div className="absolute top-10 flex gap-x-10 border py-2 px-8 rounded-xl">
        <div>Total Played Moves - {totalMoves} <span>ISFULL: {" "+isFull}</span></div>
      </div>
      <div className="absolute top-28 flex gap-x-10  py-2 px-8 rounded-xl">
        <div>
          Current Move:{' '}
          {
            <span
              className={`text-2xl lg:text-3xl ml-4 font-extrabold ${yourMove === 'X' ? 'text-red-400' : 'text-green-400'}`}
            >
              {yourMove}
            </span>
          }
        </div>
      </div>
      <div className="flex flex-col space-y-3 lg:space-y-5 mt-10 lg:mt-16">
        <div className="flex flex-row space-x-5 lg:space-x-8 justify-center items-center ">
          {[0, 1, 2].map((index) => (
            <Block
              key={index}
              value={state[index]}
              onClick={() => sendMove(index)}
              style={{
                transform: scalingIndex === index ? 'scale(0.85)' : 'scale(1)',
                transition: 'transform 0.3s ease-in-out',
              }}
              className={`border border-gray-200 h-24 w-24 lg:h-28 lg:w-28 rounded-xl cursor-pointer 
                ${olastDim.current === index ? 'opacity-20' : ''}
                ${xlastDim.current === index ? 'opacity-20' : ''}
              `}
            />
          ))}
        </div>
        <div className="flex flex-row space-x-5 lg:space-x-8 justify-center items-center">
          {[3, 4, 5].map((index) => (
            <Block
              key={index}
              value={state[index]}
              onClick={() => sendMove(index)}
              style={{
                transform: scalingIndex === index ? 'scale(0.85)' : 'scale(1)',
                transition: 'transform 0.3s ease-in-out',
              }}
              className={`border border-gray-200 h-24 w-24 lg:h-28 lg:w-28 rounded-xl cursor-pointer
                ${olastDim.current === index ? 'opacity-20' : ''}
                ${xlastDim.current === index ? 'opacity-20' : ''}
              `}
            />
          ))}
        </div>
        <div className="flex flex-row space-x-5 lg:space-x-8 justify-center items-center">
          {[6, 7, 8].map((index) => (
            <Block
              key={index}
              value={state[index]}
              onClick={() => sendMove(index)}
              style={{
                transform: scalingIndex === index ? 'scale(0.85)' : 'scale(1)',
                transition: 'transform 0.3s ease-in-out',
              }}
              className={`border border-gray-200 h-24 w-24 lg:h-28 lg:w-28 rounded-xl cursor-pointer  
                ${olastDim.current === index ? 'opacity-20' : ''}
                ${xlastDim.current === index ? 'opacity-20' : ''}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
