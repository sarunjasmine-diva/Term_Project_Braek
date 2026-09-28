import React from 'react';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import { CafeEvent } from '../types';

interface EventsSectionProps {
  onLearnMore: () => void;
  featuredEvents: CafeEvent[];
  onSelectEvent: (event: CafeEvent) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  onLearnMore,
  featuredEvents,
  onSelectEvent,
}) => {
  return (
    <section
      className="py-20 bg-amber-50/40 relative overflow-hidden"
      data-purpose="events-overview"
      id="events"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-brand-title text-4xl sm:text-5xl text-gray-900 mb-5 italic">
          Events
        </h2>

        <p className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Step away from chaos with our exciting events! Break free, savor fun
          moments, and escape the monotony of everyday life.
        </p>

        <div>
          <button
            onClick={onLearnMore}
            className="inline-flex items-center text-sm font-semibold text-gray-900 underline underline-offset-8 decoration-2 decoration-purple-400 hover:decoration-black transition-all cursor-pointer group"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Quick Preview of Upcoming Campus Highlights */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          {featuredEvents.slice(0, 2).map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-amber-100/80 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                  {evt.badge || evt.category}
                </span>
                <span className="text-xs text-amber-700 font-medium flex items-center">
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
                  {evt.spotsLeft} spots left
                </span>
              </div>
              <h4 className="font-brand-title text-xl text-gray-900 mb-2 group-hover:text-purple-900 transition-colors">
                {evt.title}
              </h4>
              <p className="text-gray-600 text-xs line-clamp-2 mb-4 leading-relaxed">
                {evt.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                <span className="flex items-center font-medium text-gray-700">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-purple-600" />
                  {evt.date}
                </span>
                <span className="flex items-center text-gray-500">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  SMU Lib B1-25
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
