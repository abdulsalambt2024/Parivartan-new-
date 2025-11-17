
import React from 'react';
import { Achievement } from '../types';

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Best Committee Award 2023',
    description: 'Recognized for outstanding contributions to student life and successful event management throughout the academic year.',
    imageUrl: 'https://picsum.photos/seed/award1/400/300',
    date: 'March 2023',
  },
  {
    id: 2,
    title: 'Inter-College Fest Winners',
    description: 'Secured the first position in the annual inter-college cultural festival, competing against 20 other institutions.',
    imageUrl: 'https://picsum.photos/seed/award2/400/300',
    date: 'December 2022',
  },
  {
    id: 3,
    title: 'Record Fundraising for Social Cause',
    description: 'Raised a record-breaking amount of over ₹2 lakhs for the "Education for All" initiative, supporting underprivileged children.',
    imageUrl: 'https://picsum.photos/seed/award3/400/300',
    date: 'October 2022',
  },
];

const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
            <div className="relative">
                <img className="w-full h-56 object-cover" src={achievement.imageUrl} alt={achievement.title} />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <span className="text-white bg-secondary px-3 py-1 rounded-full text-sm font-semibold">{achievement.date}</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
            </div>
        </div>
    );
};

const Achievements: React.FC = () => {
    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Our Achievements</h1>
                <p className="mt-2 text-lg text-gray-600">Celebrating our milestones and successes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
        </div>
    );
};

export default Achievements;
