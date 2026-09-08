import React, { useState } from 'react';
import { X, Phone, Loader2 } from 'lucide-react';

export const EnquiryForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [otp, setOtp] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for Verify
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1000);
  };

  return (
    <>
      {/* Sticky Bottom Bar Trigger (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-[#1d417f] text-white p-3 flex justify-between items-center md:hidden z-40 border-t border-white/20">
        <a href="tel:+919999999999" className="flex items-center gap-2 font-medium">
          <Phone className="w-4 h-4" /> Call Now
        </a>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white text-[#1d417f] px-6 py-2 rounded-full font-semibold text-sm shadow-md"
        >
          Enquire Now
        </button>
      </div>

      {/* Side / Bottom Form Overlay */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute bottom-0 md:bottom-auto md:top-1/2 left-0 md:left-1/2 w-full md:w-[400px] bg-white md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl rounded-t-3xl shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-y-0 md:scale-100' : 'translate-y-full md:scale-95'}`}>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black bg-gray-100 rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="text-center mb-2">
                  <h3 className="font-serif text-2xl text-[#1d417f] font-semibold mb-2">Book an Appointment</h3>
                  <p className="text-sm text-gray-500">Leave your details and we will get back to you.</p>
                </div>
                
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Full Name*" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d6ba43] focus:ring-1 focus:ring-[#d6ba43] transition-all"
                />
                
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Email Address*" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d6ba43] focus:ring-1 focus:ring-[#d6ba43] transition-all"
                />
                
                <input 
                  type="tel" 
                  name="phone"
                  required
                  placeholder="Mobile Number*" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d6ba43] focus:ring-1 focus:ring-[#d6ba43] transition-all"
                />
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3.5 bg-[#1d417f] text-white rounded-lg font-semibold hover:bg-[#153060] transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Submit Details
                </button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleVerifyOTP} className="flex flex-col gap-5 text-center">
                <h3 className="font-serif text-2xl text-[#1d417f] font-semibold mb-2">Verify OTP</h3>
                <p className="text-sm text-gray-500 mb-2">Enter the OTP sent to your mobile number.</p>
                
                <input 
                  type="text" 
                  name="otp"
                  required
                  maxLength={6}
                  placeholder="Enter 6-digit OTP" 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#d6ba43] text-center tracking-widest text-lg font-semibold transition-all"
                />
                
                <button 
                  type="submit" 
                  disabled={loading || otp.length < 4}
                  className="w-full py-3.5 bg-[#d6ba43] text-white rounded-lg font-semibold hover:bg-[#c4aa3d] transition-colors flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Verify & Submit
                </button>
                <button type="button" onClick={() => setStep('form')} className="text-sm text-gray-500 underline mt-2">
                  Change Number
                </button>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="font-serif text-2xl text-[#1d417f] font-semibold mb-3">Thank You!</h3>
                <p className="text-gray-600 leading-relaxed">
                  We appreciate your interest in our project. Our team will contact you very soon.
                </p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="mt-8 px-8 py-3 bg-[#1d417f] text-white rounded-full font-medium hover:bg-[#153060] transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
