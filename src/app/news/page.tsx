import { Newspaper, Clock, Gavel, Home, Search, Share2, Bell } from 'lucide-react';
import Parser from 'rss-parser';
import NewsFilters from '../../components/news/NewsFilters';
import NewsSearch from '../../components/news/NewsSearch';
import Newsletter from '../../components/news/Newsletter';
import Image from 'next/image';
import Link from 'next/link';

type NewsItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: 'sector' | 'rera' | 'court' | 'general';
  description?: string;
  content?: string;
  image?: string;
};

const RSS_FEEDS = [
  // ... (same as previous)
];

async function fetchNews(): Promise<NewsItem[]> {
  // TODO: Implement fetching logic here.
  // For now, return an empty array to satisfy the return type.
  return [];
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const allNews = await fetchNews();
  const timeFilter = searchParams?.time || 'all';
  const searchQuery = searchParams?.q || '';

  // Apply time-based filtering
  const filterNewsByTime = (news: NewsItem[]) => {
    const now = new Date();
    return news.filter(item => {
      const pubDate = new Date(item.pubDate);
      switch (timeFilter) {
        case 'day': return now.getTime() - pubDate.getTime() <= 86400000;
        case 'week': return now.getTime() - pubDate.getTime() <= 604800000;
        case 'month': return now.getTime() - pubDate.getTime() <= 2592000000;
        default: return true;
      }
    });
  };

  // Apply search filtering
  const filterNewsBySearch = (news: NewsItem[]) => {
    if (!searchQuery) return news;
    const query = searchQuery.toLowerCase();
    return news.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query)
    );
  };

  const filteredNews = filterNewsBySearch(filterNewsByTime(allNews));

  // Categorize news
  const sectorNews = filteredNews.filter(item => item.category === 'sector');
  const reraNews = filteredNews.filter(item => item.category === 'rera');
  const courtNews = filteredNews.filter(item => item.category === 'court');
  const generalNews = filteredNews.filter(item => item.category === 'general');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-blue-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center mb-4">
                <Newspaper className="mr-2" size={32} />
                <h1 className="text-3xl md:text-4xl font-bold">OSB ETGBA - News Center</h1>
              </div>
              <p className="text-lg md:text-xl max-w-2xl">
                Stay updated with the latest news about our sector and important real estate developments
              </p>
            </div>
            <NewsSearch />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <NewsFilters currentFilter={timeFilter} />
          <Newsletter />
          
          {/* Social Sharing */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Share2 className="mr-2 text-blue-600" size={20} />
              Share Updates
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* News Content */}
        <div className="lg:col-span-3 space-y-12">
          {/* Latest Updates Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <Bell className="mr-2 text-blue-600" size={24} />
                Latest Updates
              </h2>
              <div className="text-sm text-gray-500">
                Showing {filteredNews.length} of {allNews.length} items
              </div>
            </div>
            
            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNews.slice(0, 4).map((item) => (
                  <NewsCard key={item.id} item={item} featured />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p>No updates match your filters. Try adjusting your criteria.</p>
              </div>
            )}
          </section>

          {/* Rest of the categorized news sections... */}
          {/* ... (same sector, rera, court sections as before) ... */}
        </div>
      </div>
    </div>
  );
}

// Enhanced NewsCard component
function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${featured ? 'border-l-4 border-blue-500' : ''}`}>
      {item.image && (
        <div className="h-48 relative">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-blue-600">{item.source}</span>
          <span className="text-xs text-gray-500 flex items-center">
            <Clock className="mr-1" size={12} />
            {new Date(item.pubDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
        <h3 className={`font-semibold ${featured ? 'text-xl' : 'text-lg'} mb-2 line-clamp-2`}>
          <Link href={`/news/${item.id}`} className="hover:text-blue-600">
            {item.title}
          </Link>
        </h3>
        {item.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {item.description.replace(/<[^>]+>/g, '')}
          </p>
        )}
        <div className="flex justify-between items-center">
          <Link 
            href={`/news/${item.id}`}
            className="inline-flex items-center text-sm text-blue-600 hover:underline"
          >
            Read more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-blue-500">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}