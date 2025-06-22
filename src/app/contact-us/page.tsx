import { Mail, Phone, MapPin, Clock, User } from 'lucide-react';

// Types for contact data
type CommitteeMember = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  availableHours?: string;
};

// Mock data - replace with your actual data
const committeeMembers: CommitteeMember[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    role: 'Secretary',
    phone: '+91 98765 43210',
    email: 'secretary@OSB ETGBA.example.com',
    availableHours: 'Mon-Fri, 6-8 PM'
  },
  {
    id: '2',
    name: 'Priya Patel',
    role: 'Treasurer',
    phone: '+91 87654 32109',
    email: 'treasurer@OSB ETGBA.example.com',
    availableHours: 'Tue-Thu, 5-7 PM'
  },
  {
    id: '3',
    name: 'Amit Singh',
    role: 'Maintenance Head',
    phone: '+91 76543 21098',
    email: 'maintenance@OSB ETGBA.example.com',
    availableHours: 'Daily, 4-6 PM'
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            Get in touch with the OSB ETGBA management committee or submit your queries
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Methods */}
        <div className="space-y-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Mail className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email</h3>
                  <p className="text-gray-600">general@OSB ETGBA.example.com</p>
                  <p className="text-gray-600">support@OSB ETGBA.example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Phone className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Phone</h3>
                  <p className="text-gray-600">Office: +91 80 1234 5678</p>
                  <p className="text-gray-600">Emergency: +91 98450 12345 (24/7)</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-2 rounded-full mr-4">
                  <MapPin className="text-orange-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Address</h3>
                  <p className="text-gray-600">OSB ETGBA Office, Ground Floor</p>
                  <p className="text-gray-600">ABC Apartments, XYZ Layout</p>
                  <p className="text-gray-600">Bangalore - 560001</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <Clock className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Office Hours</h3>
                  <p className="text-gray-600">Monday to Friday: 9 AM - 5 PM</p>
                  <p className="text-gray-600">Saturday: 10 AM - 2 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Management Committee */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Management Committee</h2>
            
            <div className="space-y-4">
              {committeeMembers.map((member) => (
                <div key={member.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-2 rounded-full mr-4">
                      <User className="text-gray-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{member.name}</h3>
                      <p className="text-gray-600">{member.role}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2" size={16} />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2" size={16} />
                          <span>{member.email}</span>
                        </div>
                        {member.availableHours && (
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2" size={16} />
                            <span>Available: {member.availableHours}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                Apartment Number
              </label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a subject</option>
                <option value="maintenance">Maintenance Issue</option>
                <option value="billing">Billing Query</option>
                <option value="complaint">Complaint</option>
                <option value="suggestion">Suggestion</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Google Map Embed */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold p-4 border-b">Our Location</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789012!2d77.12345678901234!3d12.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDA3JzI0LjQiTiA3N8KwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[450px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}