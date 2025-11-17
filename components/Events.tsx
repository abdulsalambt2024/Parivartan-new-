
import React from 'react';
import { Event } from '../types';

const events: Event[] = [
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

const Events: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Upcoming Events</h1>
                <p className="mt-2 text-lg text-gray-600">Join us for our exciting lineup of events.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Events;
