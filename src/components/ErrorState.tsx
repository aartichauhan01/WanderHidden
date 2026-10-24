import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We could not load this travel data right now. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-red-50/50 rounded-2xl border border-red-200/80 max-w-md mx-auto my-6">
      <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-red-900 mb-1">{title}</h3>
      <p className="text-sm text-red-700/90 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors shadow-sm"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      )}
    </div>
  );
};
