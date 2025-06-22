import { Building, Users, Award, Clock, Shield, Home } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40">
          <Image
            src="/about-hero.jpg" // Replace with your image
            alt="ETGBA Community"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ETGBA</h1>
          <p className="text-xl md:text-2xl max-w-2xl">
            Our mission, vision, and commitment to our community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Welcome to OSB Expressways Towers - Sector 109
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                ETGBA at OSB Expressways Towers is a resident welfare 
                association formed to manage and maintain our community's common areas, facilities, 
                and services.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Established in 2018, our ETGBA represents all residents in matters concerning 
                the upkeep, security, and improvement of our premises while fostering a strong 
                sense of community.
              </p>
              <p className="text-lg text-gray-600">
                We work closely with builders, maintenance teams, and local authorities to 
                ensure our community remains one of the most desirable residential complexes 
                in Sector 109.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/about-community.jpg" // Replace with your image
                alt="OSB Expressways Towers Community"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Mission & Vision */}
        <section className="mb-16 bg-white rounded-xl shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-4">
                <Award className="text-blue-600 mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-600">
                To enhance the quality of life for all residents by maintaining high standards 
                of living, ensuring proper upkeep of common areas, promoting harmony among 
                residents, and representing our community's interests with builders and 
                government authorities.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Home className="text-blue-600 mr-3" size={28} />
                <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-600">
                To create and sustain a world-class residential community that offers 
                exceptional living standards, state-of-the-art amenities, and a safe, 
                vibrant environment where residents can thrive and form lasting connections.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Why Choose OSB Expressways Towers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield size={32} className="text-blue-600" />,
                title: "24/7 Security",
                description: "Gated community with CCTV surveillance and professional security personnel"
              },
              {
                icon: <Building size={32} className="text-blue-600" />,
                title: "Quality Construction",
                description: "Premium materials and earthquake-resistant RCC structure"
              },
              {
                icon: <Users size={32} className="text-blue-600" />,
                title: "Community Spaces",
                description: "Well-maintained parks, clubhouse, and recreational facilities"
              },
              {
                icon: <Clock size={32} className="text-blue-600" />,
                title: "Convenient Location",
                description: "Proximity to schools, hospitals, and major expressways"
              },
              {
                icon: <Shield size={32} className="text-blue-600" />,
                title: "Legal Compliance",
                description: "All necessary approvals from DTCP, HRERA, and other authorities"
              },
              {
                icon: <Home size={32} className="text-blue-600" />,
                title: "Resident-Centric",
                description: "Transparent governance with regular resident meetings"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Management Committee */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Our Management Committee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "President",
                image: "/member1.jpg", // Replace with actual images
                tenure: "2022-2024"
              },
              {
                name: "Priya Patel",
                role: "Secretary",
                image: "/member2.jpg",
                tenure: "2022-2024"
              },
              {
                name: "Amit Singh",
                role: "Treasurer",
                image: "/member3.jpg",
                tenure: "2022-2024"
              },
              {
                name: "Neha Gupta",
                role: "Maintenance Head",
                image: "/member4.jpg",
                tenure: "2022-2024"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500">Tenure: {member.tenure}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Building Specifications */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Building Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Construction Details</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Earthquake-resistant RCC structure</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Premium quality cement and steel used</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Waterproofing with Dr. Fixit or equivalent</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Fire safety systems as per NBC norms</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>HRERA approved project (Registration No: HRERA-PKL-XXXXXX)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Amenities</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>24/7 power backup (50% load)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>RO water supply to all units</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Landscaped gardens and children's play area</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Clubhouse with gym and party hall</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Visitor parking and 24/7 security</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}