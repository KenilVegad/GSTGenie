
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail, Phone, Send } from 'lucide-react';

const SupportPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const faqs = [
    { question: 'What is the purpose of this platform?', answer: 'This platform is designed to streamline tax and compliance processes, making it easier to manage your financial obligations.' },
    { question: 'How do I upload a document?', answer: 'You can upload documents from the Integrated Document Repository page by clicking the \'Add New Document\' button.' },
    { question: 'Can I export my data?', answer: 'Yes, you can export your data as a CSV file from the document repository page using the \'Export as CSV\' button.' },
    { question: 'Is my data secure?', answer: 'We take data security seriously. All your data is encrypted and stored securely.' },
  ];

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Your message has been sent! We will get back to you shortly.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white sm:text-5xl">Support Center</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">How can we help you today?</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-6 flex items-center"><HelpCircle className="mr-3 text-indigo-500" /> FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <button onClick={() => handleAccordionClick(index)} className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 dark:text-white">
                  {faq.question}
                  <ChevronDown className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {activeIndex === index && (
                  <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-6 flex items-center"><Mail className="mr-3 text-indigo-500" /> Contact Us</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600" required></textarea>
              </div>
              <button type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                <Send className="mr-2" /> Send Message
              </button>
            </form>
            <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
              <p>You can also reach us at:</p>
              <a href="tel:+1234567890" className="flex items-center justify-center mt-2 text-indigo-600 hover:underline"><Phone className="mr-2" /> +1 (234) 567-890</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
