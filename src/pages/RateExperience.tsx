import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare, CheckCircle2, Building2, ThumbsUp, Send, Sparkles } from 'lucide-react';
import { recentReviews } from '../data/portalData';

export const RateExperience: React.FC = () => {
  const [businessName, setBusinessName] = useState('PVR Cinemas');
  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="rate-experience-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-500">
        <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-neutral-900 font-semibold">Rate Your Experience</span>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-neutral-900 via-amber-950 to-neutral-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Community Voices & Verified Reviews</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          How Was Your Experience?
        </h1>
        <p className="text-neutral-300 text-sm max-w-xl mx-auto">
          Share your genuine feedback on hospitals, movie halls, restaurants, schools, and home technicians to help fellow citizens make informed decisions.
        </p>
      </div>

      {/* Rating Form */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-md space-y-6">
        {submitted ? (
          <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-emerald-900">Thank You for Your Review!</h3>
            <p className="text-xs text-emerald-700 max-w-md mx-auto">
              Your {stars}-star rating for <strong>{businessName}</strong> has been published to the LionsHub verified community feed.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setReviewComment('');
              }}
              className="px-6 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold"
            >
              Rate Another Business
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs font-bold text-neutral-700 block mb-1.5">Business or Service Name</label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. PVR Cinemas, Fortis Hospital, Trichy Star Sweets"
                className="w-full p-3 rounded-xl border border-neutral-200 text-sm font-semibold focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Interactive Stars */}
            <div className="text-center py-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
              <p className="text-xs font-bold text-neutral-600 uppercase tracking-wider">Tap Stars to Rate</p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverStars || stars) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverStars(star)}
                      onMouseLeave={() => setHoverStars(0)}
                      onClick={() => setStars(star)}
                      className="p-1.5 transition-transform hover:scale-125 focus:outline-hidden"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          isFilled ? 'text-amber-400 fill-amber-400' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs font-semibold text-neutral-500">
                {stars === 5 && 'Outstanding / 5 Stars'}
                {stars === 4 && 'Very Good / 4 Stars'}
                {stars === 3 && 'Average / 3 Stars'}
                {stars === 2 && 'Poor / 2 Stars'}
                {stars === 1 && 'Terrible / 1 Star'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Rajiv Menon"
                  className="w-full p-3 rounded-xl border border-neutral-200 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1.5">Your Feedback Details</label>
                <input
                  type="text"
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Brief summary of service quality, hygiene, or staff"
                  className="w-full p-3 rounded-xl border border-neutral-200 text-sm font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Verified Community Review</span>
            </button>
          </form>
        )}
      </div>

      {/* Community Feed */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-neutral-900">Recent Reviews from Our Community</h3>
        <div className="space-y-4">
          {recentReviews.map((rev) => (
            <div key={rev.id} className="p-5 rounded-2xl bg-white border border-neutral-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={rev.reviewerAvatar} alt={rev.reviewerName} referrerPolicy="no-referrer" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">{rev.reviewerName}</h4>
                    <p className="text-xs text-neutral-500">reviewed <strong>{rev.businessName}</strong> ({rev.location})</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed italic">"{rev.reviewText}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
