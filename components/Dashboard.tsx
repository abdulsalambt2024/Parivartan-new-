
import React from 'react';
import { PostIcon, EventIcon, TaskIcon } from './Icons';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 border-l-4 ${color}`}>
        <div className="flex-shrink-0">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Committee Dashboard</h1>
                <p className="mt-2 text-lg text-gray-600">Welcome back! Here's a quick overview of what's happening.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard icon={<EventIcon className="h-10 w-10 text-primary" />} title="Upcoming Events" value="3" color="border-primary" />
                <StatCard icon={<TaskIcon className="h-10 w-10 text-secondary" />} title="Active Tasks" value="8" color="border-secondary" />
                <StatCard icon={<PostIcon className="h-10 w-10 text-yellow-500" />} title="Recent Posts" value="5" color="border-yellow-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Announcements</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-3">
                            <div className="flex-shrink-0 h-2.5 w-2.5 rounded-full bg-red-500 mt-1.5"></div>
                            <div>
                                <p className="font-semibold text-gray-800">Urgent: Meeting Rescheduled</p>
                                <p className="text-sm text-gray-500">The weekly meeting has been moved to Friday at 3 PM.</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="flex-shrink-0 h-2.5 w-2.5 rounded-full bg-yellow-500 mt-1.5"></div>
                            <div>
                                <p className="font-semibold text-gray-800">Volunteer Sign-ups</p>
                                <p className="text-sm text-gray-500">We need volunteers for the upcoming 'Clean Campus' drive.</p>
                            </div>
                        </li>
                        <li className="flex items-start space-x-3">
                            <div className="flex-shrink-0 h-2.5 w-2.5 rounded-full bg-green-500 mt-1.5"></div>
                            <div>
                                <p className="font-semibold text-gray-800">Event Success!</p>
                                <p className="text-sm text-gray-500">Thank you to everyone who participated in the charity bake sale.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Your Pending Tasks</h2>
                     <ul className="space-y-4">
                        <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-semibold text-gray-800">Design Event Poster</p>
                                <p className="text-sm text-gray-500">Assigned to: You</p>
                            </div>
                            <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">High Priority</span>
                        </li>
                         <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-semibold text-gray-800">Contact Guest Speaker</p>
                                <p className="text-sm text-gray-500">Assigned to: You</p>
                            </div>
                            <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Medium Priority</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
