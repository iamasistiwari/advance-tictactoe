interface ReceivedData {
  type:
    | 'joined'
    | 'error'
    | 'state'
    | 'game_started'
    | 'queueFull'
    | 'gameEnd'
    | 'currentMove';
  state?: string;
  message?: string;
  playerOneLastEle?: number | null;
  playerTwoLastEle?: number | null;
  totalMoves?: number;
  currentMove: 'X' | 'O';
  yourMove: 'X' | 'O';
}

interface SendData {
  type: 'join_room' | 'leave_room' | 'played';
  roomId: string;
  move?: string;
}