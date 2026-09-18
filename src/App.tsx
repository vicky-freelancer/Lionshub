import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { Categories } from './pages/Categories';
import { CategoryBusinesses } from './pages/CategoryBusinesses';
import { BusinessDetails } from './pages/BusinessDetails';
import { ListBusiness } from './pages/ListBusiness';
import { RateExperience } from './pages/RateExperience';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-neutral-50/50 text-neutral-900 font-sans selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryBusinesses />} />
            <Route path="/business/:id" element={<BusinessDetails />} />
            <Route path="/list-business" element={<ListBusiness />} />
            <Route path="/rate-experience" element={<RateExperience />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
