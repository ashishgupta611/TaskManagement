import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, Users, MessageSquare, ClipboardList } from 'lucide-react';

// Types for community data
type Resident = {
  id: string;
  name: string;
  apartment: string;
  role?: string;
  avatar?: string;
};

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
};

type ForumTopic = {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastUpdated: string;
};

type Poll = {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  endsAt: string;
};

// Mock data - replace with your actual data fetching
const residents: Resident[] = [
  { id: '1', name: 'Rahul Sharma', apartment: 'B-102', role: 'Secretary', avatar: '/placeholder-avatar.jpg' },
  { id: '2', name: 'Priya Patel', apartment: 'A-205', role: 'Treasurer', avatar: '/placeholder-avatar.jpg' },
  { id: '3', name: 'Amit Singh', apartment: 'C-301', avatar: '/placeholder-avatar.jpg' },
  { id: '4', name: 'Neha Gupta', apartment: 'D-104', avatar: '/placeholder-avatar.jpg' },
];

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Annual General Meeting',
    date: '2023-11-15',
    location: 'Community Hall',
    description: 'Discussion of annual budget and maintenance plans'
  },
  {
    id: '2',
    title: 'Diwali Celebration',
    date: '2023-11-12',
    location: 'Society Lawn',
    description: 'Cultural program and dinner for all residents'
  },
];

const forumTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Parking Space Allocation',
    author: 'Rahul Sharma',
    replies: 12,
    lastUpdated: '2023-10-18'
  },
  {
    id: '2',
    title: 'Gym Equipment Maintenance',
    author: 'Neha Gupta',
    replies: 5,
    lastUpdated: '2023-10-15'
  },
];

const activePolls: Poll[] = [
  {
    id: '1',
    question: 'Should we increase security deposit?',
    options: [
      { id: '1', text: 'Yes', votes: 42 },
      { id: '2', text: 'No', votes: 38 },
    ],
    totalVotes: 80,
    endsAt: '2023-11-01'
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Community Header */}
      <div className="bg-green-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Hub</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Connect with your neighbors, participate in events, and join discussions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Residents and Polls */}
        <div className="lg:col-span-1 space-y-8">
          {/* Residents Directory */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-600 text-white px-4 py-3 flex items-center">
              <Users className="mr-2" size={20} />
              <h2 className="font-semibold text-lg">Residents Directory</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {residents.map((resident) => (
                  <div key={resident.id} className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={resident.avatar || '/placeholder-avatar.jpg'}
                        alt={resident.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{resident.name}</p>
                      <div className="flex text-sm text-gray-600">
                        <span>{resident.apartment}</span>
                        {resident.role && (
                          <span className="ml-2 px-2 bg-green-100 text-green-800 rounded-full text-xs flex items-center">
                            {resident.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/community/residents" className="block mt-4 text-center text-green-600 hover:underline">
                View Full Directory →
              </Link>
            </div>
          </div>

          {/* Active Polls */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 text-white px-4 py-3 flex items-center">
              <ClipboardList className="mr-2" size={20} />
              <h2 className="font-semibold text-lg">Active Polls</h2>
            </div>
            <div className="p-4">
              {activePolls.length > 0 ? (
                activePolls.map((poll) => (
                  <div key={poll.id} className="mb-6">
                    <h3 className="font-medium mb-3">{poll.question}</h3>
                    <div className="space-y-2 mb-3">
                      {poll.options.map((option) => {
                        const percentage = poll.totalVotes > 0 
                          ? Math.round((option.votes / poll.totalVotes) * 100) 
                          : 0;
                        return (
                          <div key={option.id}>
                            <div className="flex justify-between text-sm mb-1">
                              <span>{option.text}</span>
                              <span>{percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>{poll.totalVotes} votes</span>
                      <span>Ends {new Date(poll.endsAt).toLocaleDateString()}</span>
                    </div>
                    <button className="w-full py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors">
                      Vote Now
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No active polls at the moment</p>
              )}
              <Link href="/community/polls" className="block text-center text-blue-600 hover:underline mt-2">
                View All Polls →
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Column - Events */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
            <div className="bg-orange-600 text-white px-4 py-3 flex items-center">
              <CalendarDays className="mr-2" size={20} />
              <h2 className="font-semibold text-lg">Upcoming Events</h2>
            </div>
            <div className="p-4">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex">
                        <div className="bg-orange-100 text-orange-800 rounded-lg p-2 mr-3 text-center min-w-[60px]">
                          <div className="font-bold text-lg">
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-xs uppercase">
                            {new Date(event.date).toLocaleString('default', { month: 'short' })}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.location}</p>
                          <p className="text-sm mt-1 text-gray-700 line-clamp-2">{event.description}</p>
                          <Link 
                            href={`/community/events/${event.id}`} 
                            className="inline-block mt-2 text-orange-600 text-sm hover:underline"
                          >
                            More details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming events scheduled</p>
              )}
              <div className="mt-4 flex justify-between">
                <Link href="/community/events" className="text-orange-600 hover:underline">
                  View All Events
                </Link>
                <Link 
                  href="/community/events/add" 
                  className="flex items-center text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-md hover:bg-orange-200"
                >
                  <CalendarDays className="mr-1" size={16} />
                  Add Event
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Discussion Forum */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-purple-600 text-white px-4 py-3 flex items-center">
              <MessageSquare className="mr-2" size={20} />
              <h2 className="font-semibold text-lg">Discussion Forum</h2>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <Link 
                  href="/community/forum/new" 
                  className="w-full py-2 bg-purple-100 text-purple-700 rounded-md flex items-center justify-center hover:bg-purple-200 transition-colors"
                >
                  <MessageSquare className="mr-2" size={16} />
                  Start New Topic
                </Link>
              </div>

              {forumTopics.length > 0 ? (
                <div className="space-y-4">
                  {forumTopics.map((topic) => (
                    <div key={topic.id} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-medium hover:text-purple-600 transition-colors">
                        <Link href={`/community/forum/${topic.id}`}>{topic.title}</Link>
                      </h3>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>By {topic.author}</span>
                        <span>{topic.replies} replies</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Last updated {new Date(topic.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No discussion topics yet</p>
              )}

              <Link href="/community/forum" className="block text-center text-purple-600 hover:underline mt-4">
                View All Discussions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}