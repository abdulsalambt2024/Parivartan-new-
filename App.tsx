
import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Posts from './components/Posts';
import Announcements from './components/Announcements';
import Achievements from './components/Achievements';
import Donations from './components/Donations';
import Events from './components/Events';
import Tasks from './components/Tasks';
import Chat from './components/Chat';
import { Page } from './types';
import { MenuIcon } from './components/Icons';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Posts':
        return <Posts />;
      case 'Announcements':
        return <Announcements />;
      case 'Achievements':
        return <Achievements />;
      case 'Donations':
        return <Donations />;
      case 'Events':
        return <Events />;
      case 'Tasks':
        return <Tasks />;
      case 'Chat':
        return <Chat />;
      default:
        return <Dashboard />;
    }
  }, [currentPage]);
  
  const handleSetCurrentPage = (page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Close sidebar on navigation
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar currentPage={currentPage} setCurrentPage={handleSetCurrentPage} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between lg:hidden">
            <h1 className="text-xl font-bold text-primary">Parivartan</h1>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 focus:outline-none">
                <MenuIcon className="h-6 w-6" />
            </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
