import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES } from '@/constants/routes';
import { colors } from '@/theme/colors';

const menuItems = [
  { name: 'Home', route: ROUTES.HOME },
  { name: 'Projects', route: ROUTES.PROJECTS },
  { name: 'Vote', route: ROUTES.VOTE },
];

export const RootNavigator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex bg-[${colors.background}]">
      {/* Sidebar */}
      <aside className="w-56 bg-[${colors.primary}] text-white flex flex-col py-8 px-4">
        <div className="text-2xl font-bold mb-8">ArchiDAO</div>
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link key={item.route} href={item.route} legacyBehavior>
              <a className={`py-2 px-3 rounded hover:bg-[${colors.accent}] ${router.pathname === item.route ? 'bg-[${colors.accent}]' : ''}`}>{item.name}</a>
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
          <button className="bg-[${colors.primary}] text-white px-4 py-2 rounded">Connect Wallet</button>
        </header>
        {/* Content */}
        <main className="flex-1 p-8">{children}</main>
        {/* Footer */}
        <footer className="h-16 flex items-center justify-between px-8 bg-white border-t border-gray-200">
          <button className="bg-[${colors.accent}] text-white px-4 py-2 rounded">Submit Project</button>
          <div className="flex gap-4">
            {/* Sosyal medya linkleri */}
            <a href="#" className="text-gray-500 hover:text-[${colors.primary}]">Twitter</a>
            <a href="#" className="text-gray-500 hover:text-[${colors.primary}]">Discord</a>
          </div>
        </footer>
      </div>
    </div>
  );
}; 