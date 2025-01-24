import RoomGame from '@/components/RoomGame';
import React from 'react';

interface PageProps {
  params: Promise<{
    roomId: string;
  }>;
}
export default async function Page({ params }: PageProps) {
  const { roomId } = await params;
  return (
    <div>
      <span className="pl-2 text-xs font-semibold opacity-40">
        ROOM ID - {roomId}
      </span>
      <RoomGame roomId={roomId}></RoomGame>
    </div>
  );
}
