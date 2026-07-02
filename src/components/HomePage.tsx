import * as React from 'react';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from './BeforeAfterSlider';
import ChatbotPage from './ChatbotPage';
import Footer from './Footer';

interface HomePageProps {
  onStartRegistration: () => void;
  onShowDocumentRepository: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartRegistration, onShowDocumentRepository }) => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [showChatbot, setShowChatbot] = React.useState(false);

  const handleShowChatbot = () => {
    setShowChatbot(true);
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  const services = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      title: t('feature1_title'),
      description: t('feature1_description'),
      action: onStartRegistration,
      link: ''
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      title: t('feature4_title'),
      description: "Get instant answers to your GST questions with our AI-powered chatbot.",
      action: handleShowChatbot,
      link: ''
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1583521214690-73421a1829a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      title: t('feature3_title'),
      description: t('feature3_description'),
      action: onShowDocumentRepository,
      link: ''
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      title: 'Compliance Dashboard',
      description: 'Manage all your compliance tasks from one central dashboard.',
      action: () => {},
      link: '/compliance'
    },
  ];

  const testimonials = [
    {
      name: "Ravi Patel",
      role: "Small Business Owner",
      review: "GSTGenie has been a lifesaver for my business. The automated reminders and easy registration process have saved me countless hours.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Priya Sharma",
      role: "Chartered Accountant",
      review: "I recommend GSTGenie to all my clients. The document repository is incredibly useful, and the AI chatbot is surprisingly knowledgeable.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Anil Kumar",
      role: "E-commerce Seller",
      review: "As an online seller, GST compliance can be a headache. GSTGenie makes it simple and straightforward. I couldn't be happier!",
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    },
  ];

  const gstNews = [
    "CBIC issues clarification on GST rates for certain goods and services.",
    "47th GST Council meeting recommends changes in GST rates for various items.",
    "E-invoicing mandatory for businesses with turnover above Rs 10 crore from October 1.",
    "Input tax credit (ITC) to be available only if the same is reflected in GSTR-2B.",
    "GSTN launches new feature to track refund status in real-time.",
  ];

  const faqData = [
    {
      question: "What is GSTGenie and what does it do?",
      answer: "GSTGenie is a comprehensive platform designed to simplify GST compliance for businesses and individuals. It offers services like easy GST registration, automated reminders for deadlines, a secure document repository, and an intelligent AI chatbot to answer your GST-related queries.",
    },
    {
      question: "Who can use GSTGenie?",
      answer: "GSTGenie is designed for everyone, from small business owners and e-commerce sellers to chartered accountants and large enterprises. Our goal is to make GST compliance accessible and hassle-free for all.",
    },
    {
      question: "Is my data secure with GSTGenie?",
      answer: "Absolutely. We prioritize the security and confidentiality of your data. Our platform uses industry-standard encryption and security protocols to ensure your information is always protected.",
    },
    {
      question: "How does the AI chatbot work?",
      answer: "Our AI chatbot is powered by advanced natural language processing models. It has been trained on a vast database of GST laws, rules, and regulations to provide you with accurate and instant answers to your questions.",
    },
  ];

  if (showChatbot) {
    return <ChatbotPage onClose={handleCloseChatbot} />;
  }

  return (
    <div className="font-sans text-primary bg-primary dark:bg-dark-primary dark:text-dark-primary">
      {/* GST News Ticker */}
      <div className="bg-secondary dark:bg-dark-secondary py-2 overflow-hidden">
        <div className="relative flex overflow-x-hidden">
          <div className="py-2 animate-marquee whitespace-nowrap text-primary dark:text-dark-primary">
            {gstNews.map((news, index) => (
              <span key={index} className="text-lg mx-4">{news}</span>
            ))}
          </div>
          <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap text-primary dark:text-dark-primary">
            {gstNews.map((news, index) => (
              <span key={index} className="text-lg mx-4">{news}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-secondary dark:text-dark-secondary">{t('home_hero_title')}</h1>
        <p className="mt-4 text-lg md:text-xl text-secondary dark:text-dark-secondary max-w-3xl mx-auto mb-8">{t('home_hero_subtitle')}</p>
        <button
          onClick={onStartRegistration}
          className="bg-accent hover:bg-opacity-80 text-primary dark:text-dark-primary font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 text-lg inline-flex items-center shadow-lg"
        >
          {t('home_hero_button')}
          <ArrowRight className="h-5 w-5 ml-3" />
        </button>
      </section>

      {/* Key Services Section */}
      <section className="py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-dark-secondary">{t('features_title')}</h2>
          <p className="mt-2 text-lg text-secondary dark:text-dark-secondary">{t('features_subtitle')}</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const cardContent = (
              <div 
                className="group bg-primary dark:bg-dark-primary border border-secondary dark:border-dark-secondary rounded-lg text-center cursor-pointer hover:border-accent transition-all duration-300 transform hover:-translate-y-2 overflow-hidden hover:shadow-2xl hover:shadow-accent/50 h-full flex flex-col"
              >
                <div className="overflow-hidden">
                  <img src={service.imageUrl} alt={service.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"/>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-secondary dark:text-dark-secondary">{service.title}</h3>
                  <p className="mt-2 text-secondary dark:text-dark-secondary">{service.description}</p>
                </div>
              </div>
            );

            if (service.link) {
              return <Link key={index} to={service.link} onClick={service.action}>{cardContent}</Link>;
            } else {
              return <div key={index} onClick={service.action}>{cardContent}</div>;
            }
          })}
        </div>
      </section>

      {/* Before and After Slider Section */}
      <BeforeAfterSlider />

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-secondary dark:bg-dark-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-dark-primary">{t('testimonials_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-primary dark:bg-dark-primary border border-secondary dark:border-dark-secondary rounded-lg p-8 space-y-4">
                <div className="flex items-center space-x-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full"/>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary dark:text-dark-secondary">{testimonial.name}</h4>
                    <p className="text-secondary dark:text-dark-secondary">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-secondary dark:text-dark-secondary">{testimonial.review}</p>
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5" />
                  <Star className="w-5 h-5" />
                  <Star className="w-5 h-5" />
                  <Star className="w-5 h-5" />
                  <Star className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-dark-secondary">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-secondary dark:border-dark-secondary rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-secondary dark:text-dark-secondary">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${openFaq === index ? 'transform rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="p-6 pt-0 text-secondary dark:text-dark-secondary">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
