
import React from 'react';
import { DonationIcon } from './Icons';

const Donations: React.FC = () => {
  const goal = 100000;
  const current = 65000;
  const progress = (current / goal) * 100;

  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4">
            <DonationIcon className="w-20 h-20 text-primary mx-auto"/>
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Support Our Cause</h1>
            <p className="text-lg text-gray-600">
                Your contributions help us organize events, run social initiatives, and make a positive impact on our college community.
                Every donation, big or small, is deeply appreciated.
            </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Annual Fundraiser Drive</h2>
            <p className="text-gray-600 mb-6">We are currently raising funds for upgrading the student common room facilities.</p>
            
            <div className="space-y-2">
                <div className="flex justify-between font-bold text-gray-700">
                    <span>Raised: ₹{current.toLocaleString('en-IN')}</span>
                    <span>Goal: ₹{goal.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-secondary h-4 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-right text-sm text-gray-500">{progress.toFixed(0)}% of our goal</p>
            </div>

            <div className="mt-8 text-center">
                 <button className="w-full md:w-auto px-12 py-4 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary text-lg transition-transform hover:scale-105">
                    Donate Now
                </button>
                <p className="text-xs text-gray-500 mt-3">(You will be redirected to a secure payment gateway)</p>
            </div>
        </div>
    </div>
  );
};

export default Donations;
