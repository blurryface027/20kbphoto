import Link from "next/link";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
          <HiOutlineExclamationTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            The page or exam tool you requested does not exist or has been permanently moved.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-indigo-100"
          >
            Go to Homepage
          </Link>
          <Link
            href="/tools/"
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-xl transition-all"
          >
            Browse All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
