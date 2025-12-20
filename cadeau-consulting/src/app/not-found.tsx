import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-brand-bg px-6 text-center">
      <h2 className="font-heading text-9xl font-bold text-slate-200 mb-8">404</h2>
      <h1 className="font-heading text-3xl font-bold text-brand-navy mb-4">
        Page Not Found
      </h1>
      <p className="text-slate-600 max-w-md mb-8 leading-relaxed">
        The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy text-white font-semibold rounded-lg hover:bg-slate-800 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Return Home
      </Link>
    </div>
  );
}