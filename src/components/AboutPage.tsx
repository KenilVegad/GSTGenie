
import React from 'react';
import { Globe, Users, TrendingUp, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  const teamMembers = [
    { name: 'Alex Johnson', role: 'CEO & Founder', imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg' },
    { name: 'Jane Doe', role: 'Lead Developer', imageUrl: 'https://randomuser.me/api/portraits/women/75.jpg' },
    { name: 'Peter Jones', role: 'UX Designer', imageUrl: 'https://randomuser.me/api/portraits/men/76.jpg' },
  ];

  const values = [
    { title: 'Innovation', description: 'We are committed to continuous innovation to simplify the user experience.', icon: <TrendingUp /> },
    { title: 'Integrity', description: 'We uphold the highest standards of integrity in all of our actions.', icon: <Users /> },
    { title: 'Customer Focus', description: 'Our customers are at the heart of everything we do.', icon: <Globe /> },
    { title: 'Efficiency', description: 'We strive for efficiency in our processes and solutions.', icon: <Zap /> },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white sm:text-5xl">About Our Mission</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Simplifying tax and compliance for everyone.</p>
      </header>

      <section className="mb-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200 mb-10">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h3>
              <p className="text-indigo-500 dark:text-indigo-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
