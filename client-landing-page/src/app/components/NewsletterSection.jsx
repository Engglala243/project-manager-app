"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks/redux";
import {
  subscribeToNewsletter,
  clearError,
  clearSuccess,
  resetNewsletterState,
} from "../lib/slices/newsletterSlice";

export default function NewsletterSection() {
  const dispatch = useAppDispatch();
  const { loading, error, success, message } = useAppSelector(
    (state) => state.newsletter
  );

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(subscribeToNewsletter(email));
  };

  useEffect(() => {
    if (success) {
      // Reset email on success
      setEmail("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 5000);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      // Clear error after 5 seconds
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetNewsletterState());
    };
  }, [dispatch]);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Stay updated with our latest projects, insights, and industry
            trends. Join our community of innovators and never miss an update.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-md mx-auto">
            <p className="font-medium">{message}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="flex-1 px-6 py-4 rounded-lg border-gray-900 text-gray-900 focus:ring-2 focus:ring-white focus:outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Subscribing...
                </span>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
        </form>

        <p className="text-sm text-blue-200 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
