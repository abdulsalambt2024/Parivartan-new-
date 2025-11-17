
import React, { useState } from 'react';
import { Post } from '../types';
import { generateText } from '../services/geminiService';
import { SparklesIcon } from './Icons';

const initialPosts: Post[] = [
  {
    id: 1,
    author: 'Aarav Sharma',
    authorImage: 'https://picsum.photos/seed/aarav/100/100',
    title: 'Successful Charity Drive!',
    content: 'A huge thank you to everyone who donated and volunteered. We successfully raised over ₹50,000 for local orphanages. Your support makes a real difference!',
    timestamp: '2 days ago',
  },
  {
    id: 2,
    author: 'Priya Patel',
    authorImage: 'https://picsum.photos/seed/priya/100/100',
    title: 'Upcoming Workshop: Public Speaking',
    content: 'Want to improve your confidence on stage? Join our public speaking workshop this Friday at 4 PM in the main auditorium. Limited seats available!',
    timestamp: '5 days ago',
  },
];

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
        <div className="p-6">
            <div className="flex items-center mb-4">
                <img className="h-12 w-12 rounded-full object-cover" src={post.authorImage} alt={`Avatar of ${post.author}`} />
                <div className="ml-4">
                    <div className="text-lg font-bold text-gray-800">{post.author}</div>
                    <div className="text-sm text-gray-500">{post.timestamp}</div>
                </div>
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">{post.title}</h3>
            <p className="text-gray-600 leading-relaxed">{post.content}</p>
        </div>
    </div>
);

const AddPostModal: React.FC<{ onClose: () => void; onAddPost: (post: Omit<Post, 'id'>) => void; }> = ({ onClose, onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddPost({
            author: 'Current User',
            authorImage: 'https://picsum.photos/seed/user/100/100',
            title,
            content,
            timestamp: 'Just now'
        });
        onClose();
    };
    
    const handleGenerateContent = async () => {
        if (!title) {
            alert("Please enter a title first to give the AI some context.");
            return;
        }
        setIsGenerating(true);
        const prompt = `Write a short, engaging post for a college committee website. The title of the post is "${title}". The tone should be enthusiastic and informative.`;
        const generatedContent = await generateText(prompt);
        setContent(generatedContent);
        setIsGenerating(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-all scale-95 opacity-0 animate-scale-in">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a New Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea id="content" value={content} onChange={e => setContent(e.target.value)} rows={6} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
                    </div>
                     <button type="button" onClick={handleGenerateContent} disabled={isGenerating} className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isGenerating ? 'Generating...' : 'Generate Content with AI'}
                    </button>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Post</button>
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


const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addPost = (post: Omit<Post, 'id'>) => {
        setPosts(prevPosts => [{ ...post, id: Date.now() }, ...prevPosts]);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Community Posts</h1>
                    <p className="mt-2 text-lg text-gray-600">Updates, stories, and news from the committee members.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
                    Create Post
                </button>
            </div>

            {isModalOpen && <AddPostModal onClose={() => setIsModalOpen(false)} onAddPost={addPost} />}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Posts;
