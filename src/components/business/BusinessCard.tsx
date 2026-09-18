import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  MapPin,
  ThumbsUp,
  Star,
  ShieldCheck,
  CheckCircle2,
  Flame,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Business } from '../../types/business';
import { CategoryIcon } from '../common/CategoryIcon';
import { EnquiryModal } from './EnquiryModal';

interface BusinessCardProps {
  business: Business;
  layout?: 'list' | 'grid';
  className?: string;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  layout = 'list',
  className = '',
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Collect all images for carousel
  const imagesList = React.useMemo(() => {
    const list: string[] = [];
    if (business.cover_image) list.push(business.cover_image);
    if (business.images && business.images.length > 0) {
      business.images.forEach((img) => {
        if (img.image_url && !list.includes(img.image_url)) {
          list.push(img.image_url);
        }
      });
    }
    if (list.length === 0) {
      list.push('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80');
    }
    return list;
  }, [business]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  // Derive rating, counts, years in business deterministically if not set
  const rating = business.rating || 4.9;
  const ratingCount =
    business.rating_count ||
    (business.id.length * 137) % 2000 + 650;
  const yearsInBusiness =
    business.years_in_business ||
    ((business.id.length * 7) % 25 + 6);
  const isVerified = business.verified !== false;
  const isTrending = business.trending !== false;

  // Review tag snippet
  const reviewSnippet =
    business.tagline ||
    (business.services && business.services.length > 0
      ? business.services[0].name
      : 'Trusted & Highly Recommended');

  // Format WhatsApp Link with prefilled message
  const whatsappNumber = (business.whatsapp || business.phone).replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hello, I found ${business.name} on LionsHub (powered by nexusdigilancer) and would like to enquire about your services.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  // If grid layout is requested
  if (layout === 'grid') {
    return (
      <>
        <article
          id={`business-card-${business.id}`}
          className={`group bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between ${className}`}
        >
          <div>
            {/* Card Image Banner */}
            <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
              <img
                src={imagesList[currentImgIndex]}
                alt={business.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />

              {/* Category Pill */}
              {business.category && (
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-neutral-800 flex items-center gap-1.5 shadow-xs">
                  <CategoryIcon name={business.category.icon || business.category.name} className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{business.category.name}</span>
                </div>
              )}

              {/* Rating Pill */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-bold text-white bg-[#107c41] px-2 py-0.5 rounded-md shadow-xs">
                <span>{rating.toFixed(1)}</span>
                <Star className="w-3 h-3 fill-white" />
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-5 h-5 rounded-md bg-neutral-900 text-white flex items-center justify-center shrink-0">
                  <ThumbsUp className="w-3 h-3 fill-white" />
                </span>
                <h3 className="font-bold text-base text-neutral-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                  <Link to={`/business/${business.id}`}>{business.name}</Link>
                </h3>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                <span className="text-xs text-neutral-600 font-medium">{ratingCount.toLocaleString()} Ratings</span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-300 px-1.5 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3 text-amber-600 fill-amber-500/20" />
                  Trust
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  Verified
                </span>
              </div>

              {/* Address */}
              {business.address && (
                <p className="text-neutral-500 text-xs flex items-center gap-1.5 line-clamp-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>{business.address}, {business.city}</span>
                </p>
              )}
            </div>
          </div>

          {/* Card Action Footer */}
          <div className="p-4 bg-neutral-50/70 border-t border-neutral-100 flex items-center gap-2">
            <a
              id={`call-btn-${business.id}`}
              href={`tel:${business.phone}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#00875a] hover:bg-[#00744e] text-white text-xs font-bold shadow-2xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <button
              type="button"
              onClick={() => setIsEnquiryOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#0066c0] hover:bg-[#005299] text-white text-xs font-bold shadow-2xs transition-colors"
            >
              <span>Enquire</span>
            </button>
            <a
              id={`whatsapp-btn-${business.id}`}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white transition-colors"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>
          </div>
        </article>

        {isEnquiryOpen && (
          <EnquiryModal
            business={business}
            isOpen={isEnquiryOpen}
            onClose={() => setIsEnquiryOpen(false)}
          />
        )}
      </>
    );
  }

  // LIST TYPE LAYOUT (Default - Exactly matching the reference image)
  return (
    <>
      <article
        id={`business-card-${business.id}`}
        className={`group bg-white rounded-2xl border border-neutral-200/90 hover:border-neutral-300 hover:shadow-md transition-all p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-stretch relative ${className}`}
      >
        {/* Left Column: Image Thumbnail / Carousel */}
        <div className="relative w-full md:w-56 lg:w-64 h-48 sm:h-52 md:h-auto min-h-[170px] md:min-h-[190px] rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60 group/img">
          <Link to={`/business/${business.id}`} className="block w-full h-full">
            <img
              src={imagesList[currentImgIndex]}
              alt={business.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
              loading="lazy"
            />
          </Link>

          {/* Category overlay badge */}
          {business.category && (
            <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-semibold text-neutral-800 flex items-center gap-1 shadow-xs">
              <CategoryIcon name={business.category.icon || business.category.name} className="w-3 h-3 text-emerald-600" />
              <span className="truncate max-w-[120px]">{business.category.name}</span>
            </div>
          )}

          {/* Carousel Next/Prev Navigation Buttons */}
          {imagesList.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-110 shadow-xs"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white flex items-center justify-center backdrop-blur-xs transition-transform hover:scale-110 shadow-xs"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 right-2 bg-neutral-900/70 text-white text-[10px] font-medium px-2 py-0.5 rounded-md backdrop-blur-xs">
                {currentImgIndex + 1}/{imagesList.length}
              </div>
            </>
          )}
        </div>

        {/* Right Main Column: Business Details & Action CTAs */}
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            {/* Header: Recommended Thumb Icon + Business Name */}
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <ThumbsUp className="w-3.5 h-3.5 fill-white" />
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-neutral-900 group-hover:text-emerald-700 transition-colors tracking-tight leading-snug">
                <Link to={`/business/${business.id}`}>
                  {business.name}
                </Link>
              </h3>
            </div>

            {/* Ratings & Verification Badges Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-0.5">
              {/* Star Rating Badge */}
              <div className="inline-flex items-center gap-1 bg-[#107c41] text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-2xs">
                <span>{rating.toFixed(1)}</span>
                <Star className="w-3 h-3 fill-white text-white" />
              </div>

              {/* Total Ratings Count */}
              <span className="text-xs text-neutral-600 font-medium">
                {ratingCount.toLocaleString()} Ratings
              </span>

              {/* Trust Badge */}
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-300/80 px-2 py-0.5 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 fill-amber-500/20" />
                <span>Trust</span>
              </span>

              {/* Verified Badge */}
              {isVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Verified</span>
                </span>
              )}

              {/* Trending Badge */}
              {isTrending && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded">
                  <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                  <span>Trending</span>
                </span>
              )}
            </div>

            {/* Address Row with MapPin */}
            <div className="text-xs sm:text-sm text-neutral-600 flex items-center gap-1.5 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
              <span className="line-clamp-1">
                {business.address ? `${business.address}, ` : ''}{business.city}
              </span>
            </div>

            {/* Key Highlights / Suggestions Row */}
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-neutral-600 pt-0.5">
              <span className="text-[#00875a] font-bold">Available Now</span>
              <span className="text-neutral-300">•</span>
              <span className="font-medium text-neutral-700">{yearsInBusiness} Years in Business</span>
              <span className="text-neutral-300">•</span>
              <div className="inline-flex items-center gap-1 text-neutral-700">
                <MessageSquare className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="font-semibold text-neutral-900">&quot;{reviewSnippet}&quot;</span>
                {business.services && business.services.length > 0 && (
                  <span className="text-neutral-500 hidden sm:inline">
                    • {business.services.length} Key Services
                  </span>
                )}
              </div>
            </div>

            {/* Short description preview if provided */}
            {business.description && (
              <p className="text-neutral-500 text-xs line-clamp-1 pt-1 leading-relaxed">
                {business.description}
              </p>
            )}
          </div>

          {/* Action Buttons Bar */}
          <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2.5">
            {/* Phone Button (Displays Phone Number in Green) */}
            <a
              id={`call-btn-${business.id}`}
              href={`tel:${business.phone}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs sm:text-sm font-bold shadow-2xs transition-colors"
              title={`Call ${business.name}`}
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>{business.phone}</span>
            </a>

            {/* Book Appointment / Send Enquiry Button (Blue) */}
            <button
              id={`book-btn-${business.id}`}
              type="button"
              onClick={() => setIsEnquiryOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0066c0] hover:bg-[#00539c] text-white text-xs sm:text-sm font-bold shadow-2xs transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            {/* WhatsApp Button (WhatsApp Branded) */}
            <a
              id={`whatsapp-btn-${business.id}`}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-[#128C7E] border border-[#25D366] text-xs sm:text-sm font-bold shadow-2xs transition-colors"
              title={`Chat with ${business.name} on WhatsApp`}
            >
              <MessageCircle className="w-4 h-4 fill-[#25D366] text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* View Details Link */}
            <Link
              id={`details-link-${business.id}`}
              to={`/business/${business.id}`}
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-emerald-700 px-3 py-2 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <span>View Profile</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* Enquiry / Appointment Booking Modal */}
      {isEnquiryOpen && (
        <EnquiryModal
          business={business}
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
        />
      )}
    </>
  );
};
