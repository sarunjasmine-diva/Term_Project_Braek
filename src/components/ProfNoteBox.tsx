import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Sparkles, X } from 'lucide-react';

export const ProfNoteBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      aria-label="Ideation Note for Prof. Roh"
      className="fixed top-16 sm:top-20 right-3 sm:right-6 z-50 max-w-sm sm:max-w-md w-[calc(100vw-1.5rem)] sm:w-auto shadow-2xl transition-all duration-300"
    >
      <div className="bg-amber-50/95 backdrop-blur-md border-2 border-amber-300/80 rounded-2xl overflow-hidden shadow-xl text-gray-800 font-sans">
        {/* Header Bar */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-amber-100 to-[#fef08a] border-b border-amber-200/80 flex items-center justify-between cursor-pointer select-none"
             onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <FileText className="w-4 h-4 text-amber-900" />
            <span className="font-brand-title font-bold text-sm tracking-wide text-amber-950">
              Ideation Note • Prof. Roh
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="p-1 text-amber-900/70 hover:text-amber-950 rounded-lg transition-colors cursor-pointer"
              title={isOpen ? "Minimize" : "Expand"}
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content Box */}
        {isOpen ? (
          <div className="p-4 sm:p-5 text-xs text-gray-800 leading-relaxed max-h-[75vh] overflow-y-auto space-y-3">
            <div className="border-b border-amber-200/60 pb-2">
              <h3 className="font-brand-title text-base text-gray-900 font-bold">
                Ideation
              </h3>
              <p className="font-semibold text-gray-800 mt-1">
                Dear Prof. Roh,
              </p>
            </div>

            <p className="text-gray-700">
              we would analyse the Braek Acai &amp; Coffee and these are some of our initial ideas we would implement.
            </p>

            <ol className="list-decimal pl-4 space-y-2 text-gray-800 font-medium">
              <li>
                <strong className="text-gray-900">Change where the mission box is positioned (to the top)</strong>
              </li>
              <li>
                <strong className="text-gray-900">menu products should be presented as an interactive version</strong> where customers could compose their own bowls looking at how many ingredients they could add and how the product will look like with them.
              </li>
              <li>
                <strong className="text-gray-900">the site should include an customer area</strong> where costumers can log in with their account and see their previous orders, discounts, points accumulated with each orders and rewards to be collected at different stages.
              </li>
              <li>
                <strong className="text-gray-900">in the client private area a progress bar with different stages</strong> should be displayed to show the progress of the customers based on how many bowls/acai bowl are purchased. Depending on where he/she is show different wording, i.e. if he is in the start of the bar display <em>"Today you were able to achieve..."</em>, while if he/she is at the end <em>"You are almost there to collect your next reward"</em>
              </li>
            </ol>

            <p className="text-gray-700 pt-1">
              More changes will be made as we gain new ideas based on your notes.
            </p>

            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
              <span className="font-semibold text-gray-900">
                Thank you.
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[11px] text-amber-900/80 hover:text-black font-semibold underline underline-offset-2 cursor-pointer"
              >
                Minimize memo
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 text-xs text-amber-900 flex items-center justify-between cursor-pointer hover:bg-amber-100/50"
          >
            <span>Click to view Project Ideation memo</span>
            <span className="text-[10px] font-bold uppercase bg-amber-200 px-2 py-0.5 rounded-full">
              Open
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
