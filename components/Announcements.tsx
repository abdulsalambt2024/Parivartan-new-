import React, { useState } from 'react';
import { Announcement } from '../types';
import { AnnouncementIcon } from './Icons';

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'General Body Meeting Postponed',
    content: 'The General Body Meeting scheduled for this Wednesday has been postponed to next Monday at 5:00 PM in the main hall. We apologize for any inconvenience.',
    date: '2024-07-28',
    level: 'critical',
  },
  {
    id: 2,
    title: 'Call for Volunteers: Annual Fest',
    content: 'We are looking for enthusiastic volunteers for the upcoming annual college fest. Sign up at the committee room by this Friday.',
    date: '2024-07-26',
    level: 'warning',
  },
  {
    id: 3,
    title: 'New Committee Website Launch',
    content: 'We are excited to launch our new website! Explore the new features and let us know your feedback.',
    date: '2024-07-25',
    level: 'info',
  },
];

const getLevelClasses = (level: 'info' | 'warning' | 'critical') => {
  switch (level) {
    case 'critical':
      return {
        bg: 'bg-red-50 border-red-500',
        iconBg: 'bg-red-500',
        text: 'text-red-800',
        title: 'text-red-900',
      };
    case 'warning':
      return {
        bg: 'bg-yellow-50 border-yellow-500',
        iconBg: 'bg-yellow-500',
        text: 'text-yellow-800',
        title: 'text-yellow-900',
      };
    case 'info':
    default:
      return {
        bg: 'bg-blue-50 border-blue-500',
        iconBg: 'bg-blue-500',
        text: 'text-blue-800',
        title: 'text-blue-900',
      };
  }
};

const AnnouncementCard: React.FC<{ announcement: Announcement }> = ({ announcement }) => {
    const classes = getLevelClasses(announcement.level);
    return (
        <div className={`p-6 rounded-lg shadow-md border-l-4 ${classes.bg}`}>
            <div className="flex">
                <div className={`flex-shrink-0 p-3 rounded-full ${classes.iconBg}`}>
                    <AnnouncementIcon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                    <h3 className={`text-lg font-bold ${classes.title}`}>{announcement.title}</h3>
                    <p className={`mt-2 text-sm ${classes.text}`}>{announcement.content}</p>
                    <p className={`mt-3 text-xs font-semibold ${classes.text}`}>{new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
        </div>
    );
}

const AddAnnouncementModal: React.FC<{ onClose: () => void; onAddAnnouncement: (announcement: Omit<Announcement, 'id'>) => void; }> = ({ onClose, onAddAnnouncement }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [level, setLevel] = useState<'info' | 'warning' | 'critical'>('info');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddAnnouncement({
            title,
            content,
            level,
            date: new Date().toISOString().split('T')[0]
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-all scale-95 opacity-0 animate-scale-in">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">New Announcement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
                        <select id="level" value={level} onChange={e => setLevel(e.target.value as 'info' | 'warning' | 'critical')} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                            <option value="info">Info</option>
                            <option value="warning">Warning</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Publish</button>
                    </div>
                </form>
            </div>
            <style>{`
                @keyframes scale-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in { animation: scale-in 0.3s forwards cubic-bezier(0.165, 0.84, 0.44, 1); }
            `}</style>
        </div>
    );
};

const Announcements: React.FC = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
        setAnnouncements(prevAnnouncements => [{ ...announcement, id: Date.now() }, ...prevAnnouncements]);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Announcements</h1>
                    <p className="mt-2 text-lg text-gray-600">Important notices and updates from the committee.</p>
                </div>
                 <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
                    New Announcement
                </button>
            </div>

            {isModalOpen && <AddAnnouncementModal onClose={() => setIsModalOpen(false)} onAddAnnouncement={addAnnouncement} />}

            <div className="space-y-6">
                {announcements.map(announcement => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
            </div>
        </div>
    );
};

export default Announcements;