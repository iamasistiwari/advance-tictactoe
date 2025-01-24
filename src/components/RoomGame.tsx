'use client';
import React from 'react';
import Game from './Game';
import { useSocket } from '@/hooks/useSocket';
import { Loader2 } from 'lucide-react';
export default function RoomGame({ roomId }: { roomId: string }) {
  const { socket, isRoomFull, Type } = useSocket();

  if (!socket) {
    return (
      <div className="flex h-screen items-center justify-center">
        Connecting to WebSocket...
      </div>
    );
  }

  if (!isRoomFull) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold lg:text-xl">
        <Loader2 className="mr-4 animate-spin" />
        Waiting for more players...
      </div>
    );
  }
  return (
    <div>
      <Game socket={socket} roomId={roomId} moveType={Type} />
    </div>
  );
}
