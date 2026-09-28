import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Check, Users, Ticket, ArrowLeft } from 'lucide-react';
import { CafeEvent } from '../types';
import { EVENTS_DATA } from '../data/menuData';

interface EventsScreenProps {
  onBackToHome?: () => void;
  selectedEventForModal?: CafeEvent | null;
  onClearSelectedEvent?: () => void;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({
  onBackToHome,
  selectedEventForModal,
  onClearSelectedEvent,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [rsvpEvent, setRsvpEvent] = useState<CafeEvent | null>(
    selectedEventForModal || null
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pax, setPax] = useState('1');
  const [studentId, setStudentId] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Sync if prop changed
  React.useEffect(() => {
    if (selectedEventForModal) {
      setRsvpEvent(selectedEventForModal);
    }
  }, [selectedEventForModal]);

  const categories = ['All', 'Student', 'Wellness', 'Workshop', 'Social'];

  const filteredEvents = EVENTS_DATA.filter(
    (e) => activeCategory === 'All' || e.category === activeCategory
  );

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setRsvpSuccess(true);
  };

  const closeRSVPModal = () => {
    setRsvpEvent(null);
    setRsvpSuccess(false);
    setName('');
    setEmail('');
    setStudentId('');
    if (onClearSelectedEvent) onClearSelectedEvent();
  };

  return (
    <div className="min-h-screen bg-[#faf8f2] pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#b19ec8]/30 via-amber-50/50 to-[#faf8f2] pt-14 pb-12 px-4 sm:px-6 lg:px-8 border-b border-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center text-xs font-semibold text-gray-500 hover:text-black mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Home
            </button>
          )}

          <h1 className="font-brand-title text-5xl sm:text-6xl text-gray-900 mb-4 italic">
            Events
          </h1>

          <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Step away from chaos with our exciting events! Break free, savor fun
            moments, and escape the monotony of everyday life.
          </p>

          {/* Categories */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-7 border border-amber-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-800">
                    {evt.badge || evt.category}
                  </span>
                  <div className="flex items-center text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
                    {evt.spotsLeft} spots left
                  </div>
                </div>

                <h3 className="font-brand-title text-2xl text-gray-900 mb-2">
                  {evt.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {evt.description}
                </p>

                {/* Event Schedule details */}
                <div className="bg-gray-50/80 rounded-2xl p-4 space-y-2 text-xs text-gray-700 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-[#8e75ab] mr-2 flex-shrink-0" />
                    <span className="font-semibold">{evt.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-[#8e75ab] mr-2 flex-shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-[#8e75ab] mr-2 flex-shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                {/* Perks Checklist */}
                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    What's Included:
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-600">
                    {evt.perks.map((perk, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mr-2 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">Free / Subsidized Entry</span>
                <button
                  onClick={() => setRsvpEvent(evt)}
                  className="px-6 py-2.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  RSVP Spot →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Student Club & Campus Society Collaboration Banner */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-purple-100 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">
              Campus Partnership
            </span>
            <h4 className="font-brand-title text-2xl text-gray-900">
              Hosting a student club or society meetup?
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 max-w-lg">
              We collaborate with SMU, nearby universities, and youth groups for wellness days, welfare packs, study sessions, and live acoustic open mics.
            </p>
          </div>
          <button
            onClick={() => {
              setRsvpEvent({
                id: 'custom-event',
                title: 'Student Society & Campus Collaboration',
                date: 'Flexible Date',
                time: 'Custom Hours',
                location: 'bræk. @ Li Ka Shing Library #B1-25',
                category: 'Student',
                description: 'Host your club meeting, study circle, or society mixer with subsidized açai bowls and dedicated seating.',
                spotsLeft: 50,
                perks: ['Group discounts for student ID holders', 'Dedicated seating area', 'Custom toppings bar option']
              });
            }}
            className="px-6 py-3 rounded-full bg-black hover:bg-gray-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm whitespace-nowrap cursor-pointer"
          >
            Partner With Us
          </button>
        </div>
      </section>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {rsvpSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="font-brand-title text-2xl text-gray-900 mb-2">
                  RSVP Confirmed!
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  We've reserved <strong>{pax} spot{parseInt(pax) > 1 ? 's' : ''}</strong> for{' '}
                  <span className="font-semibold text-gray-900">{rsvpEvent.title}</span>. A confirmation pass has been sent to <strong>{email}</strong>.
                </p>

                {/* Digital Ticket Pass */}
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-left mb-6">
                  <div className="flex justify-between items-start border-b border-purple-200 pb-3 mb-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-800 tracking-wider">
                        Event Pass
                      </span>
                      <p className="font-brand-title text-base text-gray-900">
                        {rsvpEvent.title}
                      </p>
                    </div>
                    <Ticket className="w-6 h-6 text-[#7c6696]" />
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p><strong>Guest:</strong> {name}</p>
                    <p><strong>Date &amp; Time:</strong> {rsvpEvent.date} ({rsvpEvent.time})</p>
                    <p><strong>Venue:</strong> {rsvpEvent.location}</p>
                  </div>
                </div>

                <button
                  onClick={closeRSVPModal}
                  className="w-full py-3 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-800 tracking-wider">
                      Event Reservation
                    </span>
                    <h3 className="font-brand-title text-2xl text-gray-900">
                      {rsvpEvent.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeRSVPModal}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-gray-500 mb-6">
                  {rsvpEvent.date} • {rsvpEvent.time} • {rsvpEvent.location}
                </p>

                <form onSubmit={handleRSVP} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rachel Tan"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                      placeholder="e.g. rachel.tan@smu.edu.sg"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">
                        Number of Pax
                      </label>
                      <select
                        value={pax}
                        onChange={(e) => setPax(e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">
                        Student ID (Optional)
                      </label>
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="SMU / NUS / NTU"
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#fef08a] hover:bg-[#fae45b] text-gray-900 font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow cursor-pointer active:scale-95"
                    >
                      Confirm RSVP Spot
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
