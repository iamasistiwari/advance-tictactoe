'use client';
import { SocketProvider } from '@/hooks/useSocket';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldUseSocket = pathname !== '/' && pathname !== '/offline';
  return (
      shouldUseSocket ? (
        <SocketProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </SocketProvider>
      ) : (
        <>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </>
      )
  );
}
