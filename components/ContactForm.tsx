import React, { useState, useEffect, useRef } from 'react';
import { submitLead } from '../lib/lead-submission';
import { formState } from '../lib/form-state';
import { PhoneCall, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

declare global {
    interface Window {
        intlTelInput: any;
    }
}

export const ContactForm: React.FC = () => {
    const [isLocalSubmitted, setIsLocalSubmitted] = useState(formState.getSubmitted());
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState<'callback' | 'visit'>('callback');
    const [consentChecked, setConsentChecked] = useState(true);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const itiRef = useRef<any>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        const unsubscribe = formState.subscribe((val) => {
            setIsLocalSubmitted(val);
        });

        if (phoneInputRef.current && window.intlTelInput) {
            itiRef.current = window.intlTelInput(phoneInputRef.current, {
                utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                initialCountry: "in",
                separateDialCode: true,
                preferredCountries: ["in", "us", "ae", "gb"]
            });
            // Fix a11y: Remove dangling aria-activedescendant pointing to unmounted listbox
            const flagBtn = phoneInputRef.current.parentElement?.querySelector('.iti__selected-flag');
            if (flagBtn) {
                flagBtn.removeAttribute('aria-activedescendant');
            }
        }

        return () => {
            unsubscribe();
            if (itiRef.current) {
                itiRef.current.destroy();
                itiRef.current = null;
            }
        };
    }, []);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        
        if (!formData.email.trim()) {
            newErrors.email = "Email Address is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Mobile Number is required";
        } else if (formData.phone.replace(/\D/g, '').length < 7 && itiRef.current && !itiRef.current.isValidNumber()) {
            newErrors.phone = "Please enter a valid mobile number";
        }

        if (!consentChecked) {
            newErrors.consent = "Please authorize communication consent to proceed";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    const handleSubmit = async (submitType: 'callback' | 'visit') => {
        setActionType(submitType);
        if (!validate()) return;

        setLoading(true);
        try {
            const countryData = itiRef.current?.getSelectedCountryData() || {};
            const submissionData = {
                ...formData,
                country_code: countryData.dialCode,
                country_name: countryData.name,
                project: "NEOLIV GRAND FOREST PRIVÉ",
                action_type: submitType === 'callback' ? "Request a Call Back" : "Schedule a Site Visit"
            };
            await submitLead(submissionData);
            formState.setSubmitted(true);
            setFormData({ name: '', phone: '', email: '' });
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="Contact" className="pt-16 pb-24 md:py-24 bg-navy-950 relative overflow-hidden border-t border-white/5 scroll-mt-20 md:scroll-mt-24">
            <div className="absolute inset-0 bg-grain opacity-[0.03] mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1d417f]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                    
                    {/* Left Column: Heading & Copy (Section 15: Final Call to Action) */}
                    <div className="lg:col-span-6 text-center lg:text-left space-y-4 sm:space-y-6">
                        <span className="eyebrow-label inline-block text-gold-400 font-sans text-[11px] sm:text-xs uppercase tracking-[0.35em] font-semibold">
                            Your Privé Life Awaits
                        </span>
                        <h2 className="section-heading font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium leading-tight">
                            Some Addresses Are Owned — <br />
                            <span className="text-gold-400 italic">A Few Are Experienced.</span>
                        </h2>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto lg:mx-0"></div>
                        <p className="body-large font-sans text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
                            Discover a life where mornings begin with nature, weekends feel endless and space becomes the ultimate luxury.
                        </p>
                        <div className="pt-1">
                            <p className="font-serif text-white text-base tracking-wider uppercase font-semibold">
                                NeoLiv Grand Forest Privé
                            </p>
                            <p className="font-sans text-gold-400 text-xs tracking-widest uppercase font-medium">
                                Khopoli, Mumbai <span className="numeric">3.0</span>
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Form Container (Lead Form Content) */}
                    <div className="lg:col-span-6">
                        <div className="bg-navy-900 border border-white/10 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl relative min-h-[440px] flex flex-col justify-center">
                            {isLocalSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold-400/10 border border-gold-400/30 rounded-full flex items-center justify-center mb-5 sm:mb-6 shadow-2xl shadow-gold-400/20">
                                        <CheckCircle2 className="text-gold-400" size={36} />
                                    </div>
                                    <h3 className="card-heading font-serif text-2xl md:text-3xl text-white mb-2 sm:mb-3 tracking-wide uppercase font-medium">
                                        Thank You
                                    </h3>
                                    <p className="body-regular font-sans text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-sm font-light">
                                        Your enquiry for <strong className="text-white">NeoLiv Grand Forest Privé</strong> has been received. Our Privé Advisor will connect with you shortly.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={(e) => { e.preventDefault(); handleSubmit('callback'); }} className="space-y-4 w-full">
                                    {/* Lead Form Header & Intro */}
                                    <div className="text-left pb-1">
                                        <h3 className="card-heading font-serif text-xl sm:text-2xl text-white font-medium mb-1">
                                            Your Enquiry Begins Here
                                        </h3>
                                        <p className="body-small font-sans text-gray-300/80 text-xs sm:text-sm font-light leading-relaxed">
                                            Share your details and our Privé Advisor will connect with you to arrange a personalised conversation about Grand Forest Privé.
                                        </p>
                                    </div>
                                    
                                    {/* Full Name - text-base on mobile prevents iOS Safari auto-zoom */}
                                    <div className="space-y-1">
                                        <label className="form-label font-sans text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium ml-1">
                                            Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`w-full font-sans bg-navy-950/70 border ${errors.name ? 'border-red-500/60' : 'border-white/10'} rounded-xl px-4 py-3.5 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400/60 transition-all text-base sm:text-sm`}
                                            placeholder="Enter your name"
                                        />
                                        {errors.name && <p className="font-sans text-[10px] text-red-400 flex items-center gap-1 mt-0.5"><AlertCircle size={10} /> {errors.name}</p>}
                                    </div>
                                    
                                    {/* Mobile Number - text-base on mobile prevents iOS Safari auto-zoom */}
                                    <div className="space-y-1">
                                        <label className="form-label font-sans text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium ml-1">
                                            Mobile Number*
                                        </label>
                                        <div className="relative">
                                            <input
                                                ref={phoneInputRef}
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full font-sans numeric bg-navy-950/70 border ${errors.phone ? 'border-red-500/60' : 'border-white/10'} rounded-xl pr-4 py-3.5 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400/60 transition-all text-base sm:text-sm font-medium`}
                                                placeholder="98765 43210"
                                            />
                                        </div>
                                        {errors.phone && <p className="font-sans text-[10px] text-red-400 flex items-center gap-1 mt-0.5"><AlertCircle size={10} /> {errors.phone}</p>}
                                    </div>

                                    {/* Email Address - text-base on mobile prevents iOS Safari auto-zoom */}
                                    <div className="space-y-1">
                                        <label className="form-label font-sans text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-medium ml-1">
                                            Email Address*
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full font-sans bg-navy-950/70 border ${errors.email ? 'border-red-500/60' : 'border-white/10'} rounded-xl px-4 py-3.5 sm:py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400/60 transition-all text-base sm:text-sm`}
                                            placeholder="Enter your email address"
                                        />
                                        {errors.email && <p className="font-sans text-[10px] text-red-400 flex items-center gap-1 mt-0.5"><AlertCircle size={10} /> {errors.email}</p>}
                                    </div>

                                    {/* Mandatory Consent Checkbox */}
                                    <div className="pt-2">
                                        <label className="flex items-start gap-3 cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={consentChecked}
                                                onChange={(e) => {
                                                    setConsentChecked(e.target.checked);
                                                    if (errors.consent) {
                                                        setErrors(prev => {
                                                            const next = { ...prev };
                                                            delete next.consent;
                                                            return next;
                                                        });
                                                    }
                                                }}
                                                className="mt-1 rounded border-white/20 bg-navy-950 text-gold-400 focus:ring-gold-400/40 w-4 h-4 cursor-pointer accent-amber-400"
                                            />
                                            <span className="body-small font-sans text-[11px] sm:text-xs text-gray-300 leading-relaxed font-light">
                                                Your information will remain private and will only be used to assist with your enquiry.
                                            </span>
                                        </label>
                                        {errors.consent && <p className="font-sans text-[10px] text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={10} /> {errors.consent}</p>}
                                    </div>

                                    {/* Dual Action CTAs */}
                                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {/* Primary: Enquire Now */}
                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={() => handleSubmit('callback')}
                                            className="w-full bg-gradient-to-r from-amber-400 via-gold-400 to-amber-500 hover:from-amber-300 hover:to-gold-300 text-navy-950 font-sans font-semibold py-3.5 sm:py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-gold-400/20 active:scale-95 text-xs uppercase tracking-[0.14em] disabled:opacity-50 cursor-pointer min-h-[48px]"
                                        >
                                            {loading && actionType === 'callback' ? (
                                                <div className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <PhoneCall size={15} className="shrink-0" />
                                                    <span>Enquire Now</span>
                                                </>
                                            )}
                                        </button>

                                        {/* Secondary: Schedule Visit */}
                                        <button
                                            type="button"
                                            disabled={loading}
                                            onClick={() => handleSubmit('visit')}
                                            className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-sans font-semibold py-3.5 sm:py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-xs uppercase tracking-[0.14em] disabled:opacity-50 cursor-pointer min-h-[48px]"
                                        >
                                            {loading && actionType === 'visit' ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <Calendar size={15} className="shrink-0" />
                                                    <span>Schedule Visit</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    
                                    <p className="font-sans text-[9px] text-gray-400 text-center pt-2 uppercase tracking-widest font-normal">
                                        Strict Privacy • Verified MahaRERA Registered Development
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
