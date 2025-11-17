
document.addEventListener('DOMContentLoaded', () => {
    // SUPABASE CLIENT SETUP
    const supabaseUrl = 'https://tygqwnndhncikuvwblnc.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJzdXBhYmFzZSIsInJlZiI6InR5Z3F3bm5kaG5jaWt1dndibG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMTMzODgsImV4cCI6MjA3ODg4OTM4OH0.2Aitr7aIt-JlmCfzMbpwbh7iWobgoeiOolxqqkRaPzA';
    const supabase = self.supabase.createClient(supabaseUrl, supabaseAnonKey);

    // GEMINI CLIENT SETUP
    let ai;
    const API_KEY = process.env.API_KEY;
    if (API_KEY && window.GoogleGenerativeAI) {
        ai = new window.GoogleGenerativeAI({ apiKey: API_KEY });
    } else {
        console.warn("API_KEY not found or GoogleGenerativeAI library not loaded. AI features will be disabled.");
    }
    
    // DOM ELEMENT REFERENCES
    const authContainer = document.getElementById('auth-container');
    const appContainer = document.getElementById('app-container');

    // APP STATE
    let state = {
        session: null,
        currentPage: 'Dashboard',
        isSidebarOpen: false,
        posts: [
            { id: 1, author: 'Aarav Sharma', authorImage: 'https://picsum.photos/seed/aarav/100/100', title: 'Successful Charity Drive!', content: 'A huge thank you to everyone who donated and volunteered. We successfully raised over ₹50,000 for local orphanages. Your support makes a real difference!', timestamp: '2 days ago' },
            { id: 2, author: 'Priya Patel', authorImage: 'https://picsum.photos/seed/priya/100/100', title: 'Upcoming Workshop: Public Speaking', content: 'Want to improve your confidence on stage? Join our public speaking workshop this Friday at 4 PM in the main auditorium. Limited seats available!', timestamp: '5 days ago' },
        ],
        announcements: [
            { id: 1, title: 'General Body Meeting Postponed', content: 'The General Body Meeting scheduled for this Wednesday has been postponed to next Monday at 5:00 PM in the main hall. We apologize for any inconvenience.', date: '2024-07-28', level: 'critical' },
            { id: 2, title: 'Call for Volunteers: Annual Fest', content: 'We are looking for enthusiastic volunteers for the upcoming annual college fest. Sign up at the committee room by this Friday.', date: '2024-07-26', level: 'warning' },
            { id: 3, title: 'New Committee Website Launch', content: 'We are excited to launch our new website! Explore the new features and let us know your feedback.', date: '2024-07-25', level: 'info' },
        ],
        achievements: [
            { id: 1, title: 'Best Committee Award 2023', description: 'Recognized for outstanding contributions to student life and successful event management throughout the academic year.', imageUrl: 'https://picsum.photos/seed/award1/400/300', date: 'March 2023' },
            { id: 2, title: 'Inter-College Fest Winners', description: 'Secured the first position in the annual inter-college cultural festival, competing against 20 other institutions.', imageUrl: 'https://picsum.photos/seed/award2/400/300', date: 'December 2022' },
        ],
        events: [
            { id: 1, name: 'Annual Tech Symposium', description: 'A full-day event with guest speakers, workshops, and a hackathon.', date: '2024-08-15', time: '9:00 AM - 5:00 PM', location: 'Main Auditorium', imageUrl: 'https://picsum.photos/seed/event1/400/250' },
            { id: 2, name: 'Cultural Night 2024', description: 'Experience a vibrant evening of music, dance, and drama performances.', date: '2024-09-05', time: '6:00 PM onwards', location: 'Open Air Theatre', imageUrl: 'https://picsum.photos/seed/event2/400/250' },
        ],
        tasks: [
            { id: 1, title: 'Design fest poster', description: 'Create a vibrant poster for the upcoming tech fest.', assignee: 'Priya', status: 'To Do' },
            { id: 2, title: 'Book auditorium', description: 'Finalize booking for the main auditorium.', assignee: 'Aarav', status: 'In Progress' },
            { id: 3, title: 'Send guest invitations', description: 'Email invitations to all guest speakers.', assignee: 'Rohan', status: 'Done' },
        ],
        chatMessages: [
            { id: 1, sender: 'Priya', senderImage: 'https://picsum.photos/seed/priya/100/100', text: 'Hey team, reminder about the meeting tomorrow at 10 AM.', timestamp: '10:30 AM', isCurrentUser: false },
            { id: 2, sender: 'You', senderImage: 'https://picsum.photos/seed/user/100/100', text: 'Perfect, I will be there.', timestamp: '10:32 AM', isCurrentUser: true },
        ]
    };

    // --- ICONS ---
    const Icons = {
        Dashboard: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
        Post: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`,
        Announcement: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.148-6.136a1.76 1.76 0 011.164-2.288l5.396-1.877a1.76 1.76 0 012.288 1.164l2.148 6.136a1.76 1.76 0 01-1.164 2.288l-5.396 1.877a1.76 1.76 0 01-2.288-1.164z" /></svg>`,
        Achievement: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>`,
        Donation: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
        Event: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
        Task: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`,
        Chat: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>`,
        Menu: `<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>`,
        Close: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`,
        Logout: `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>`,
        Sparkles: `<svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M19 3v4M17 5h4M14 11l-1.5-1.5M10 15l-1.5-1.5M12 21v-4M21 12h-4M12 3v4M3 12h4" /></svg>`
    };
    
    // --- TEMPLATING / RENDERING FUNCTIONS ---
    
    // Main App Shell
    const renderAppShell = () => {
        appContainer.innerHTML = `
            ${renderNavbar()}
            <main class="flex-1 flex flex-col overflow-hidden">
                <header class="bg-white shadow-sm p-4 flex items-center justify-between lg:hidden">
                    <h1 class="text-xl font-bold text-primary">Parivartan</h1>
                    <button id="menu-toggle-btn" class="text-gray-600 focus:outline-none">
                        ${Icons.Menu}
                    </button>
                </header>
                <div id="page-content" class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                   <div id="dashboard-page" class="page"></div>
                   <div id="posts-page" class="page"></div>
                   <div id="announcements-page" class="page"></div>
                   <div id="achievements-page" class="page"></div>
                   <div id="donations-page" class="page"></div>
                   <div id="events-page" class="page"></div>
                   <div id="tasks-page" class="page"></div>
                   <div id="chat-page" class="page"></div>
                </div>
            </main>
        `;
        addShellEventListeners();
        renderCurrentPage();
    };

    // Navbar
    const renderNavbar = () => {
        const navItems = [
            { label: 'Dashboard', icon: Icons.Dashboard },
            { label: 'Posts', icon: Icons.Post },
            { label: 'Announcements', icon: Icons.Announcement },
            { label: 'Achievements', icon: Icons.Achievement },
            { label: 'Donations', icon: Icons.Donation },
            { label: 'Events', icon: Icons.Event },
            { label: 'Tasks', icon: Icons.Task },
            { label: 'Chat', icon: Icons.Chat },
        ];

        const sidebarClasses = `
            fixed lg:relative inset-y-0 left-0
            transform ${state.isSidebarOpen ? 'translateX(0)' : '-translate-x-full'} lg:translate-x-0
            transition-transform duration-300 ease-in-out
            z-30 w-64 bg-indigo-800 text-white
            flex flex-col shadow-lg
        `;

        return `
            ${state.isSidebarOpen ? `<div id="sidebar-overlay" class="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"></div>` : ''}
            <nav id="navbar" class="${sidebarClasses}">
                <div class="flex items-center justify-between p-4 border-b border-indigo-700">
                    <h1 class="text-2xl font-bold">Parivartan</h1>
                    <button id="sidebar-close-btn" class="lg:hidden text-white">
                        ${Icons.Close}
                    </button>
                </div>
                <ul class="flex-1 px-2 py-4">
                    ${navItems.map(item => `
                        <li>
                            <a href="#" data-page="${item.label}" class="nav-item flex items-center p-3 my-1 rounded-lg transition-colors ${state.currentPage === item.label ? 'bg-primary text-white shadow-md' : 'text-gray-300 hover:bg-indigo-700 hover:text-white'}">
                                ${item.icon}
                                <span class="ml-3 font-medium">${item.label}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
                <div class="p-4 border-t border-indigo-700">
                    <a href="#" id="logout-btn" class="flex items-center p-3 my-1 rounded-lg transition-colors text-gray-300 hover:bg-red-600 hover:text-white">
                      ${Icons.Logout}
                      <span class="ml-3 font-medium">Logout</span>
                    </a>
                    <p class="text-sm text-indigo-300 text-center mt-4">&copy; 2024 Parivartan Committee</p>
                </div>
            </nav>
        `;
    };
    
    const pageRenderers = {
        'Dashboard': renderDashboard,
        'Posts': renderPosts,
        'Announcements': renderAnnouncements,
        'Achievements': renderAchievements,
        'Donations': renderDonations,
        'Events': renderEvents,
        'Tasks': renderTasks,
        'Chat': renderChat
    };

    function renderCurrentPage() {
        // Hide all pages
        document.querySelectorAll('#page-content .page').forEach(p => p.classList.remove('active'));
        // Show current page
        const currentPageId = `${state.currentPage.toLowerCase()}-page`;
        const currentPageEl = document.getElementById(currentPageId);
        if (currentPageEl) {
            const renderer = pageRenderers[state.currentPage];
            if(renderer) renderer(currentPageEl);
            currentPageEl.classList.add('active');
        }

        // Update navbar active state
        document.querySelectorAll('.nav-item').forEach(item => {
            if (item.dataset.page === state.currentPage) {
                item.classList.add('bg-primary', 'text-white', 'shadow-md');
                item.classList.remove('text-gray-300', 'hover:bg-indigo-700');
            } else {
                item.classList.remove('bg-primary', 'text-white', 'shadow-md');
                item.classList.add('text-gray-300', 'hover:bg-indigo-700');
            }
        });
    }

    // --- PAGE SPECIFIC RENDERERS ---

    function renderDashboard(container) {
        container.innerHTML = `
            <div class="space-y-8">
                <header>
                    <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">Committee Dashboard</h1>
                    <p class="mt-2 text-lg text-gray-600">Welcome back, ${state.session.user.email}! Here's a quick overview.</p>
                </header>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-primary">
                        <div class="flex-shrink-0">${Icons.Event}</div>
                        <div><p class="text-sm text-gray-500 font-medium">Upcoming Events</p><p class="text-2xl font-bold text-gray-800">${state.events.length}</p></div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-secondary">
                        <div class="flex-shrink-0">${Icons.Task}</div>
                        <div><p class="text-sm text-gray-500 font-medium">Active Tasks</p><p class="text-2xl font-bold text-gray-800">${state.tasks.filter(t=> t.status !== 'Done').length}</p></div>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-yellow-500">
                        <div class="flex-shrink-0">${Icons.Post}</div>
                        <div><p class="text-sm text-gray-500 font-medium">Recent Posts</p><p class="text-2xl font-bold text-gray-800">${state.posts.length}</p></div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderPosts(container) {
        container.innerHTML = `
             <div class="space-y-8">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">Community Posts</h1>
                        <p class="mt-2 text-lg text-gray-600">Updates, stories, and news from the committee members.</p>
                    </div>
                    <button id="create-post-btn" class="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
                        Create Post
                    </button>
                </div>
                <div id="posts-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${state.posts.map(post => `
                        <div class="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300">
                            <div class="p-6">
                                <div class="flex items-center mb-4">
                                    <img class="h-12 w-12 rounded-full object-cover" src="${post.authorImage}" alt="Avatar of ${post.author}" />
                                    <div class="ml-4">
                                        <div class="text-lg font-bold text-gray-800">${post.author}</div>
                                        <div class="text-sm text-gray-500">${post.timestamp}</div>
                                    </div>
                                </div>
                                <h3 class="text-xl font-semibold text-primary mb-2">${post.title}</h3>
                                <p class="text-gray-600 leading-relaxed">${post.content}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.getElementById('create-post-btn').addEventListener('click', showPostModal);
    }
    
    function renderAnnouncements(container) {
        const getLevelClasses = (level) => {
            switch (level) {
                case 'critical': return { bg: 'bg-red-50 border-red-500', iconBg: 'bg-red-500', text: 'text-red-800', title: 'text-red-900' };
                case 'warning': return { bg: 'bg-yellow-50 border-yellow-500', iconBg: 'bg-yellow-500', text: 'text-yellow-800', title: 'text-yellow-900' };
                default: return { bg: 'bg-blue-50 border-blue-500', iconBg: 'bg-blue-500', text: 'text-blue-800', title: 'text-blue-900' };
            }
        };

        container.innerHTML = `
            <div class="space-y-8">
                 <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">Announcements</h1>
                        <p class="mt-2 text-lg text-gray-600">Important notices and updates from the committee.</p>
                    </div>
                    <button id="create-announcement-btn" class="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
                        New Announcement
                    </button>
                </div>
                <div class="space-y-6">
                    ${state.announcements.map(ann => {
                        const classes = getLevelClasses(ann.level);
                        return `
                        <div class="p-6 rounded-lg shadow-md border-l-4 ${classes.bg}">
                            <div class="flex">
                                <div class="flex-shrink-0 p-3 rounded-full ${classes.iconBg}">
                                    <div class="h-6 w-6 text-white">${Icons.Announcement}</div>
                                </div>
                                <div class="ml-4">
                                    <h3 class="text-lg font-bold ${classes.title}">${ann.title}</h3>
                                    <p class="mt-2 text-sm ${classes.text}">${ann.content}</p>
                                    <p class="mt-3 text-xs font-semibold ${classes.text}">${new Date(ann.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        document.getElementById('create-announcement-btn').addEventListener('click', showAnnouncementModal);
    }
    
    // other page renderers...
    function renderAchievements(container) {
         container.innerHTML = `
            <div class="space-y-8">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">Our Achievements</h1>
                        <p class="mt-2 text-lg text-gray-600">Celebrating our milestones and successes.</p>
                    </div>
                    <button id="create-achievement-btn" class="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
                        Add Achievement
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${state.achievements.map(ach => `
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden group">
                            <div class="relative">
                                <img class="w-full h-56 object-cover" src="${ach.imageUrl}" alt="${ach.title}" />
                                <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                <div class="absolute bottom-0 left-0 p-4">
                                    <span class="text-white bg-secondary px-3 py-1 rounded-full text-sm font-semibold">${ach.date}</span>
                                </div>
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">${ach.title}</h3>
                                <p class="text-gray-600">${ach.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.getElementById('create-achievement-btn').addEventListener('click', showAchievementModal);
    }

    function renderDonations(container) {
        const goal = 100000;
        const current = 65000;
        const progress = (current / goal) * 100;
        container.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <div class="text-center space-y-4">
                    <div class="w-20 h-20 text-primary mx-auto">${Icons.Donation}</div>
                    <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">Support Our Cause</h1>
                    <p class="text-lg text-gray-600">
                        Your contributions help us organize events, run social initiatives, and make a positive impact on our college community.
                    </p>
                </div>
                <div class="bg-white p-8 rounded-xl shadow-lg mt-12">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Annual Fundraiser Drive</h2>
                    <div class="space-y-2">
                        <div class="flex justify-between font-bold text-gray-700">
                            <span>Raised: ₹${current.toLocaleString('en-IN')}</span>
                            <span>Goal: ₹${goal.toLocaleString('en-IN')}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-4">
                            <div class="bg-secondary h-4 rounded-full transition-all duration-1000 ease-out" style="width: ${progress}%"></div>
                        </div>
                        <p class="text-right text-sm text-gray-500">${progress.toFixed(0)}% of our goal</p>
                    </div>
                    <div class="mt-8 text-center">
                        <button class="w-full md:w-auto px-12 py-4 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-lg transition-transform hover:scale-105">
                            Donate Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderEvents(container) {
        container.innerHTML = `
            <div class="space-y-8">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">Upcoming Events</h1>
                        <p class="mt-2 text-lg text-gray-600">Join us for our exciting lineup of events.</p>
                    </div>
                    <button id="create-event-btn" class="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
                        Create Event
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${state.events.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => {
                        const eventDate = new Date(event.date);
                        const day = eventDate.toLocaleDateString('en-US', { day: '2-digit' });
                        const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                        return `
                        <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <img class="w-full h-48 object-cover" src="${event.imageUrl}" alt="${event.name}" />
                            <div class="p-6 flex-1 flex flex-col">
                                <div class="flex items-start justify-between">
                                    <div>
                                        <h3 class="text-xl font-bold text-gray-800 mb-2">${event.name}</h3>
                                        <div class="text-sm text-gray-500 space-y-1">
                                            <p><strong>Time:</strong> ${event.time}</p>
                                            <p><strong>Location:</strong> ${event.location}</p>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-center justify-center bg-gray-100 p-3 rounded-md ml-4 text-center">
                                        <span class="text-2xl font-bold text-primary">${day}</span>
                                        <span class="text-sm font-semibold text-gray-600">${month}</span>
                                    </div>
                                </div>
                                <p class="text-gray-600 mt-4 flex-1">${event.description}</p>
                                <button class="mt-6 w-full px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">Register</button>
                            </div>
                        </div>
                        `
                    }).join('')}
                </div>
            </div>
        `;
        document.getElementById('create-event-btn').addEventListener('click', showEventModal);
    }
    
    function renderTasks(container) {
        const columns = {
            'To Do': { color: 'border-red-500', tasks: state.tasks.filter(t => t.status === 'To Do') },
            'In Progress': { color: 'border-yellow-500', tasks: state.tasks.filter(t => t.status === 'In Progress') },
            'Done': { color: 'border-green-500', tasks: state.tasks.filter(t => t.status === 'Done') },
        };
        
        container.innerHTML = `
            <div class="space-y-8">
                <div class="flex justify-between items-center">
                    <div>
                        <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">Task Board</h1>
                        <p class="mt-2 text-lg text-gray-600">Organize, assign, and track all committee tasks.</p>
                    </div>
                    <button id="create-task-btn" class="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700">
                        New Task
                    </button>
                </div>
                <div id="task-board" class="flex flex-col md:flex-row gap-6">
                    ${Object.entries(columns).map(([title, col]) => `
                        <div class="bg-gray-100 rounded-lg p-4 w-full md:w-1/3">
                            <h3 class="font-bold text-lg mb-4 pb-2 border-b-4 ${col.color}">${title} (${col.tasks.length})</h3>
                            <div>
                                ${col.tasks.map(task => `
                                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
                                        <h4 class="font-bold text-gray-800">${task.title}</h4>
                                        <p class="text-sm text-gray-600 my-2">${task.description}</p>
                                        <span class="text-xs font-medium text-gray-500">Assignee: ${task.assignee}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.getElementById('create-task-btn').addEventListener('click', showTaskModal);
    }

    function renderChat(container) {
        container.innerHTML = `
            <div class="flex flex-col h-[85vh] bg-white rounded-2xl shadow-lg">
                <header class="p-4 border-b">
                    <h1 class="text-xl font-bold text-gray-800">Committee Group Chat</h1>
                </header>
                <div id="chat-messages" class="flex-1 p-6 space-y-6 overflow-y-auto">
                    ${state.chatMessages.map(msg => `
                        <div class="flex items-end gap-3 ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}">
                            ${!msg.isCurrentUser ? `<img src="${msg.senderImage}" alt="${msg.sender}" class="w-8 h-8 rounded-full"/>` : ''}
                            <div class="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${msg.isCurrentUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}">
                                ${!msg.isCurrentUser ? `<p class="text-xs font-bold text-primary mb-1">${msg.sender}</p>` : ''}
                                <p>${msg.text}</p>
                                <p class="text-xs mt-1 ${msg.isCurrentUser ? 'text-indigo-200' : 'text-gray-500'}">${msg.timestamp}</p>
                            </div>
                             ${msg.isCurrentUser ? `<img src="${msg.senderImage}" alt="${msg.sender}" class="w-8 h-8 rounded-full"/>` : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="p-4 border-t bg-gray-50 rounded-b-2xl">
                    <form id="chat-form" class="flex items-center gap-4">
                        <input id="chat-input" type="text" placeholder="Type a message..." class="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"/>
                        <button type="submit" class="px-6 py-2 bg-primary text-white font-semibold rounded-full shadow-md hover:bg-indigo-700">Send</button>
                    </form>
                </div>
            </div>
        `;
        
        const chatMessagesDiv = document.getElementById('chat-messages');
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
        
        document.getElementById('chat-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('chat-input');
            const text = input.value.trim();
            if (text) {
                const newMessage = {
                    id: Date.now(),
                    sender: 'You',
                    senderImage: 'https://picsum.photos/seed/user/100/100',
                    text,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isCurrentUser: true,
                };
                state.chatMessages.push(newMessage);
                input.value = '';
                renderChat(container);
            }
        });
    }


    // --- MODAL FUNCTIONS ---

    function showModal(contentHTML) {
        const modal = document.createElement('div');
        modal.id = 'modal-backdrop';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-2xl transform transition-all animate-scale-in">
                ${contentHTML}
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'modal-backdrop' || e.target.classList.contains('modal-cancel-btn')) {
                closeModal();
            }
        });
    }

    function closeModal() {
        const modal = document.getElementById('modal-backdrop');
        if (modal) {
            modal.remove();
        }
    }

    function showPostModal() {
        showModal(`
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Create a New Post</h2>
            <form id="post-form" class="space-y-4">
                <div>
                    <label for="post-title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="post-title" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label for="post-content" class="block text-sm font-medium text-gray-700">Content</label>
                    <textarea id="post-content" rows="6" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required></textarea>
                </div>
                <button type="button" id="generate-content-btn" class="w-full flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium text-white bg-secondary hover:bg-green-600 disabled:bg-gray-400">
                    ${Icons.Sparkles}
                    <span id="generate-btn-text">Generate Content with AI</span>
                </button>
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" class="modal-cancel-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary text-white rounded-md">Post</button>
                </div>
            </form>
        `);
        document.getElementById('post-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;
            state.posts.unshift({ id: Date.now(), author: 'Current User', authorImage: 'https://picsum.photos/seed/user/100/100', title, content, timestamp: 'Just now' });
            renderCurrentPage();
            closeModal();
        });
        document.getElementById('generate-content-btn').addEventListener('click', handleAIGenerate);
    }

    function showAnnouncementModal() {
        showModal(`
            <h2 class="text-2xl font-bold mb-6 text-gray-800">New Announcement</h2>
            <form id="announcement-form" class="space-y-4">
                <div>
                    <label for="announcement-title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" id="announcement-title" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label for="announcement-content" class="block text-sm font-medium text-gray-700">Content</label>
                    <textarea id="announcement-content" rows="4" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required></textarea>
                </div>
                 <div>
                    <label for="announcement-level" class="block text-sm font-medium text-gray-700">Level</label>
                    <select id="announcement-level" class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md">
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" class="modal-cancel-btn px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary text-white rounded-md">Publish</button>
                </div>
            </form>
        `);
         document.getElementById('announcement-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('announcement-title').value;
            const content = document.getElementById('announcement-content').value;
            const level = document.getElementById('announcement-level').value;
            state.announcements.unshift({ id: Date.now(), title, content, level, date: new Date().toISOString().split('T')[0] });
            renderCurrentPage();
            closeModal();
        });
    }
    
    // Other modal launchers...
    function showAchievementModal() {
        showModal(`
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Add Achievement</h2>
            <form id="achievement-form" class="space-y-4">
                <input name="title" placeholder="Title" class="w-full p-2 border rounded" required />
                <textarea name="description" placeholder="Description" class="w-full p-2 border rounded" required></textarea>
                <input name="date" placeholder="Date (e.g., March 2023)" class="w-full p-2 border rounded" required />
                <input name="imageUrl" placeholder="Image URL (Optional)" class="w-full p-2 border rounded" />
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" class="modal-cancel-btn px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary text-white rounded">Add</button>
                </div>
            </form>
        `);
        document.getElementById('achievement-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newAchievement = {
                id: Date.now(),
                title: formData.get('title'),
                description: formData.get('description'),
                date: formData.get('date'),
                imageUrl: formData.get('imageUrl') || `https://picsum.photos/seed/${Date.now()}/400/300`
            };
            state.achievements.unshift(newAchievement);
            renderCurrentPage();
            closeModal();
        });
    }

    function showEventModal() {
        showModal(`
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Create Event</h2>
            <form id="event-form" class="space-y-4">
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="name" placeholder="Event Name" class="w-full p-2 border rounded" required />
                    <input name="date" type="date" class="w-full p-2 border rounded" required />
                    <input name="time" placeholder="Time (e.g., 9:00 AM)" class="w-full p-2 border rounded" required />
                    <input name="location" placeholder="Location" class="w-full p-2 border rounded" required />
                </div>
                <textarea name="description" placeholder="Description" class="w-full p-2 border rounded" required></textarea>
                <input name="imageUrl" placeholder="Image URL (Optional)" class="w-full p-2 border rounded" />
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" class="modal-cancel-btn px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary text-white rounded">Create</button>
                </div>
            </form>
        `);
        document.getElementById('event-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            state.events.push({
                id: Date.now(),
                name: formData.get('name'),
                date: formData.get('date'),
                time: formData.get('time'),
                location: formData.get('location'),
                description: formData.get('description'),
                imageUrl: formData.get('imageUrl') || `https://picsum.photos/seed/${Date.now()}/400/250`,
            });
            renderCurrentPage();
            closeModal();
        });
    }

    function showTaskModal() {
        showModal(`
            <h2 class="text-2xl font-bold mb-6 text-gray-800">New Task</h2>
            <form id="task-form" class="space-y-4">
                <input name="title" placeholder="Title" class="w-full p-2 border rounded" required />
                <textarea name="description" placeholder="Description" class="w-full p-2 border rounded" required></textarea>
                <input name="assignee" placeholder="Assignee" class="w-full p-2 border rounded" required />
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" class="modal-cancel-btn px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-primary text-white rounded">Create</button>
                </div>
            </form>
        `);
        document.getElementById('task-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            state.tasks.unshift({
                id: Date.now(),
                title: formData.get('title'),
                description: formData.get('description'),
                assignee: formData.get('assignee'),
                status: 'To Do',
            });
            renderCurrentPage();
            closeModal();
        });
    }


    // --- AI ---
    async function handleAIGenerate() {
        const titleInput = document.getElementById('post-title');
        const contentTextarea = document.getElementById('post-content');
        const generateBtn = document.getElementById('generate-content-btn');
        const btnText = document.getElementById('generate-btn-text');

        if (!titleInput.value) {
            alert("Please enter a title first to give the AI some context.");
            return;
        }

        if (!ai) {
             contentTextarea.value = "AI features are disabled. Please configure your API key.";
             return;
        }
        
        generateBtn.disabled = true;
        btnText.textContent = 'Generating...';

        try {
            const prompt = `Write a short, engaging post for a college committee website. The title of the post is "${titleInput.value}". The tone should be enthusiastic and informative.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            contentTextarea.value = response.text;
        } catch (error) {
            console.error("Error generating text with Gemini:", error);
            contentTextarea.value = `Error: ${error.message}`;
        } finally {
             generateBtn.disabled = false;
             btnText.textContent = 'Generate Content with AI';
        }
    }


    // --- AUTHENTICATION ---

    const renderAuthPage = () => {
        authContainer.innerHTML = `
            <div class="min-h-screen bg-background flex flex-col justify-center items-center p-4">
                <div class="text-center mb-8">
                    <h1 class="text-5xl font-extrabold text-primary tracking-tight">Parivartan</h1>
                    <p class="text-text-secondary text-lg mt-2">Committee Collaboration Hub</p>
                </div>
                <div id="auth-form-container" class="w-full max-w-md bg-surface rounded-2xl shadow-xl p-8 space-y-6">
                    <!-- Form will be injected here -->
                </div>
            </div>
        `;
        renderAuthForm(true); // Start with login view
    };
    
    const renderAuthForm = (isLoginView) => {
        const formContainer = document.getElementById('auth-form-container');
        if (!formContainer) return;
        
        formContainer.innerHTML = `
             <h2 class="text-2xl font-bold text-center text-text-primary">
              ${isLoginView ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <div id="auth-error" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm"></div>
            <div id="auth-message" class="hidden bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md text-sm"></div>
            <form id="auth-form" class="space-y-4">
                ${!isLoginView ? `
                <div>
                  <label class="block text-sm font-medium text-text-secondary">Full Name</label>
                  <input type="text" name="fullName" required class="mt-1 block w-full px-3 py-2 border rounded-md" placeholder="John Doe"/>
                </div>` : ''}
                <div>
                    <label class="block text-sm font-medium text-text-secondary">Email Address</label>
                    <input type="email" name="email" required class="mt-1 block w-full px-3 py-2 border rounded-md" placeholder="you@example.com"/>
                </div>
                <div>
                    <label class="block text-sm font-medium text-text-secondary">Password</label>
                    <input type="password" name="password" required class="mt-1 block w-full px-3 py-2 border rounded-md" placeholder="••••••••"/>
                </div>
                <button type="submit" id="auth-submit-btn" class="w-full flex justify-center py-3 px-4 border rounded-md text-white bg-primary hover:bg-indigo-700 disabled:bg-indigo-400">
                    <span id="auth-submit-text">${isLoginView ? 'Login' : 'Register'}</span>
                    <div id="auth-spinner" class="hidden animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                </button>
            </form>
            <p class="text-center text-sm text-text-secondary">
              ${isLoginView ? "Don't have an account?" : "Already have an account?"}
              <button id="auth-toggle" class="font-medium text-primary hover:text-indigo-500 ml-1">
                ${isLoginView ? 'Sign up' : 'Sign in'}
              </button>
            </p>
        `;

        document.getElementById('auth-toggle').addEventListener('click', () => renderAuthForm(!isLoginView));
        document.getElementById('auth-form').addEventListener('submit', (e) => handleAuthSubmit(e, isLoginView));
    };

    const handleAuthSubmit = async (e, isLoginView) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const fullName = isLoginView ? null : form.fullName.value;

        setAuthLoading(true);

        if (isLoginView) {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setAuthError(error.message);
        } else {
            const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
            if (error) {
                setAuthError(error.message);
            } else {
                setAuthMessage('Registration successful! Please check your email to confirm your account.');
            }
        }
        setAuthLoading(false);
    };

    function setAuthLoading(isLoading) {
        const submitBtn = document.getElementById('auth-submit-btn');
        const submitText = document.getElementById('auth-submit-text');
        const spinner = document.getElementById('auth-spinner');
        if (submitBtn) submitBtn.disabled = isLoading;
        if (submitText) submitText.style.display = isLoading ? 'none' : 'block';
        if (spinner) spinner.style.display = isLoading ? 'block' : 'none';
        
        // Clear messages when starting a new action
        if(isLoading) {
            setAuthError(null);
            setAuthMessage(null);
        }
    }
    
    function setAuthError(message) {
        const errorDiv = document.getElementById('auth-error');
        if (!errorDiv) return;
        errorDiv.textContent = message;
        errorDiv.style.display = message ? 'block' : 'none';
    }

    function setAuthMessage(message) {
        const messageDiv = document.getElementById('auth-message');
        if (!messageDiv) return;
        messageDiv.textContent = message;
        messageDiv.style.display = message ? 'block' : 'none';
    }
    
    const handleLogout = async () => {
        await supabase.auth.signOut();
    };


    // --- EVENT LISTENERS ---

    const addShellEventListeners = () => {
        // Navbar navigation
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                state.currentPage = link.dataset.page;
                state.isSidebarOpen = false; // Close sidebar on nav
                renderAppShell(); // Re-render to update sidebar state and active page
            });
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });

        // Mobile menu toggle
        const menuToggleBtn = document.getElementById('menu-toggle-btn');
        const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        
        const toggleSidebar = () => {
             state.isSidebarOpen = !state.isSidebarOpen;
             renderAppShell(); // Re-render to show/hide sidebar
        }

        if(menuToggleBtn) menuToggleBtn.addEventListener('click', toggleSidebar);
        if(sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', toggleSidebar);
        if(sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);
    };


    // --- INITIALIZATION ---

    const init = () => {
        supabase.auth.onAuthStateChange((_event, session) => {
            state.session = session;
            if (session) {
                authContainer.innerHTML = '';
                authContainer.classList.add('hidden');
                appContainer.classList.remove('hidden');
                appContainer.classList.add('flex');
                renderAppShell();
            } else {
                appContainer.innerHTML = '';
                appContainer.classList.add('hidden');
                appContainer.classList.remove('flex');
                authContainer.classList.remove('hidden');
                renderAuthPage();
            }
        });
    };

    init();
});
