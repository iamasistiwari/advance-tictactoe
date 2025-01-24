import Link from 'next/link';
import React from 'react';
export default function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b border-neutral-800 px-10 lg:px-12">
      <Link href={'/'} className="text-lg font-bold">TicTacToe</Link>
      <div className="flex">
        <div className="flex items-center justify-center">
          <span className="wave opacity-90">👋</span>
          <span className="pl-3 opacity-60">Hi, User</span>
        </div>
      </div>
    </nav>
  );
}
