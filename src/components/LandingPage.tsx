import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Footer from './Footer';

interface LandingPageProps {
  onStartRegistration: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartRegistration }) => {
  const { t } = useLanguage();

  const announcements = [
    { id: 1, text: 'CBIC introduces new electronic verification system for GST returns.', date: '2 days ago' },
    { id: 2, text: 'Deadline for filing GSTR-3B for the month of July extended to August 25th.', date: '1 week ago' },
    { id: 3, text: 'New guidelines issued for claiming input tax credit (ITC).', date: '2 weeks ago' },
  ];

  return (
    <div className="min-h-screen bg-primary text-secondary font-sans flex flex-col">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('landing.title')} <span className="text-accent">Made Simple</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              {t('landing.subtitle')}
            </p>
            <button
              onClick={onStartRegistration}
              className="bg-accent hover:bg-opacity-80 text-primary font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 text-lg inline-flex items-center shadow-lg"
            >
              Start New Registration
              <ArrowRight className="h-5 w-5 ml-3" />
            </button>
          </div>
        </section>

        {/* Key Services & Announcements */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">

              {/* Key Services */}
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-8">Key Services</h2>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="bg-primary rounded-lg border border-gray-700 p-6 hover:border-accent transition-all">
                    <h3 className="text-xl font-semibold mb-2">Digital GST Registration</h3>
                    <p className="text-gray-400 text-sm mb-4">A streamlined digital process for new GST registration and return filing.</p>
                    <button 
                      onClick={onStartRegistration}
                      className="font-semibold text-accent hover:underline flex items-center"
                    >
                      Start Now <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  <div className="bg-primary rounded-lg border border-gray-700 p-6 hover:border-accent transition-all">
                    <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
                    <p className="text-gray-400 text-sm mb-4">24/7 AI-powered assistance for your GST-related questions and guidance.</p>
                    <button 
                      onClick={() => {
                        window.open('https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/09/01/08/20250901081839-TX2K5EY7.json', '_blank', 'width=400,height=600');
                      }}
                      className="font-semibold text-accent hover:underline flex items-center"
                    >
                      Ask a Question <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-primary rounded-lg border border-gray-700 p-6">
                <h2 className="text-3xl font-bold mb-8">Announcements</h2>
                <ul className="space-y-4">
                  {announcements.map(ann => (
                    <li key={ann.id} className="border-b border-gray-700 pb-3">
                      <p className="text-sm text-gray-200">{ann.text}</p>
                      <span className="text-xs text-gray-500">{ann.date}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 font-semibold text-accent hover:underline text-sm">View all</button>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
