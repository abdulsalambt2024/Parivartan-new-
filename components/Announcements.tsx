
import React from 'react';
import { Announcement } from '../types';
import { AnnouncementIcon } from './Icons';

const announcements: Announcement[] = [
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

const Announcements: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Announcements</h1>
                <p className="mt-2 text-lg text-gray-600">Important notices and updates from the committee.</p>
            </div>
            <div className="space-y-6">
                {announcements.map(announcement => (
                    <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
            </div>
        </div>
    );
};

export default Announcements;
