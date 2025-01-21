import RoomGame from '@/components/RoomGame';
import React from 'react';

export default async function Page({params}: {params: {roomId: string}}) {
    const {roomId} = await params


  return <div>
    <RoomGame roomId={roomId}></RoomGame>
  </div>;
}
