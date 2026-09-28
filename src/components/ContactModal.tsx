import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, Mail, Send, Check, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-purple-50 via-amber-50/40 to-white border-b border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
              Get in Touch
            </span>
            <h3 className="font-brand-title text-2xl text-gray-900">
              Contact bræk. Açai &amp; Coffee
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Left: Location & Hours details */}
          <div className="space-y-5">
            <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
              <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1.5 text-purple-700" />
                Our Sanctuary
              </h4>
              <p className="text-gray-700 leading-relaxed font-medium">
                70 Stamford Road, Li Ka Shing Library
                <br />
                #B1-25, Singapore 178901
              </p>
              <div className="mt-2 text-[11px] text-gray-500">
                🚇 2 min walk from Bras Basah MRT (Exit A) or City Hall MRT
              </div>
            </div>

            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
              <h4 className="font-bold text-gray-900 text-sm mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-1.5 text-amber-700" />
                Operating Hours
              </h4>
              <p className="text-gray-700">
                <strong>Weekdays:</strong> 9:00 AM – 10:00 PM
              </p>
              <p className="text-gray-700 mt-0.5">
                <strong>Weekends:</strong> 11:30 AM – 6:00 PM
              </p>
            </div>

            <div className="space-y-2">
              <a
                href="https://wa.me/6581234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center p-3 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-emerald-600" />
                Chat on WhatsApp (+65 8123 4567)
              </a>

              <a
                href="mailto:hello@braek.sg"
                className="w-full flex items-center justify-center p-3 rounded-2xl bg-gray-50 text-gray-700 border border-gray-200 font-medium hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                hello@braek.sg
              </a>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="bg-white">
            {sent ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-brand-title text-xl text-gray-900 mb-1">
                  Message Sent!
                </h4>
                <p className="text-gray-500 text-xs mb-4">
                  Thank you, {name}. Our team will get back to your email within 24 hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Corporate Catering">Corporate Catering / Bulk Order</option>
                    <option value="Events & Bookings">Events &amp; Workshops</option>
                    <option value="Feedback">Feedback / Suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Lim"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@gmail.com"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help make your day brighter?"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
