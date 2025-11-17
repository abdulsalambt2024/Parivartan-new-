import React, { useState } from 'react';
import { Achievement } from '../types';

const initialAchievements: Achievement[] = [
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

const AddAchievementModal: React.FC<{ onClose: () => void; onAddAchievement: (achievement: Omit<Achievement, 'id'>) => void; }> = ({ onClose, onAddAchievement }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddAchievement({
            title,
            description,
            imageUrl: imageUrl || `https://picsum.photos/seed/${Date.now()}/400/300`,
            date
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-all scale-95 opacity-0 animate-scale-in">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Achievement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date (e.g., March 2023)</label>
                        <input type="text" id="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                        <input type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Add Achievement</button>
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


const Achievements: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addAchievement = (achievement: Omit<Achievement, 'id'>) => {
        setAchievements(prevAchievements => [{ ...achievement, id: Date.now() }, ...prevAchievements]);
    };

    return (
        <div className="space-y-8">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Our Achievements</h1>
                    <p className="mt-2 text-lg text-gray-600">Celebrating our milestones and successes.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
                    Add Achievement
                </button>
            </div>

            {isModalOpen && <AddAchievementModal onClose={() => setIsModalOpen(false)} onAddAchievement={addAchievement} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
            </div>
        </div>
    );
};

export default Achievements;