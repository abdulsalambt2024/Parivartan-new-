
import React, { useState } from 'react';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form validation and API calls here.
    // For this simulation, we'll just log the user in successfully.
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-primary tracking-tight">Parivartan</h1>
        <p className="text-text-secondary text-lg mt-2">Committee Collaboration Hub</p>
      </div>
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl p-8 space-y-6 transform transition-all hover:shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-text-primary">
          {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div>
              <label className="block text-sm font-medium text-text-secondary">Full Name</label>
              <input type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" placeholder="John Doe"/>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-text-secondary">Email Address</label>
            <input type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" placeholder="you@example.com"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Password</label>
            <input type="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" placeholder="••••••••"/>
          </div>

          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform hover:scale-105">
            {isLoginView ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-primary hover:text-indigo-500 ml-1">
            {isLoginView ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
