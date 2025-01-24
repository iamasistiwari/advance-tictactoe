import RoomGame from '@/components/RoomGame';
import React from 'react';

interface PageProps {
  params: Promise<{
    roomid: string;
  }>;
}
export default async function Page({ params }: PageProps) {
  const { roomid } = await params;
  return (
    <div>
      <span className="pl-2 text-xs font-semibold opacity-40">
        ROOM ID - {roomid}
      </span>
      <RoomGame roomId={roomid}></RoomGame>
    </div>
  );
}
