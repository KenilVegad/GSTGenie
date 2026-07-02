
import React, { useState, useRef } from 'react';
import { ShieldCheck, ArrowRight, ChevronLeft } from 'lucide-react';

interface OTPVerificationPageProps {
  onVerify: () => void;
  onBack: () => void;
}

const OTPVerificationPage: React.FC<OTPVerificationPageProps> = ({ onVerify, onBack }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    // In a real app, you would verify the OTP against a server.
    // For this example, we'll just simulate a successful verification.
    if (enteredOtp.length === 6) {
        onVerify();
    } else {
        alert("Please enter the complete 6-digit OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        
        <div className="text-center mb-8">
          <ShieldCheck className="mx-auto h-12 w-12 text-green-500 dark:text-green-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">OTP Verification</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Please enter the 6-digit code sent to your mobile number and email address.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-14 text-center text-2xl font-semibold border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    />
                ))}
            </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify OTP <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Didn't receive the code? <button className="font-medium text-blue-600 hover:text-blue-500">Resend OTP</button></p>
            <button onClick={onBack} className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white flex items-center justify-center w-full">
                <ChevronLeft className="h-4 w-4 mr-1"/> Back to Registration
            </button>
        </div>

      </div>
    </div>
  );
};

export default OTPVerificationPage;
