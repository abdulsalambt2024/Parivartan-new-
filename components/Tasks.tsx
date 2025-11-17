import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';

const initialTasks: Task[] = [
  { id: 1, title: 'Design fest poster', description: 'Create a vibrant poster for the upcoming tech fest.', assignee: 'Priya', status: TaskStatus.ToDo },
  { id: 2, title: 'Book auditorium', description: 'Finalize booking for the main auditorium for the annual day.', assignee: 'Aarav', status: TaskStatus.InProgress },
  { id: 3, title: 'Send guest invitations', description: 'Email invitations to all guest speakers.', assignee: 'Rohan', status: TaskStatus.Done },
  { id: 4, title: 'Arrange for refreshments', description: 'Get quotes from different vendors.', assignee: 'Sana', status: TaskStatus.ToDo },
  { id: 5, title: 'Update website', description: 'Post the new event schedule on the website.', assignee: 'Priya', status: TaskStatus.InProgress },
];

const TaskCard: React.FC<{ task: Task, onMove: (id: number, status: TaskStatus) => void }> = ({ task, onMove }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
            <h4 className="font-bold text-gray-800">{task.title}</h4>
            <p className="text-sm text-gray-600 my-2">{task.description}</p>
            <div className="flex justify-between items-center mt-3">
                <span className="text-xs font-medium text-gray-500">Assignee: {task.assignee}</span>
                <div className="relative group">
                    <button className="p-1 bg-gray-200 rounded-full text-xs hover:bg-gray-300">Move</button>
                    <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-white shadow-lg rounded-md border w-32 z-10">
                        {Object.values(TaskStatus).map(status => (
                            task.status !== status && (
                                <button key={status} onClick={() => onMove(task.id, status)} className="block w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100">
                                    {status}
                                </button>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TaskColumn: React.FC<{ title: TaskStatus; tasks: Task[]; color: string; onMove: (id: number, status: TaskStatus) => void; }> = ({ title, tasks, color, onMove }) => (
    <div className="bg-gray-100 rounded-lg p-4 w-full md:w-1/3">
        <h3 className={`font-bold text-lg mb-4 pb-2 border-b-4 ${color}`}>{title} ({tasks.length})</h3>
        <div>
            {tasks.map(task => <TaskCard key={task.id} task={task} onMove={onMove} />)}
        </div>
    </div>
);

const AddTaskModal: React.FC<{ onClose: () => void; onAddTask: (task: Omit<Task, 'id' | 'status'>) => void; }> = ({ onClose, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask({ title, description, assignee });
        onClose();
    };

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-all scale-95 opacity-0 animate-scale-in">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Task</h2>
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
                        <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
                        <input type="text" id="assignee" value={assignee} onChange={e => setAssignee(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Create Task</button>
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


const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const moveTask = (id: number, newStatus: TaskStatus) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
    };
    
    const addTask = (task: Omit<Task, 'id' | 'status'>) => {
        const newTask: Task = {
            ...task,
            id: Date.now(),
            status: TaskStatus.ToDo
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
    };

    const columns: { title: TaskStatus; color: string }[] = [
        { title: TaskStatus.ToDo, color: 'border-red-500' },
        { title: TaskStatus.InProgress, color: 'border-yellow-500' },
        { title: TaskStatus.Done, color: 'border-green-500' },
    ];

    return (
        <div className="space-y-8">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Task Board</h1>
                    <p className="mt-2 text-lg text-gray-600">Organize, assign, and track all committee tasks.</p>
                </div>
                 <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
                    New Task
                </button>
            </div>

            {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} onAddTask={addTask} />}
            
            <div className="flex flex-col md:flex-row gap-6">
                {columns.map(col => (
                    <TaskColumn
                        key={col.title}
                        title={col.title}
                        tasks={tasks.filter(t => t.status === col.title)}
                        color={col.color}
                        onMove={moveTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tasks;