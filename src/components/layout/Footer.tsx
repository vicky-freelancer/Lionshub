import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Heart, ShieldCheck, PlusCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const trichyLocalities = [
    'Thillai Nagar', 'Cantonment', 'Srirangam', 'K.K. Nagar', 'Main Guard Gate', 'Central Bus Stand',
    'Chatram Bus Stand', 'TVS Tollgate', 'Woraiyur', 'Karur Bypass Road', 'Anna Nagar', 'Kattur',
    'Ponmalai (Golden Rock)', 'Lalgudi', 'Samayapuram', 'Crawford', 'Palakarai', 'Ramalinga Nagar',
    'Subramaniyapuram', 'Melachinthamani', 'Tennur', 'Vayalur Road', 'Mannachanallur', 'Tiruverumbur'
  ];

  const popularSearches = [
    'Mutual Fund Distributors', 'CBSE & Matric Schools', 'Auditors & Tax Consultants',
    'Building Contractors', 'Business Loans & MSME Finance', 'AC Repair & Technicians',
    'Home Services', 'Restaurants & Sweets', 'Packers & Movers', 'Electrical & Plumbing'
  ];

  return (
    <footer id="main-footer" className="bg-neutral-900 text-neutral-300 pt-14 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-neutral-800">
          {/* Col 1: Brand & Statement */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-neutral-950 font-bold">
                <Building2 className="w-5 h-5 text-neutral-900" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Lions<span className="text-emerald-400">Hub</span>
              </span>
            </Link>
            <p className="text-xs text-emerald-400 font-medium tracking-wide">
              Trichy Community Edition • Powered by nexusdigilancer
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Trichy's premier community business search engine connecting residents directly with verified local businesses, mutual fund advisors, contractors, schools, and home services across Tiruchirappalli.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-800/60 p-2.5 rounded-lg border border-neutral-700/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Free Public Directory for Trichy</span>
            </div>
          </div>

          {/* Col 2: Hubs & Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/categories" className="hover:text-emerald-400 transition-colors">All Categories</Link></li>
              <li><Link to="/search" className="hover:text-emerald-400 transition-colors">Search Businesses</Link></li>
              <li><Link to="/list-business" className="hover:text-emerald-400 transition-colors">List Your Business Free</Link></li>
              <li><Link to="/rate-experience" className="hover:text-emerald-400 transition-colors">Rate an Experience</Link></li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Top Trichy Categories</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/category/mutual-fund-distributor" className="hover:text-emerald-400 transition-colors">Mutual Fund Distributors</Link></li>
              <li><Link to="/category/education-school" className="hover:text-emerald-400 transition-colors">Education & Schools</Link></li>
              <li><Link to="/category/auditor-gst-tax-filling" className="hover:text-emerald-400 transition-colors">Auditors & GST / Tax Filing</Link></li>
              <li><Link to="/category/building-contractor" className="hover:text-emerald-400 transition-colors">Building Contractors</Link></li>
              <li><Link to="/category/business-loan" className="hover:text-emerald-400 transition-colors">Business Loans</Link></li>
              <li><Link to="/category/home-services" className="hover:text-emerald-400 transition-colors">AC & Home Repairs</Link></li>
              <li><Link to="/category/restaurants-food" className="hover:text-emerald-400 transition-colors">Restaurants & Food</Link></li>
            </ul>
          </div>

          {/* Col 4: Community Listing CTA */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Own a Business in Trichy?</h4>
            <p className="text-sm text-neutral-400">
              Get discovered by local customers across Tiruchirappalli. Add your phone, WhatsApp, services, products, and gallery photos in minutes.
            </p>
            <Link
              id="footer-list-cta"
              to="/list-business"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Add Free Trichy Business Listing
            </Link>
          </div>
        </div>

        {/* Directory Tags / Popular Searches Across Trichy */}
        <div className="space-y-4 pt-2 text-xs text-neutral-400">
          <div>
            <span className="font-bold text-neutral-300 block mb-2">Trending Searches in Trichy:</span>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 leading-relaxed">
              {popularSearches.map((term, i) => (
                <Link key={i} to={`/search?q=${encodeURIComponent(term)}&city=Trichy`} className="hover:text-emerald-400 transition-colors">
                  {term} {i < popularSearches.length - 1 && '•'}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <span className="font-bold text-neutral-300 block mb-2">Trichy Localities & Neighborhoods:</span>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 leading-relaxed text-[11px] text-neutral-500">
              {trichyLocalities.map((loc, i) => (
                <Link key={i} to={`/search?q=${encodeURIComponent(loc)}&city=Trichy`} className="hover:text-emerald-400 transition-colors">
                  {loc} {i < trichyLocalities.length - 1 && '|'}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2008-{new Date().getFullYear()} LionsHub Community Business Directory. All rights reserved.</p>
          <div className="flex items-center gap-1 text-neutral-400">
            <span>Powered by</span>
            <span className="text-emerald-400 font-semibold">nexusdigilancer</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
