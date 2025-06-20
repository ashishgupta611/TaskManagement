'use client'

import Link from 'next/link';
import Image from 'next/image';
import bgImage from '@/src/resources/images/osb_ext_109.png';

// Types for your data
type Survey = {
  id: string;
  title: string;
  date: string;
  responses: number;
};

type MediaItem = {
  id: string;
  type: 'image' | 'video';
  url: string;
  date: string;
  title?: string;
};

type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
};

// Mock data - replace with your actual data fetching
const recentSurveys: Survey[] = [
  { id: '1', title: 'Park Renovation Proposal', date: '2023-10-15', responses: 42 },
  { id: '2', title: 'Annual Budget Approval', date: '2023-09-28', responses: 65 },
];

const mediaGallery: MediaItem[] = [
  { id: '1', type: 'image', url: '/placeholder.jpg', date: '2023-10-10', title: 'Community Event' },
  { id: '2', type: 'video', url: '/placeholder.mp4', date: '2023-09-22', title: 'Construction Update' },
];

const latestNews: NewsItem[] = [
  { id: '1', title: 'New Security Measures Implemented', date: '2023-10-12', excerpt: 'Enhanced security cameras installed around the premises...' },
  { id: '2', title: 'Quarterly Maintenance Schedule', date: '2023-10-05', excerpt: 'The maintenance schedule for October to December has been published...' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Placeholder Background */}
      <div className="relative bg-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-75">
          {/* Placeholder for background image */}
          <Image 
            src={bgImage} 
            alt="AOA Community Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to <span>OSB ETGBA - Buyers Association)</span></h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            Managing our community with transparency and efficiency
          </p>
        </div>
      </div>

      {/* Quick Actions Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/surveys/create" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg">Create New Survey</h3>
                <p className="text-gray-600 text-sm">Gather community feedback</p>
              </div>
            </div>
          </Link>

          <Link href="/surveys" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg">View Surveys</h3>
                <p className="text-gray-600 text-sm">Check past and ongoing surveys</p>
              </div>
            </div>
          </Link>

          <Link href="/documents" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg">Legal Documents</h3>
                <p className="text-gray-600 text-sm">Access important society documents</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Recent Surveys Section */}
      <section className="container mx-auto px-4 py-8 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Surveys</h2>
          <Link href="/surveys" className="text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentSurveys.map((survey) => (
            <div key={survey.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-lg mb-1">{survey.title}</h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Date: {new Date(survey.date).toLocaleDateString()}</span>
                <span>{survey.responses} responses</span>
              </div>
              <Link href={`/surveys/${survey.id}`} className="text-blue-600 text-sm hover:underline">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Media Gallery Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Media Gallery</h2>
          <Link href="/gallery" className="text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mediaGallery.map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                {item.type === 'image' ? (
                  <Image
                    src={item.url}
                    alt={item.title || 'Community media'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest News Section */}
      <section className="container mx-auto px-4 py-8 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Latest News</h2>
          <Link href="/news" className="text-blue-600 hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestNews.map((news) => (
            <div key={news.id} className="border-b pb-4">
              <h3 className="font-medium text-lg mb-1 hover:text-blue-600 transition-colors">
                <Link href={`/news/${news.id}`}>{news.title}</Link>
              </h3>
              <p className="text-sm text-gray-500 mb-2">{new Date(news.date).toLocaleDateString()}</p>
              <p className="text-gray-700">{news.excerpt}</p>
              <Link href={`/news/${news.id}`} className="inline-block mt-2 text-blue-600 text-sm hover:underline">
                Read more →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Construction Updates Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Construction Updates</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-start">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Current Project Status</h3>
              <p className="text-gray-700 mb-4">
                Phase 2 construction is 65% complete. Expected completion date: March 2024.
              </p>
              <Link href="/construction" className="inline-flex items-center text-blue-600 hover:underline">
                View detailed progress
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}