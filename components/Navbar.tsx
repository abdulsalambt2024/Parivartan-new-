
import React from 'react';
import { Page } from '../types';
import { DashboardIcon, PostIcon, AnnouncementIcon, AchievementIcon, DonationIcon, EventIcon, TaskIcon, ChatIcon, CloseIcon, LogoutIcon } from './Icons';

interface NavItemProps {
  icon: React.ReactNode;
  label: Page;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center p-3 my-1 rounded-lg transition-colors ${
        isActive
          ? 'bg-primary text-white shadow-md'
          : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="ml-3 font-medium">{label}</span>
    </a>
  </li>
);

interface NavbarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onLogout: () => void;
}

const navItems: { label: Page; icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { label: 'Posts', icon: <PostIcon className="w-6 h-6" /> },
    { label: 'Announcements', icon: <AnnouncementIcon className="w-6 h-6" /> },
    { label: 'Achievements', icon: <AchievementIcon className="w-6 h-6" /> },
    { label: 'Donations', icon: <DonationIcon className="w-6 h-6" /> },
    { label: 'Events', icon: <EventIcon className="w-6 h-6" /> },
    { label: 'Tasks', icon: <TaskIcon className="w-6 h-6" /> },
    { label: 'Chat', icon: <ChatIcon className="w-6 h-6" /> },
];

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage, isOpen, setIsOpen, onLogout }) => {
    const sidebarClasses = `
        fixed lg:relative inset-y-0 left-0
        transform ${isOpen ? 'translateX(0)' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
        z-30 w-64 bg-indigo-800 text-white
        flex flex-col shadow-lg
    `;

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden" onClick={() => setIsOpen(false)}></div>}
            <nav className={sidebarClasses}>
                <div className="flex items-center justify-between p-4 border-b border-indigo-700">
                    <h1 className="text-2xl font-bold">Parivartan</h1>
                    <button onClick={() => setIsOpen(false)} className="lg:hidden text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <ul className="flex-1 px-2 py-4">
                    {navItems.map(item => (
                        <NavItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            isActive={currentPage === item.label}
                            onClick={() => setCurrentPage(item.label)}
                        />
                    ))}
                </ul>
                <div className="p-4 border-t border-indigo-700">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onLogout();
                      }}
                      className="flex items-center p-3 my-1 rounded-lg transition-colors text-gray-300 hover:bg-red-600 hover:text-white"
                    >
                      <LogoutIcon className="w-6 h-6" />
                      <span className="ml-3 font-medium">Logout</span>
                    </a>
                    <p className="text-sm text-indigo-300 text-center mt-4">&copy; 2024 Parivartan Committee</p>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
