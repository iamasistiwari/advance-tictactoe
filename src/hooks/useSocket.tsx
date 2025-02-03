import { getHash } from '@/lib/getHash';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  JSX,
} from 'react';
import toast from 'react-hot-toast';

interface SocketContextType {
  socket: WebSocket | null;
  loading: boolean;
  isJoined: boolean;
  isRoomFull: boolean;
  Type: 'X' | 'O';
  joinRoom: (roomId: string) => void;
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

interface SocketProviderProps {
  children: ReactNode;
}

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
});

const fetchHash = async () => {
  const time = formatter.format(new Date());
  const hashedString = await getHash(time);
  return hashedString;
};

export function SocketProvider({ children }: SocketProviderProps): JSX.Element {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [isRoomFull, setIsRoomFull] = useState(false);
  const [Type, setType] = useState<'X' | 'O'>('X');

  useEffect(() => {
    const initialize = async () => {
      const hashedString = await fetchHash();
      console.log("HASHED STING", hashedString)
      const ws = new WebSocket(
        `wss://tictactoews.ashishtiwari.net?token=${hashedString}`
      );
      ws.onopen = () => {
        setSocket(ws);
        setLoading(false);
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data) as ReceivedData;

        if (data.type === 'joined') {
          setIsJoined(true);
        }
        if (data.type === 'error' && data.message === 'room is full') {
          toast.error("Can't join room, it is full");
          setIsRoomFull(true);
        }
        if (data.type === 'game_started' && data.yourMove !== undefined) {
          setType(data.yourMove);
          setIsRoomFull(true);
        }
        ws.onclose = () => {
          console.log('Disconnected from websocket');
        };
      };
    };
    initialize();
    return () => socket?.close();
  }, []);

  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.send(JSON.stringify({ type: 'join_room', roomId }));
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, loading, isJoined, isRoomFull, Type, joinRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
