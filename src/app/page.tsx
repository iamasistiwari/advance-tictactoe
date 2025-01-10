"use client";
import React, { useState } from "react";

export default function Home() {
  const [queue, setQueue] = useState<number[]>([]);

  // Function to add an item to the queue
  const enqueue = (item: number) => {
    setQueue((prevQueue) => [...prevQueue, item]);
  };

  // Function to remove an item from the queue
  const dequeue = () => {
    setQueue((prevQueue) => prevQueue.slice(1));
  };

  // Function to clear the queue
  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Queue in React</h1>

      {/* Display Queue */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Queue:</h2>
        <div className="flex space-x-2 mt-2">
          {queue.length > 0 ? (
            queue.map((item, index) => (
              <div
                key={index}
                className="p-2 border rounded bg-gray-100 text-center"
              >
                {item}
              </div>
            ))
          ) : (
            <div className="text-gray-500">Queue is empty</div>
          )}
        </div>
      </div>

      {/* Buttons for Queue Operations */}
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => enqueue(Math.floor(Math.random() * 100))}
        >
          Enqueue
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={dequeue}
          disabled={queue.length === 0}
        >
          Dequeue
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={clearQueue}
        >
          Clear Queue
        </button>
      </div>
    </div>
  );
}
