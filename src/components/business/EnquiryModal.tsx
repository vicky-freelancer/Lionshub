import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Phone, User, MessageSquare, Loader2 } from 'lucide-react';
import { Business } from '../../types/business';
import { enquiryService } from '../../services/enquiryService';

interface EnquiryModalProps {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  business,
  isOpen,
  onClose,
  initialMessage = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(initialMessage || `Hello, I'm interested in services from ${business.name}.`);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Please provide your name, contact phone number, and message.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await enquiryService.submitEnquiry({
        business_id: business.id,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        message: message.trim(),
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setMessage(`Hello, I'm interested in services from ${business.name}.`);
    setError(null);
    onClose();
  };

  return (
    <div
      id="enquiry-modal-backdrop"
      className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="enquiry-modal-content"
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          id="enquiry-modal-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div id="enquiry-success-message" className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Enquiry Sent!</h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              Your enquiry has been sent successfully to <span className="font-semibold text-neutral-900">{business.name}</span>.
              The business owner may contact you directly on <span className="font-medium text-neutral-900">{phone}</span> soon.
            </p>
            <button
              id="enquiry-success-done-btn"
              type="button"
              onClick={handleReset}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Direct Inquiry
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-2">
                Send Enquiry to {business.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                No account required. Connect directly with the business owner.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="enquiry-customer-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Miller"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                  Your Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="enquiry-customer-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 555-0199 or 9876543210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                  Requirement / Message <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="enquiry-customer-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe what service or product you are looking for..."
                    className="w-full p-3.5 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="enquiry-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Free Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
