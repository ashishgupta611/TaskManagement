import { notFound } from 'next/navigation';
import { Newspaper, Clock, Share2, ArrowLeft } from 'lucide-react';
import Parser from 'rss-parser';
import Image from 'next/image';
import SocialShare from '../../../components/news/SocialShare';

type NewsItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
  description?: string;
  content?: string;
  image?: string;
};

async function getNewsItem(id: string): Promise<NewsItem | null> {
  try {
    // In a real app, you would fetch from your database
    const parser = new Parser();
    const feeds = await Promise.all(
      [
        'https://www.propertypistol.com/blog/feed/',
        'https://haryanarera.gov.in/rss-feed',
        'https://www.livelaw.in/rss/all'
      ].map(url => parser.parseURL(url).catch(() => null))
    );

    const allItems = feeds.flatMap(feed => 
      feed?.items?.map(item => ({
        id: item.guid || Math.random().toString(36).substring(2, 9),
        title: item.title || '',
        link: item.link || '#',
        pubDate: item.pubDate || new Date().toISOString(),
        source: feed.title || 'Unknown Source',
        category: 'general',
        description: item.contentSnippet || item.description,
        content: item.content,
        image: item.enclosure?.url || '/placeholder-news.jpg'
      })) || []
    );

    return allItems.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
  const newsItem = await getNewsItem(params.id);

  if (!newsItem) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <a 
              href="/news" 
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <ArrowLeft className="mr-1" size={18} />
              Back to News
            </a>
          </div>

          {/* Article Header */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <span>{newsItem.source}</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Clock className="mr-1" size={14} />
                {new Date(newsItem.pubDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
          </div>

          {/* Featured Image */}
          {newsItem.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Image
                src={newsItem.image}
                alt={newsItem.title}
                width={800}
                height={450}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose max-w-none mb-8">
            {newsItem.content ? (
              <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
            ) : (
              <p>{newsItem.description}</p>
            )}
          </div>

          {/* Social Sharing */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-3">Share this update</h3>
            <SocialShare 
              title={newsItem.title}
              url={`https://youraoawebsite.com/news/${newsItem.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}