import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Building2, Search, Layers, PlusCircle, Menu, X, MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link
            id="nav-brand-logo"
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl text-neutral-900 tracking-tight">
                  Lions<span className="text-emerald-600">Hub</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Trichy
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 hidden sm:block">
                Powered by <span className="font-medium text-emerald-700">nexusdigilancer</span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-links" className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <NavLink
              id="nav-link-home"
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/80 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              id="nav-link-categories"
              to="/categories"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/80 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
                }`
              }
            >
              <Layers className="w-4 h-4" />
              Categories
            </NavLink>
            <NavLink
              id="nav-link-search"
              to="/search"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/80 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
                }`
              }
            >
              <Search className="w-4 h-4" />
              Search
            </NavLink>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              id="nav-list-business-btn"
              to="/list-business"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm hover:shadow transition-all active:scale-[0.99]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Business</span>
            </Link>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <NavLink
            id="mobile-nav-home"
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl text-base font-medium ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            id="mobile-nav-categories"
            to="/categories"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`
            }
          >
            <Layers className="w-5 h-5 text-neutral-500" />
            Categories
          </NavLink>
          <NavLink
            id="mobile-nav-search"
            to="/search"
            onClick={closeMenu}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              }`
            }
          >
            <Search className="w-5 h-5 text-neutral-500" />
            Search Businesses
          </NavLink>

          <div className="pt-3 border-t border-neutral-100">
            <Link
              id="mobile-nav-list-business"
              to="/list-business"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-center shadow-xs"
            >
              <PlusCircle className="w-5 h-5" />
              List Your Business Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
