'use client';
import { useState, useEffect } from 'react';

export default function Counter({
  tag,
  totalCount,
  totalDuration,
  extraString,
}: {
  tag: string;
  totalCount: number;
  totalDuration: number;
  extraString: string;
}) {
  const [count, setCount] = useState(0);
  const targetNumber = totalCount;
  const duration = totalDuration;

  useEffect(() => {
    let start = 0;
    const increment = Math.ceil(targetNumber / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p className="text-sm font-bold opacity-100 transition-opacity duration-1000 lg:text-2xl">
        {count}
        {' ' + extraString}
      </p>
      <p className="text-sm lg:text-base">{tag}</p>
    </div>
  );
}
