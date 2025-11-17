
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

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const moveTask = (id: number, newStatus: TaskStatus) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
    };

    const columns: { title: TaskStatus; color: string }[] = [
        { title: TaskStatus.ToDo, color: 'border-red-500' },
        { title: TaskStatus.InProgress, color: 'border-yellow-500' },
        { title: TaskStatus.Done, color: 'border-green-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Task Board</h1>
                <p className="mt-2 text-lg text-gray-600">Organize, assign, and track all committee tasks.</p>
            </div>
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
