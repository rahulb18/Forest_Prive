import React, { useState, useEffect, useRef } from 'react';
import { submitLead } from '../lib/lead-submission';
import { formState } from '../lib/form-state';
import { modalState } from '../lib/modal-state';
import { X, PhoneCall, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

interface EnquiryModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
    isOpen: propIsOpen,
    onClose: propOnClose,
    title: propTitle
}) => {
    const [globalOpen, setGlobalOpen] = useState(false);
    const [globalTitle, setGlobalTitle] = useState("Grand Forest Privé");
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

    // Subscribe to global modalState
    useEffect(() => {
        const unsubscribeModal = modalState.subscribe((open, t) => {
            setGlobalOpen(open);
            if (t) setGlobalTitle(t);
        });
        return unsubscribeModal;
    }, []);

    const isOpen = propIsOpen !== undefined ? propIsOpen : globalOpen;
    const title = propTitle !== undefined ? propTitle : globalTitle;

    const handleClose = () => {
        if (propOnClose) {
            propOnClose();
        }
        modalState.close();
    };

    // Lock body scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const unsubscribe = formState.subscribe((val) => {
            setIsLocalSubmitted(val);
        });

        let timerId: any = null;
        if (isOpen && phoneInputRef.current && window.intlTelInput) {
            if (itiRef.current) {
                itiRef.current.destroy();
                itiRef.current = null;
            }
            timerId = setTimeout(() => {
                if (phoneInputRef.current && window.intlTelInput) {
                    itiRef.current = window.intlTelInput(phoneInputRef.current, {
                        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                        initialCountry: "in",
                        separateDialCode: true,
                        preferredCountries: ["in", "us", "ae", "gb"]
                    });
                }
            }, 50);
        }

        return () => {
            unsubscribe();
            if (timerId) clearTimeout(timerId);
            if (itiRef.current) {
                itiRef.current.destroy();
                itiRef.current = null;
            }
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Mobile number required";
        } else if (formData.phone.replace(/\D/g, '').length < 7 && itiRef.current && !itiRef.current.isValidNumber()) {
            newErrors.phone = "Invalid number";
        }
        if (!consentChecked) {
            newErrors.consent = "Please authorize communication consent";
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
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3.5 sm:p-6 overflow-hidden">
            {/* Full Viewport Dark Backdrop */}
            <div className="fixed inset-0 bg-navy-950/95 backdrop-blur-xl z-0" onClick={handleClose} />

            {/* Modal Dialog Card */}
            <div className="relative z-10 bg-navy-900 border border-gold-400/30 w-full max-w-lg rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.98)] max-h-[92dvh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                
                {/* Header with High-Contrast Touch Target Close Button */}
                <div className="pt-6 pb-3 px-6 flex flex-col items-center relative border-b border-white/5 shrink-0">
                    <button
                        onClick={handleClose}
                        className="absolute right-4 sm:right-5 top-4 sm:top-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-gold-400 hover:text-navy-950 text-gray-300 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 z-20 border border-white/10"
                        aria-label="Close modal"
                    >
                        <X size={18} className="sm:w-5 sm:h-5" />
                    </button>
                    <img 
                        src="assets/logo.png" 
                        alt="NeoLiv" 
                        className="h-6 sm:h-7 w-auto mb-2 opacity-95 brightness-110 drop-shadow-md" 
                    />
                    <h3 className="font-serif text-sm sm:text-base md:text-lg tracking-[0.22em] text-white uppercase font-bold leading-tight whitespace-nowrap">
                        GRAND FOREST <span className="text-gold-400">PRIVÉ</span>
                    </h3>
                </div>

                {/* Modal Body with hidden scrollbar */}
                <div className="p-5 sm:p-7 pt-3 sm:pt-4 overflow-y-auto hide-scrollbar flex-1">
                    {isLocalSubmitted ? (
                        <div className="text-center py-6 sm:py-8 animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gold-400/10 text-gold-400 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-2xl shadow-gold-400/20 border border-gold-400/30">
                                <CheckCircle2 size={36} />
                            </div>
                            <h3 className="text-white font-serif text-xl sm:text-2xl tracking-[0.1em] mb-3 uppercase">Thank You</h3>
                            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm max-w-xs mx-auto font-light">
                                Our luxury property advisors have received your request for Grand Forest Privé and will reach out to you shortly.
                            </p>
                            <button
                                onClick={handleClose}
                                className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 sm:py-3.5 bg-gold-400 text-navy-950 rounded-full hover:brightness-110 transition-all text-xs tracking-widest uppercase font-bold cursor-pointer shadow-xl"
                            >
                                Close Window
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-400 text-[10px] sm:text-[11px] uppercase tracking-widest mb-3.5 text-center">
                                Connect with our luxury property advisors
                            </p>
                            <form className="space-y-3 sm:space-y-3.5" onSubmit={(e) => { e.preventDefault(); handleSubmit('callback'); }}>
                                <div className="space-y-1">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="FULL NAME*"
                                        className={`w-full bg-navy-950/70 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-2.5 sm:py-3 px-3.5 text-white focus:border-gold-400/50 focus:outline-none transition-all placeholder:text-gray-500 text-sm sm:text-xs tracking-wider font-medium`}
                                    />
                                    {errors.name && <p className="text-[9px] text-red-400 flex items-center gap-1 ml-1"><AlertCircle size={8} /> {errors.name}</p>}
                                </div>

                                <div className="space-y-1">
                                    <input
                                        type="tel"
                                        name="phone"
                                        ref={phoneInputRef}
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="98765 43210"
                                        className={`w-full bg-navy-950/70 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-2.5 sm:py-3 px-3.5 text-white focus:border-gold-400/50 focus:outline-none transition-all placeholder:text-gray-500 text-sm sm:text-xs tracking-wider font-medium`}
                                    />
                                    {errors.phone && <p className="text-[9px] text-red-400 flex items-center gap-1 ml-1"><AlertCircle size={8} /> {errors.phone}</p>}
                                </div>

                                <div className="space-y-1">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="EMAIL ADDRESS*"
                                        className={`w-full bg-navy-950/70 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl py-2.5 sm:py-3 px-3.5 text-white focus:border-gold-400/50 focus:outline-none transition-all placeholder:text-gray-500 text-sm sm:text-xs tracking-wider font-medium`}
                                    />
                                    {errors.email && <p className="text-[9px] text-red-400 flex items-center gap-1 ml-1"><AlertCircle size={8} /> {errors.email}</p>}
                                </div>

                                <div className="pt-0.5">
                                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={consentChecked}
                                            onChange={(e) => {
                                                setConsentChecked(e.target.checked);
                                                if (errors.consent) {
                                                    setErrors(prev => {
                                                        const next = { ...prev };
                                                        delete next[consentChecked ? 'consent' : ''];
                                                        return next;
                                                    });
                                                }
                                            }}
                                            className="mt-0.5 rounded border-white/20 bg-navy-950 text-gold-400 focus:ring-gold-400/40 w-3.5 h-3.5 cursor-pointer accent-amber-400 shrink-0"
                                        />
                                        <span className="text-[9.5px] sm:text-[10px] text-gray-300 leading-relaxed font-light">
                                            I authorize Grand Forest Privé and its representatives to contact me via Call, SMS, or WhatsApp regarding project updates.
                                        </span>
                                    </label>
                                    {errors.consent && <p className="text-[9px] text-red-400 flex items-center gap-1 ml-1 mt-0.5"><AlertCircle size={8} /> {errors.consent}</p>}
                                </div>

                                <div className="pt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => handleSubmit('callback')}
                                        className="w-full bg-gold-400 text-navy-950 font-bold py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-300 transition-all shadow-lg shadow-gold-400/10 uppercase tracking-wider text-[11px] disabled:opacity-50 active:scale-95 cursor-pointer"
                                    >
                                        {loading && actionType === 'callback' ? (
                                            <div className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <PhoneCall size={13} />
                                                Request Call Back
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => handleSubmit('visit')}
                                        className="w-full bg-white/10 text-white border border-white/20 font-bold py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-white/15 transition-all uppercase tracking-wider text-[11px] disabled:opacity-50 active:scale-95 cursor-pointer"
                                    >
                                        {loading && actionType === 'visit' ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Calendar size={13} />
                                                Schedule Visit
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
