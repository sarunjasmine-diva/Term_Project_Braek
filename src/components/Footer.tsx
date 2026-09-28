import React, { useState, useEffect } from 'react';
import { Instagram, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    // Check Singapore time (UTC+8)
    const checkOpenStatus = () => {
      const now = new Date();
      // UTC time + 8 hours
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const sgt = new Date(utc + 3600000 * 8);
      const day = sgt.getDay(); // 0 is Sunday, 6 is Saturday
      const hour = sgt.getHours() + sgt.getMinutes() / 60;

      const isWeekend = day === 0 || day === 6;
      if (isWeekend) {
        setIsOpenNow(hour >= 11.5 && hour < 18);
      } else {
        setIsOpenNow(hour >= 9 && hour < 22);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="bg-white border-t border-gray-100 text-gray-800 pt-16 pb-12"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pb-12 border-b border-gray-100">
          {/* Column 1: Opening Hours */}
          <div data-purpose="hours">
            <div className="flex items-center space-x-2 mb-4">
              <h4 className="font-brand-title text-xl text-gray-900 font-bold">
                Opening Hours
              </h4>
              <span
                className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isOpenNow
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                  }`}
                />
                {isOpenNow ? 'Open Now' : 'Closed'}
              </span>
            </div>

            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-2 text-[#8e75ab]" />
                <strong className="font-semibold text-gray-800 mr-2">
                  Weekdays:
                </strong>{' '}
                9am – 10pm
              </li>
              <li className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-2 text-[#8e75ab]" />
                <strong className="font-semibold text-gray-800 mr-2">
                  Weekends:
                </strong>{' '}
                11:30am – 6pm
              </li>
            </ul>
          </div>

          {/* Column 2: Address */}
          <div data-purpose="address">
            <h4 className="font-brand-title text-xl text-gray-900 font-bold mb-4">
              Address
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              70 Stamford Road, Li Ka Shing Library,
              <br />
              #B1-25, Singapore 178901
            </p>
            <button
              onClick={onOpenContact}
              className="mt-3 inline-flex items-center text-xs font-semibold text-[#7c6696] hover:text-[#523939] underline underline-offset-4 cursor-pointer"
            >
              <MapPin className="w-3 h-3 mr-1" />
              View Location &amp; Directions
            </button>
          </div>

          {/* Column 3: Connect with us */}
          <div data-purpose="social-links">
            <h4 className="font-brand-title text-xl text-gray-900 font-bold mb-4">
              Connect with us
            </h4>
            <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-3">
              Follow us
            </p>
            <div className="flex items-center space-x-4">
              {/* X / Twitter Button */}
              <a
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors"
                href="https://twitter.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                {/* Custom X logo svg */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram Button */}
              <a
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center hover:bg-purple-100 transition-colors"
                href="https://instagram.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Credits Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>Copyright © Fei Mao Food Services Pte. Ltd. All rights reserved.</div>
          <div className="flex items-center space-x-1">
            <span>Powered by</span>
            <a
              className="text-purple-600 font-medium hover:underline"
              href="http://www.odoo.com?utm_source=db&utm_medium=website"
              rel="noopener noreferrer"
              target="_blank"
            >
              Odoo
            </a>
            <span>
              - Create a{' '}
              <a
                className="text-purple-600 font-medium hover:underline"
                href="http://www.odoo.com/app/website?utm_source=db&utm_medium=website"
                rel="noopener noreferrer"
                target="_blank"
              >
                free website
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
