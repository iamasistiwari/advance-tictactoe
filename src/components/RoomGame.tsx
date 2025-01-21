'use client';

import { useSocket } from '@/hooks/useSocket';
import React, { useEffect } from 'react';
import Game from './Game';

export default function RoomGame({ roomId }: { roomId: string }) {
  const { socket, loading } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: 'join_room',
          roomId,
        })
      );
    }
  }, [socket, loading]);

  if (loading || !socket) {
    return <div>Connecting to server</div>;
  }
  return <div>DONE CONNECTED
    <Game socket={socket} roomId={roomId}/>
  </div>;
}

