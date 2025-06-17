import React from 'react';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';

const LoadingOverlay: React.FC = () => {
  const { isLoading, loadingText } = useAppSelector((state: RootState) => state.rootReducer.loading);
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-2"></div>
        <p>{loadingText || 'Loading...'}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;