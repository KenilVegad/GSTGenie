
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Calendar, CheckCircle, ChevronDown, Clock, FileText, Settings, Shield, TrendingUp, UploadCloud, User as UserIcon, ArrowRight, Info } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import AutoGstReturnGenerator from './AutoGstReturnGenerator';
import Footer from './Footer';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const ComplianceDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { isDark } = useTheme();

  const deadlines = [
    { name: 'GSTR-1 Filing', dueDate: '2023-10-11', status: 'Pending', attached: true, priority: 'High' },
    { name: 'GSTR-3B Filing', dueDate: '2023-10-20', status: 'Pending', attached: false, priority: 'High' },
    { name: 'TDS Return (Q2)', dueDate: '2023-10-31', status: 'Completed', attached: true, priority: 'Medium' },
    { name: 'Professional Tax', dueDate: '2023-11-15', status: 'Pending', attached: false, priority: 'Low' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardView deadlines={deadlines} />;
      case 'Profile':
        return <ProfileView />;
      case 'Calendar':
        return <CalendarView />;
      case 'Notifications':
        return <NotificationsView />;
      case 'Reports':
        return <ReportsView />;
      case 'Security':
        return <SecurityView />;
      case 'Auto GST Return':
        return <AutoGstReturnGenerator />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gray-100 text-gray-800'} font-sans`}>
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8 ml-64">
          <header className="mb-10">
            <h1 className={`text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Compliance Dashboard</h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Your central hub for all compliance activities.</p>
          </header>
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
};

const Sidebar: React.FC<{ activeTab: string, setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();
  const navItems = [
    { name: 'Dashboard', icon: TrendingUp },
    { name: 'Profile', icon: UserIcon },
    { name: 'Calendar', icon: Calendar },
    { name: 'Notifications', icon: Bell },
    { name: 'Reports', icon: FileText },
    { name: 'Security', icon: Shield },
    { name: 'Auto GST Return', icon: FileText },
  ];

  return (
    <aside className={`w-64 ${isDark ? 'bg-gray-900/50' : 'bg-white/60'} backdrop-blur-lg p-6 fixed h-full border-r ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
       <div className="mb-10 text-center">
         <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>GSTGenie</h2>
      </div>
      <nav className="space-y-2">
        {navItems.map(item => (
          <button 
            key={item.name} 
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
              activeTab === item.name
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : `${isDark ? 'text-gray-400 hover:bg-gray-700/50' : 'text-gray-600 hover:bg-gray-200'} hover:text-gray-900 dark:hover:text-white`
            }`}>
            <item.icon className="w-5 h-5 mr-4" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

const DashboardView: React.FC<{ deadlines: any[] }> = ({ deadlines }) => {
    const { isDark } = useTheme();
    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Upcoming Deadlines" value={deadlines.filter(d => d.status === 'Pending').length} icon={Clock} color="indigo" />
                <StatCard title="Tasks Completed" value={deadlines.filter(d => d.status === 'Completed').length} icon={CheckCircle} color="green" />
                <StatCard title="AI-Powered Alerts" value="2" icon={Info} color="purple" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className={`text-2xl font-semibold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>Deadline Status</h2>
                    <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/70'} rounded-lg p-6 space-y-4 border ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
                        {deadlines.map(deadline => (
                            <DeadlineItem key={deadline.name} deadline={deadline} />
                        ))}
                    </div>
                </div>
                <div className="space-y-8">
                    <div className={`bg-gradient-to-br ${isDark ? 'from-purple-600/50 to-indigo-600/50' : 'from-purple-100 to-indigo-100'} p-6 rounded-lg border ${isDark ? 'border-purple-400/30' : 'border-purple-200'}`}>
                        <h3 className={`text-lg font-semibold flex items-center mb-3 ${isDark ? 'text-white' : 'text-purple-900'}`}><Info className="w-5 h-5 mr-3"/>AI-Powered Smart Reminders</h3>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>Based on your filing history, we suggest filing GSTR-1 by the 8th to avoid last-minute issues. Common errors include incorrect HSN codes for your business type.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{title: string, value: string | number, icon: React.ElementType, color: string}> = ({ title, value, icon: Icon, color }) => {
    const { isDark } = useTheme();
    return (
        <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'} border p-6 rounded-lg flex items-center space-x-4`}>
            <div className={`p-3 rounded-full bg-${color}-500/10 text-${color}-500 dark:bg-${color}-500/20 dark:text-${color}-400`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{title}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
            </div>
        </div>
    );
};

const DeadlineItem: React.FC<{ deadline: any }> = ({ deadline }) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const priorityColor = {
      High: 'red',
      Medium: 'yellow',
      Low: 'green'
  }[deadline.priority] || 'gray';

  return (
    <div className={`${isDark ? 'bg-gray-700/50 border-gray-600/50 hover:border-blue-500/50' : 'bg-white border-gray-200 hover:border-blue-300'} p-4 rounded-lg border transition-all`}>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
            <div className={`w-2 h-10 rounded-full bg-${priorityColor}-500 mr-4`}></div>
            <div>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{deadline.name}</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Due: {deadline.dueDate}</p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
           <span className={`px-3 py-1 text-xs font-semibold rounded-full ${deadline.status === 'Completed' ? `bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300` : `bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300`}`}>
            {deadline.status}
          </span>
          <ChevronDown className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'} transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isOpen && (
        <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-600/50' : 'border-gray-200'} space-y-4 animate-fade-in-down`}>
            <div>
                <h4 className={`font-semibold mb-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Checklist & Guidance</h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} list-disc list-inside`}>
                    <li>Review and confirm all sales invoices.</li>
                    <li>Ensure HSN codes are correct.</li>
                </ul>
            </div>
          <div className="flex justify-between items-center">
            <div>
              <h4 className={`font-semibold mb-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Attachments</h4>
              {deadline.attached ? (
                <div className="flex items-center text-sm text-green-600 dark:text-green-400 cursor-pointer hover:underline">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>invoices_sept.csv</span>
                </div>
              ) : (
                <button className="flex items-center text-sm text-indigo-600 dark:text-blue-400 hover:text-indigo-500 dark:hover:text-blue-300 transition-colors">
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Attach Documents
                </button>
              )}
            </div>
            <div>
                <h4 className={`font-semibold mb-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Update Status</h4>
                 <select defaultValue={deadline.status} className={`${isDark ? 'bg-gray-600/50 border-gray-500/50' : 'bg-white border-gray-300'} text-sm rounded-md px-3 py-1 border focus:ring-indigo-500 focus:border-indigo-500`}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProfileView: React.FC = () => {
    const { isDark } = useTheme();
    return (
        <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'} p-8 rounded-lg max-w-4xl mx-auto border`}>
            <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>User Profile & Customization</h2>
            <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Startup Name" placeholder="e.g., Acme Inc."/>
                    <InputField label="PAN" placeholder="e.g., ABCDE1234F"/>
                    <InputField label="GST Number" placeholder="e.g., 22AAAAA0000A1Z5"/>
                    <InputField label="Business Type" placeholder="e.g., Private Limited"/>
                </div>
                <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Tax Filing Frequency</label>
                    <select className={`w-full ${isDark ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white border-gray-300'} border rounded-md px-3 py-3 focus:ring-indigo-500 focus:border-indigo-500`}>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Annually</option>
                    </select>
                </div>
                <div>
                    <InputField label="Custom Reminder" placeholder="e.g., Professional Tax due on 15th"/>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-indigo-600/40">Save Settings</button>
            </form>
        </div>
    );
};

const InputField: React.FC<{label:string, placeholder: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({label, placeholder, value, onChange}) => {
    const { isDark } = useTheme();
    return (
        <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{label}</label>
            <input type="text" placeholder={placeholder} value={value} onChange={onChange} className={`w-full ${isDark ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white border-gray-300'} border rounded-md px-3 py-3 focus:ring-indigo-500 focus:border-indigo-500`} />
        </div>
    );
}

const CalendarView: React.FC = () => {
  const { isDark } = useTheme();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const event = {
          'summary': 'GSTR-1 Filing Reminder',
          'description': 'Reminder to file your GSTR-1 for the current period.',
          'start': {
            'dateTime': '2024-07-10T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
          },
          'end': {
            'dateTime': '2024-07-10T10:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10},
            ],
          },
        };

        await axios.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', event, {
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
          }
        });
        alert('Event created successfully!');
      } catch (error) {
        console.error('Error creating event:', error);
        alert('Failed to create event.');
      }
    },
    scope: 'https://www.googleapis.com/auth/calendar.events',
  });

  return (
    <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'} p-8 rounded-lg border`}>
      <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Automated Calendar Integration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className={`${isDark ? 'bg-gray-700/50 border-gray-600/50' : 'bg-gray-50 border-gray-200'} p-8 rounded-lg border`}>
          <h3 className={`font-semibold text-xl mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Connect Your Calendar</h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8`}>Automatically sync all compliance deadlines to your favorite calendar. Never miss a due date again.</p>
          <div className="space-y-4">
            <button
              onClick={() => login()}
              className={`w-full font-bold py-3 px-4 rounded-md flex items-center justify-center transition-all shadow-lg bg-red-600 hover:bg-red-700 text-white hover:shadow-red-600/40'}`}>
              <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-3" />
              Connect Google Calendar
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center transition-all shadow-lg hover:shadow-blue-600/40">
              <img src="https://www.microsoft.com/favicon.ico" alt="Outlook" className="h-5 w-5 mr-3" />
              Connect Outlook Calendar
            </button>
          </div>
        </div>
        <div className={`${isDark ? 'bg-gray-700/50 border-gray-600/50' : 'bg-gray-50 border-gray-200'} p-8 rounded-lg border`}>
          <h3 className={`font-semibold text-xl mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Included Deadlines</h3>
          <ul className="space-y-4">
            {[ 'GSTR-1 Filing', 'GSTR-3B Filing', 'Income Tax Return', 'TDS Return', 'Professional Tax', 'MCA Filings'].map(d => (
              <li key={d} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}><CheckCircle className="h-5 w-5 text-green-500 mr-4" /><span>{d}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const NotificationsView: React.FC = () => {
  const { isDark } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className={`${isDark ? 'bg-gray-800/50' : 'bg-white/70'} p-8 rounded-lg max-w-3xl mx-auto border ${isDark ? 'border-gray-700/50' : 'border-gray-200'}`}>
      <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Notification Settings</h2>
      <div className="space-y-8">
        <NotificationGroup title="Channels">
          <ToggleSwitch label="Email Notifications" enabled={emailNotifications} onToggle={() => setEmailNotifications(!emailNotifications)} />
          <ToggleSwitch label="SMS Notifications" enabled={smsNotifications} onToggle={() => setSmsNotifications(!smsNotifications)} />
          <ToggleSwitch label="Push Notifications" enabled={pushNotifications} onToggle={() => setPushNotifications(!pushNotifications)} />
        </NotificationGroup>
        <NotificationGroup title="Preferences">
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Coming soon: Customize the types of notifications you receive.</p>
        </NotificationGroup>
      </div>
    </div>
  );
};

const NotificationGroup: React.FC<{title:string, children: React.ReactNode}> = ({title, children}) => {
    const { isDark } = useTheme();
    return (
        <div className={`${isDark ? 'bg-gray-700/30 border-gray-600/50' : 'bg-gray-50 border-gray-200'} p-6 rounded-lg border`}>
            <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <div className="space-y-4">{children}</div>
        </div>
    );
};

const ToggleSwitch: React.FC<{label:string, enabled:boolean, onToggle:()=>void}> = ({label, enabled, onToggle}) => {
    const { isDark } = useTheme();
    return (
        <label className="flex items-center justify-between cursor-pointer">
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
            <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={enabled} onChange={onToggle} />
                <div className={`w-11 h-6 ${isDark ? 'bg-gray-600' : 'bg-gray-200'} rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] ${isDark ? 'after:bg-white after:border-gray-300' : 'after:bg-white after:border-gray-300'} after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600`}></div>
            </div>
        </label>
    );
};

const ReportsView: React.FC = () => {
    const { isDark } = useTheme();
    return (
        <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'} p-8 rounded-lg border`}>
            <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Reporting & Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`${isDark ? 'bg-gray-700/50 border-gray-600/50' : 'bg-gray-50 border-gray-200'} p-6 rounded-lg border`}>
                    <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Filing History</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex justify-between items-center"><span>GSTR-1 (Sept)</span><span className="font-semibold text-green-600 dark:text-green-400">Filed on time</span></li>
                        <li className="flex justify-between items-center"><span>GSTR-3B (Sept)</span><span className="font-semibold text-green-600 dark:text-green-400">Filed on time</span></li>
                        <li className="flex justify-between items-center"><span>TDS Return (Q1)</span><span className="font-semibold text-red-600 dark:text-red-400">Filed 2 days late</span></li>
                        <li className="flex justify-between items-center"><span>GSTR-1 (Aug)</span><span className="font-semibold text-green-600 dark:text-green-400">Filed on time</span></li>
                    </ul>
                </div>
                <div className={`${isDark ? 'bg-gray-700/50 border-gray-600/50' : 'bg-gray-50 border-gray-200'} p-8 rounded-lg border`}>
                    <h3 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Filing Performance</h3>
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <p className="text-5xl font-bold text-green-600 dark:text-green-400">95%</p>
                            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>On-time filing rate</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SecurityView: React.FC = () => {
    const { isDark } = useTheme();
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [roleBasedAccess, setRoleBasedAccess] = useState(false);

    return (
        <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white border-gray-200'} p-8 rounded-lg max-w-2xl mx-auto border`}>
            <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Security & Privacy</h2>
            <div className="space-y-6">
                <SecurityOption 
                    title="Two-Factor Authentication (2FA)" 
                    description="Add an extra layer of security to your account." 
                    enabled={twoFactorEnabled}
                    onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)}
                />
                <SecurityOption 
                    title="Role-Based Access" 
                    description="Manage who can see and do what in your team." 
                    enabled={roleBasedAccess}
                    onToggle={() => setRoleBasedAccess(!roleBasedAccess)}
                />
                {roleBasedAccess && (
                    <div className="flex justify-center mt-4">
                        <Link to="/role-management" className="text-indigo-600 dark:text-indigo-400 hover:underline">Go to Role Management</Link>
                    </div>
                )}
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'} text-center mt-8`}>Your data is encrypted and stored securely using industry-standard protocols.</p>
        </div>
    );
};

const SecurityOption: React.FC<{title:string, description:string, enabled:boolean, onToggle:()=>void}> = ({title, description, enabled, onToggle}) => {
    const { isDark } = useTheme();
    return (
        <div className={`flex items-center justify-between ${isDark ? 'bg-gray-700/30 border-gray-600/50' : 'bg-gray-50 border-gray-200'} p-6 rounded-lg border`}>
            <div>
                <h3 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mt-1`}>{description}</p>
            </div>
            <button 
                onClick={onToggle}
                className={`${enabled ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} px-4 py-2 rounded-md text-sm font-semibold text-white transition-colors shadow-lg ${enabled ? 'hover:shadow-green-600/40' : 'hover:shadow-indigo-600/40'}`}>
                {enabled ? 'Enabled' : 'Enable'}
            </button>
        </div>
    );
};

export default ComplianceDashboard;