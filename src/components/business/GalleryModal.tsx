import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { BusinessImage } from '../../types/business';

interface GalleryModalProps {
  images: BusinessImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen || images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      id="gallery-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        id="gallery-modal-close"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main image viewer */}
      <div className="relative max-w-4xl w-full max-h-[75vh] flex items-center justify-center">
        <img
          src={images[currentIndex]?.image_url}
          alt={`Gallery ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />

        {images.length > 1 && (
          <>
            <button
              id="gallery-prev-btn"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              id="gallery-next-btn"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Image counter and thumbnails */}
      <div className="mt-4 flex flex-col items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <span className="text-white/80 text-xs font-medium">
          {currentIndex + 1} of {images.length}
        </span>
        {images.length > 1 && (
          <div className="flex gap-2 max-w-md overflow-x-auto p-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  currentIndex === idx ? 'border-emerald-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.image_url}
                  alt={`Thumb ${idx}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
