'use client';
import { useEffect, useState } from 'react';

export function useSocket() {
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      setSocket(ws);
      setLoading(false);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
