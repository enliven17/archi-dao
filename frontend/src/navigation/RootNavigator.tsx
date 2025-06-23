import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useWallet } from '@/hooks/useWallet';

const menuItems = [
  { name: 'Home', route: ROUTES.HOME },
  { name: 'Projects', route: ROUTES.PROJECTS },
  { name: 'Vote', route: ROUTES.VOTE },
];

export const RootNavigator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { account, connect, isConnecting, error } = useWallet();

  return (
    <div className="min-h-screen flex" style={{ background: '#E2E8F0' }}>
      {/* Sidebar */}
      <aside className="w-56 flex flex-col py-8 px-4" style={{ background: '#2D3748', color: '#fff' }}>
        <div className="text-2xl font-bold mb-8">ArchiDAO</div>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link key={item.route} href={item.route}>
              <span className={`py-2 px-3 rounded cursor-pointer block ${pathname === item.route ? 'bg-[#4299E1] text-white' : 'hover:bg-[#4299E1] hover:text-white'}`}>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto text-xs text-gray-300">© 2024 ArchiDAO</div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-end items-center h-16 px-8 bg-white border-b border-gray-200">
          {/* Connect Wallet butonu burada olacak */}
          {account ? (
            <span className="px-4 py-2 rounded bg-[#E2E8F0] text-[#2D3748] font-mono border border-[#2D3748]">{account.slice(0, 6)}...{account.slice(-4)}</span>
          ) : (
            <button
              style={{ background: '#2D3748', color: '#fff' }}
              className="px-4 py-2 rounded"
              onClick={connect}
              disabled={isConnecting}
            >
              {isConnecting ? 'Bağlanıyor...' : 'Connect Wallet'}
            </button>
          )}
          {error && <span className="ml-4 text-red-500 text-sm">{error}</span>}
        </header>
        {/* Content */}
        <main className="flex-1 p-8">{children}</main>
        {/* Footer */}
        <footer className="h-16 flex items-center justify-between px-8 bg-white border-t border-gray-200">
          <button style={{ background: '#4299E1', color: '#fff' }} className="px-4 py-2 rounded">Submit Project</button>
          <div className="flex gap-4">
            {/* Sosyal medya linkleri */}
            <a href="#" className="text-gray-500 hover:text-[#2D3748]">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-[#2D3748]">Discord</a>
          </div>
        </footer>
      </div>
    </div>
  );
}; 