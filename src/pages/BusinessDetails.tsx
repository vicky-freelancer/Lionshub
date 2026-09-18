import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Images,
  ShoppingBag,
  Wrench,
  Building2,
  Heart,
} from 'lucide-react';
import { ServiceList } from '../components/business/ServiceList';
import { ProductGrid } from '../components/business/ProductGrid';
import { EnquiryModal } from '../components/business/EnquiryModal';
import { GalleryModal } from '../components/business/GalleryModal';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Business } from '../types/business';
import { businessService } from '../services/businessService';

export const BusinessDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryPresetMsg, setEnquiryPresetMsg] = useState('');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    async function loadBusiness() {
      try {
        setLoading(true);
        setError(null);
        const data = await businessService.getBusinessById(id!);
        if (isMounted) setBusiness(data);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Business not found');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadBusiness();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: business?.name || 'Local Business',
        text: `Check out ${business?.name} on LionsHub community directory (powered by nexusdigilancer)!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleProductEnquiry = (productName: string) => {
    setEnquiryPresetMsg(`Hello, I would like to enquire about the price and availability of "${productName}".`);
    setIsEnquiryOpen(true);
  };

  if (loading) {
    return <LoadingSpinner message="Loading business profile..." fullHeight />;
  }

  if (error || !business) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Business Profile Not Found</h2>
        <p className="text-sm text-neutral-500 mb-6">{error || 'The requested business listing does not exist.'}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
      </div>
    );
  }

  const whatsappNumber = (business.whatsapp || business.phone).replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hello, I found ${business.name} on the LionsHub community directory (powered by nexusdigilancer) and would like to know more about your services.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  const allGalleryImages = [
    ...(business.cover_image ? [{ id: 'cover', image_url: business.cover_image }] : []),
    ...(business.images || []),
  ];

  return (
    <div id="business-details-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500">
        <Link to="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        {business.category && (
          <>
            <Link to={`/category/${business.category.slug}`} className="hover:text-emerald-600 transition-colors">
              {business.category.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
          </>
        )}
        <span className="font-semibold text-neutral-900 truncate max-w-xs">{business.name}</span>
      </nav>

      {/* Hero Cover Banner & Gallery Trigger */}
      <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-200/90 shadow-md">
        <div className="h-64 sm:h-80 md:h-96 w-full relative">
          <img
            src={business.cover_image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'}
            alt={business.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

          {/* Top Actions on Banner */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Photos Count Badge */}
          {allGalleryImages.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setGalleryActiveIndex(0);
                setIsGalleryOpen(true);
              }}
              className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-900 text-white text-xs font-semibold backdrop-blur-md border border-neutral-700 flex items-center gap-2 transition-all shadow-sm"
            >
              <Images className="w-4 h-4 text-emerald-400" />
              <span>View Photos ({allGalleryImages.length})</span>
            </button>
          )}

          {/* Bottom Title Info on Cover Banner */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 text-white max-w-3xl">
            {business.category && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 text-neutral-950 font-bold text-xs mb-3 shadow-xs">
                <CategoryIcon name={business.category.icon || business.category.name} className="w-3.5 h-3.5" />
                <span>{business.category.name}</span>
              </div>
            )}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {business.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                {business.address ? `${business.address}, ${business.city}` : business.city}
              </span>
              {business.opening_hours && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  {business.opening_hours}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid (Content & Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Details, Services, Products, Gallery */}
        <div className="lg:col-span-2 space-y-10">
          {/* 1. About the Business */}
          <section id="section-about" className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>About {business.name}</span>
            </h2>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {business.description || 'Verified local business in our community. Offering trusted local services, custom orders, and quick support.'}
            </p>

            {/* Quick Overview Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-neutral-100">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-bold text-neutral-500 uppercase">Hours of Operation</span>
                  <span className="text-xs sm:text-sm font-medium text-neutral-900">
                    {business.opening_hours || 'Mon - Sat: 9:00 AM - 7:00 PM'}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5" />
                <div>
                  <span className="block text-[11px] font-bold text-neutral-500 uppercase">Service Location</span>
                  <span className="text-xs sm:text-sm font-medium text-neutral-900">
                    {business.city} and surrounding areas
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Services Offered */}
          <section id="section-services" className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-emerald-600" />
                <span>Services Offered</span>
              </h2>
              {business.services && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {business.services.length} {business.services.length === 1 ? 'Service' : 'Services'}
                </span>
              )}
            </div>
            <ServiceList services={business.services} />
          </section>

          {/* 3. Products Catalog */}
          {business.products && business.products.length > 0 && (
            <section id="section-products" className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" />
                  <span>Products & Items for Sale</span>
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {business.products.length} {business.products.length === 1 ? 'Product' : 'Products'}
                </span>
              </div>
              <ProductGrid products={business.products} onEnquireProduct={handleProductEnquiry} />
            </section>
          )}

          {/* 4. Business Photo Gallery */}
          {allGalleryImages.length > 0 && (
            <section id="section-gallery" className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xs space-y-6">
              <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                <Images className="w-5 h-5 text-emerald-600" />
                <span>Photo Gallery</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {allGalleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setGalleryActiveIndex(idx);
                      setIsGalleryOpen(true);
                    }}
                    className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer shadow-2xs border border-neutral-200"
                  >
                    <img
                      src={img.image_url}
                      alt={`${business.name} photo ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold px-3 py-1 rounded-md bg-black/60 backdrop-blur-md transition-opacity">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sticky Contact Box & Send Enquiry Action */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Direct Contact
              </span>
              <h3 className="text-lg font-bold text-neutral-900 mt-2">
                Connect with this Provider
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Reach out directly via Call, WhatsApp, or submit a free enquiry.
              </p>
            </div>

            {/* Direct Call Button */}
            <a
              id="details-call-now-btn"
              href={`tel:${business.phone}`}
              className="w-full py-3.5 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-neutral-950/10 transition-all active:scale-[0.99]"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call {business.phone}</span>
            </a>

            {/* Direct WhatsApp Button */}
            <a
              id="details-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-500/10 transition-all active:scale-[0.99]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Message on WhatsApp</span>
            </a>

            {/* Send Enquiry Button (Opens modal) */}
            <button
              id="details-send-enquiry-btn"
              type="button"
              onClick={() => {
                setEnquiryPresetMsg(`Hello, I'm interested in services from ${business.name}.`);
                setIsEnquiryOpen(true);
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-sm flex items-center justify-center gap-2.5 transition-colors"
            >
              <Send className="w-4 h-4 text-emerald-600" />
              <span>Send Free Enquiry</span>
            </button>

            {/* Address & Hours Summary */}
            <div className="pt-4 border-t border-neutral-100 space-y-3 text-xs text-neutral-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-900 block">Address</span>
                  <span>{business.address || business.city}, {business.city}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-900 block">Operating Hours</span>
                  <span>{business.opening_hours || 'Mon - Sat: 9:00 AM - 7:00 PM'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EnquiryModal
        business={business}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialMessage={enquiryPresetMsg}
      />

      <GalleryModal
        images={allGalleryImages}
        initialIndex={galleryActiveIndex}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
};
