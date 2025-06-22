'use client';

import { Clock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function NewsFilters({ currentFilter }: { currentFilter: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('time', filter);
    router.push(`/news?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="font-semibold text-lg mb-4 flex items-center">
        <Clock className="mr-2 text-blue-600" size={20} />
        Filter Updates
      </h3>
      <div className="space-y-2">
        {[
          { value: 'all', label: 'All Updates' },
          { value: 'day', label: 'Last 24 Hours' },
          { value: 'week', label: 'This Week' },
          { value: 'month', label: 'This Month' }
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm ${currentFilter === filter.value ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}