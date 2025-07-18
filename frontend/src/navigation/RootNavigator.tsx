"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useWallet } from '@/hooks/useWallet';
import { ThemeToggle } from '@/components/ThemeToggle';

const menuItems = [
  { name: 'Home', route: ROUTES.HOME },
  { name: 'Projects', route: ROUTES.PROJECTS },
  { name: 'Vote', route: ROUTES.VOTE },
];

export const RootNavigator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { account, connect, isConnecting, error } = useWallet();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch by not rendering until mounted
    return <div className="min-h-screen bg-white dark:bg-[#181A20]" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#2D3748] dark:bg-[#181A20] dark:text-[#E2E8F0] transition-colors duration-500">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between h-16 px-8 bg-white text-[#2D3748] dark:bg-[#23272F] dark:text-[#E2E8F0] border-b border-gray-200 dark:border-[#23272F] transition-colors duration-500">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold">ArchiDAO</span>
          <div className="flex gap-2">
            {menuItems.map((item) => (
              <Link key={item.route} href={item.route}>
                <span className={`px-3 py-2 rounded cursor-pointer transition-colors duration-200 ${pathname === item.route ? 'bg-[#4299E1] text-white' : 'hover:bg-[#4299E1] hover:text-white'}`}>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {account ? (
            <span className="px-4 py-2 rounded bg-[#E2E8F0] dark:bg-[#23272F] text-[#2D3748] dark:text-[#E2E8F0] font-mono border border-[#2D3748] dark:border-[#E2E8F0]">{account.slice(0, 6)}...{account.slice(-4)}</span>
          ) : (
            <button
              style={{ background: '#2D3748', color: '#fff' }}
              className="px-4 py-2 rounded dark:bg-[#4299E1] dark:text-white"
              onClick={connect}
              disabled={isConnecting}
            >
              {isConnecting ? 'Bağlanıyor...' : 'Connect Wallet'}
            </button>
          )}
          {error && <span className="ml-4 text-red-500 text-sm">{error}</span>}
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
      {/* Footer */}
      <footer className="h-16 flex items-center justify-between px-8 bg-white text-[#2D3748] dark:bg-[#23272F] dark:text-[#E2E8F0] border-t border-gray-200 dark:border-[#23272F] transition-colors duration-500">
        <button style={{ background: '#4299E1', color: '#fff' }} className="px-4 py-2 rounded">Submit Project</button>
        <div className="flex gap-4">
          {/* Sosyal medya linkleri */}
          <a href="#" className="text-gray-500 hover:text-[#2D3748] dark:text-[#E2E8F0] dark:hover:text-[#4299E1]">Twitter</a>
          <a href="#" className="text-gray-500 hover:text-[#2D3748] dark:text-[#E2E8F0] dark:hover:text-[#4299E1]">Discord</a>
        </div>
      </footer>
    </div>
  );
}; 