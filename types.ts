
export type Page = 'Dashboard' | 'Posts' | 'Announcements' | 'Achievements' | 'Donations' | 'Events' | 'Tasks' | 'Chat';

export interface Post {
  id: number;
  author: string;
  authorImage: string;
  title: string;
  content: string;
  timestamp: string;
}

export interface Announcement {
  id: number;
  title:string;
  content: string;
  date: string;
  level: 'info' | 'warning' | 'critical';
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
}

export enum TaskStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
}

export interface ChatMessage {
    id: number;
    sender: string;
    senderImage: string;
    text: string;
    timestamp: string;
    isCurrentUser: boolean;
}

export interface Member {
    name: string;
    avatarUrl: string;
}
