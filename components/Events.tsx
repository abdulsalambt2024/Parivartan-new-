import React, { useState } from 'react';
import { Event } from '../types';

const initialEvents: Event[] = [
  {
    id: 1,
    name: 'Annual Tech Symposium',
    description: 'A full-day event with guest speakers, workshops, and a hackathon. A must-attend for all tech enthusiasts.',
    date: '2024-08-15',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Auditorium',
    imageUrl: 'https://picsum.photos/seed/event1/400/250',
  },
  {
    id: 2,
    name: 'Cultural Night 2024',
    description: 'Experience a vibrant evening of music, dance, and drama performances from talented students.',
    date: '2024-09-05',
    time: '6:00 PM onwards',
    location: 'Open Air Theatre',
    imageUrl: 'https://picsum.photos/seed/event2/400/250',
  },
  {
    id: 3,
    name: 'Campus Cleanup Drive',
    description: 'Join us in making our campus cleaner and greener. A small step towards a big change.',
    date: '2024-09-20',
    time: '10:00 AM - 12:00 PM',
    location: 'Starting at College Main Gate',
    imageUrl: 'https://picsum.photos/seed/event3/400/250',
  },
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const eventDate = new Date(event.date);
    const day = eventDate.toLocaleDateString('en-US', { day: '2-digit' });
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <img className="w-full h-48 object-cover" src={event.imageUrl} alt={event.name} />
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
                        <div className="text-sm text-gray-500 space-y-1">
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                        </div>
                    </div>
                     <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-md ml-4 text-center">
                        <span className="text-2xl font-bold text-primary">{day}</span>
                        <span className="text-sm font-semibold text-gray-600">{month}</span>
                    </div>
                </div>
                <p className="text-gray-600 mt-4 flex-1">{event.description}</p>
                <button className="mt-6 w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Register
                </button>
            </div>
        </div>
    );
};

const AddEventModal: React.FC<{ onClose: () => void; onAddEvent: (event: Omit<Event, 'id'>) => void; }> = ({ onClose, onAddEvent }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddEvent({
            name,
            description,
            date,
            time,
            location,
            imageUrl: imageUrl || `https://picsum.photos/seed/${Date.now()}/400/250`
        });
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-all scale-95 opacity-0 animate-scale-in">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                         <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                            <input type="text" id="time" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g., 9:00 AM" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                         <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                        <input type="text" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Create Event</button>
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


const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addEvent = (event: Omit<Event, 'id'>) => {
        setEvents(prevEvents => [{ ...event, id: Date.now() }, ...prevEvents].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Upcoming Events</h1>
                    <p className="mt-2 text-lg text-gray-600">Join us for our exciting lineup of events.</p>
                </div>
                 <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
                    Create Event
                </button>
            </div>

            {isModalOpen && <AddEventModal onClose={() => setIsModalOpen(false)} onAddEvent={addEvent} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Events;