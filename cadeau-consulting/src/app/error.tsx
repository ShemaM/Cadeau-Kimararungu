"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ideally, log this to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      
      <h2 className="font-heading text-2xl font-bold text-brand-navy mb-3">
        System Error
      </h2>
      <p className="text-slate-600 max-w-md mb-8">
        We encountered an unexpected issue connecting to the consultancy database.
      </p>
      
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-white border border-slate-200 text-brand-navy font-semibold rounded-lg hover:bg-slate-50 transition-all"
      >
        Try Again
      </button>
    </div>
  );
}