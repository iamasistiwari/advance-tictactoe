'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Navbar from '@/components/ui/Navbar';
import { useSocket } from '@/hooks/useSocket';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoCloudOffline } from 'react-icons/io5';

export default function Page() {
  const { socket, loading, isJoined, joinRoom } = useSocket();
  const [roomId, setRoomId] = useState<string>('');
  const router = useRouter();
  const joinRoomRef = useRef<HTMLInputElement>(null);
  const [isJoinBoolean, setIsJoinBoolean] = useState<boolean>(false);
  const [offlineRedirecting, setOffineRedirecting] = useState<boolean>(false);

  const handleRoomJoin = (e: React.FormEvent) => {
    setIsJoinBoolean(true);
    e.preventDefault();
    if (roomId === '') {
      toast.error("Room-ID can't be empty");
      joinRoomRef.current?.focus();
      new Promise(() => {
        setTimeout(() => {
          setIsJoinBoolean(false);
        }, 800);
      });
      return;
      return;
    }
    if (roomId.length <= 3) {
      toast.error("Room-ID can't be less than 4-digits");
      joinRoomRef.current?.focus();
      new Promise(() => {
        setTimeout(() => {
          setIsJoinBoolean(false);
        }, 800)
      })
      return;
    }
    if (socket && !loading) {
      joinRoom(roomId);
      new Promise(() => {
        setTimeout(() => {
          setIsJoinBoolean(false);
        }, 800);
      });
    }
  };

  useEffect(() => {
    if (isJoined && roomId) {
      router.push(`/room/${roomId}`);
    }
  }, [isJoined, roomId]);

  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="mt-40 flex w-full justify-center">
        <div className="mx-10 flex flex-col items-center justify-center space-y-6 lg:space-y-10">
          <div className="mb-4">
            <Button
              isLoading={offlineRedirecting}
              size={'default'}
              variant={'ghost'}
              className="w-[290px] border font-semibold lg:w-[620px]"
              onClick={() => {
                setOffineRedirecting(true);
                router.push('/offline');
              }}
            >
              {!offlineRedirecting ? <IoCloudOffline className="mr-2" /> : ''}
              PlayOffine
            </Button>
          </div>
          <span className="font-extrabold">Or</span>
          <div className="flex flex-col">
            <label
              htmlFor="roomJoin"
              className="mb-2 text-lg font-bold hover:cursor-pointer"
            >
              Join Room
            </label>
            <form
              className="flex flex-col gap-y-4 lg:flex-row lg:gap-y-0"
              onSubmit={handleRoomJoin}
            >
              <Input
                id="roomJoin"
                placeholder="Enter Room ID"
                className="w-[290px] pl-3 placeholder:pl-3 lg:w-[400px]"
                type="text"
                ref={joinRoomRef}
                onChange={(e) => {
                  setRoomId(e.target.value);
                }}
              />
              <div className="flex w-full justify-center lg:ml-4 lg:w-52">
                <Button
                  isLoading={isJoinBoolean}
                  size={'default'}
                  variant={'default'}
                  type="submit"
                  className="w-36 font-semibold lg:w-60"
                >
                  Join Room
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
