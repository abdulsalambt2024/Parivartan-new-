
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Member } from '../types';

const members: Member[] = [
    { name: 'Aarav', avatarUrl: 'https://picsum.photos/seed/aarav/100/100' },
    { name: 'Priya', avatarUrl: 'https://picsum.photos/seed/priya/100/100' },
    { name: 'Rohan', avatarUrl: 'https://picsum.photos/seed/rohan/100/100' },
    { name: 'Sana', avatarUrl: 'https://picsum.photos/seed/sana/100/100' },
];

const currentUser: Member = { name: 'You', avatarUrl: 'https://picsum.photos/seed/user/100/100' };

const initialMessages: ChatMessage[] = [
  { id: 1, sender: 'Priya', senderImage: members[1].avatarUrl, text: 'Hey team, just a reminder about the meeting tomorrow at 10 AM.', timestamp: '10:30 AM', isCurrentUser: false },
  { id: 2, sender: 'Rohan', senderImage: members[2].avatarUrl, text: 'Got it, Priya! I have the presentation ready.', timestamp: '10:31 AM', isCurrentUser: false },
  { id: 3, sender: 'You', senderImage: currentUser.avatarUrl, text: 'Perfect, I will be there. Anything I need to bring?', timestamp: '10:32 AM', isCurrentUser: true },
];

const MessageBubble: React.FC<{ msg: ChatMessage }> = ({ msg }) => {
    const isUser = msg.isCurrentUser;
    return (
        <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && <img src={msg.senderImage} alt={msg.sender} className="w-8 h-8 rounded-full"/>}
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                {!isUser && <p className="text-xs font-bold text-primary mb-1">{msg.sender}</p>}
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${isUser ? 'text-indigo-200' : 'text-gray-500'}`}>{msg.timestamp}</p>
            </div>
            {isUser && <img src={msg.senderImage} alt={msg.sender} className="w-8 h-8 rounded-full"/>}
        </div>
    );
};

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if(chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            sender: currentUser.name,
            senderImage: currentUser.avatarUrl,
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isCurrentUser: true,
        };
        
        setMessages(prev => [...prev, userMessage]);
        setNewMessage('');
        
        // Simulate a reply
        setTimeout(() => {
            const randomMember = members[Math.floor(Math.random() * members.length)];
            const replyMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: randomMember.name,
                senderImage: randomMember.avatarUrl,
                text: 'Sounds good!',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isCurrentUser: false,
            };
            setMessages(prev => [...prev, replyMessage]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[85vh] bg-white rounded-2xl shadow-lg">
            <header className="p-4 border-b">
                <h1 className="text-xl font-bold text-gray-800">Committee Group Chat</h1>
            </header>
            <div ref={chatContainerRef} className="flex-1 p-6 space-y-6 overflow-y-auto">
                {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
            </div>
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
                <form onSubmit={handleSendMessage} className="flex items-center gap-4">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
