import React, { useState, useEffect } from 'react';
import { User, Edit3, Save, Briefcase, MapPin, Building, Mail, Phone, Globe, Bell } from 'lucide-react';
import { db } from '../firebase'; // Assuming you have firebase initialized and db exported from this file
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import Footer from './Footer';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Akshat Sharma',
    designation: 'Director',
    company: 'AS Tech Solutions Pvt. Ltd.',
    gstin: '07ABCDE1234F1Z5',
    address: '7A, Business Bay, Industrial Area, Sector 2',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302012',
    email: 'akshat.sharma@astech.com',
    phone: '+91-9876543210',
    website: 'astechsolutions.com',
    userId: 'sampleUser' // Hardcoded for now, you should get this from your auth context
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
    whatsapp: false,
  });

  useEffect(() => {
    const userDocRef = doc(db, 'users', profile.userId);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setNotificationSettings(doc.data().notifications);
      }
    });
    return () => unsubscribe();
  }, [profile.userId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the updated profile data to a backend
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = async (channel: string) => {
    const newSettings = { 
      ...notificationSettings, 
      [channel]: !notificationSettings[channel as keyof typeof notificationSettings] 
    };
    setNotificationSettings(newSettings);
    const userDocRef = doc(db, 'users', profile.userId);
    await setDoc(userDocRef, { notifications: newSettings }, { merge: true });
  };

  const InputField = ({ label, name, value, icon: Icon, isEditing }: any) => (
    <div className="flex items-center space-x-4">
      <Icon className="h-5 w-5 text-gray-400" />
      <div>
        <label className="text-sm text-gray-500 dark:text-gray-400">{label}</label>
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleInputChange}
            className="text-gray-900 dark:text-gray-100 font-semibold bg-transparent border-b-2 border-blue-200 focus:outline-none focus:border-blue-500"
          />
        ) : (
          <p className="text-gray-900 dark:text-gray-100 font-semibold">{value}</p>
        )}
      </div>
    </div>
  );

  const NotificationToggle = ({ label, channel, enabled }: any) => (
    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
      <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <button 
        onClick={() => handleNotificationToggle(channel)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          enabled ? 'bg-blue-600' : 'bg-gray-400'
        }`}>
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`} />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white rounded-full p-3 mr-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-blue-100">{profile.designation}</p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-8">
            {/* Notification Settings */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <Bell className="h-6 w-6 mr-3 text-indigo-500" />
                Notification Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NotificationToggle label="Email Notifications" channel="email" enabled={notificationSettings.email} />
                <NotificationToggle label="SMS Alerts" channel="sms" enabled={notificationSettings.sms} />
                <NotificationToggle label="Push Notifications" channel="push" enabled={notificationSettings.push} />
                <NotificationToggle label="WhatsApp Messages" channel="whatsapp" enabled={notificationSettings.whatsapp} />
              </div>
            </div>

            {/* Company Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <Briefcase className="h-6 w-6 mr-3 text-indigo-500" />
                Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Company Name" name="company" value={profile.company} icon={Building} isEditing={isEditing} />
                <div className="flex items-center space-x-4">
                  <img src="https://img.icons8.com/color/48/gst.png" alt="GST Icon" className="h-6 w-6"/>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">GSTIN</label>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold tracking-wider">{profile.gstin}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-indigo-500" />
                Registered Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Address" name="address" value={profile.address} icon={Building} isEditing={isEditing} />
                <InputField label="City" name="city" value={profile.city} icon={Building} isEditing={isEditing} />
                <InputField label="State" name="state" value={profile.state} icon={Building} isEditing={isEditing} />
                <InputField label="Pincode" name="pincode" value={profile.pincode} icon={Building} isEditing={isEditing} />
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <Mail className="h-6 w-6 mr-3 text-indigo-500" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Email Address" name="email" value={profile.email} icon={Mail} isEditing={isEditing} />
                <InputField label="Phone Number" name="phone" value={profile.phone} icon={Phone} isEditing={isEditing} />
                <InputField label="Website" name="website" value={profile.website} icon={Globe} isEditing={isEditing} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
