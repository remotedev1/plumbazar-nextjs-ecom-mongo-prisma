"use client";
import {
  Droplet,
  Wrench,
  Phone,
  Mail,
  Clock,
  MessageCircle,
} from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="pipes"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M50 0 L50 50 L100 50"
                stroke="#1e40af"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M150 50 L150 100 L100 100"
                stroke="#1e40af"
                strokeWidth="4"
                fill="none"
              />
              <circle cx="100" cy="50" r="6" fill="#1e40af" />
              <circle cx="100" cy="100" r="6" fill="#1e40af" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pipes)" />
        </svg>
      </div>

      {/* Floating Water Droplets */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            <Droplet className="text-blue-400 opacity-20" size={20 + i * 5} />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header with Logo */}
        <header className="text-center mb-16 animate-fadeIn">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Wrench className="text-blue-600 animate-spin-slow" size={48} />
              <Droplet
                className="text-blue-400 absolute -top-2 -right-2 animate-bounce"
                size={20}
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3 tracking-tight">
            Plumb<span className="text-blue-600">azar</span>.com
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Reliable Plumbing Services Coming Soon
          </p>
        </header>

        {/* Coming Soon Message */}
        <div className="mb-16 animate-slideUp text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-3xl mx-auto transform transition-all hover:shadow-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
              Coming Soon
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              We&apos;re working hard to bring you the best plumbing services in
              town. Stay tuned!
            </p>
          </div>
        </div>

        {/* Animated Water Flow SVG */}
        <div className="mb-16 flex justify-center">
          <svg
            width="300"
            height="100"
            viewBox="0 0 300 100"
            className="animate-fadeIn"
          >
            <defs>
              <linearGradient
                id="waterGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M0 50 Q75 20, 150 50 T300 50"
              stroke="url(#waterGradient)"
              strokeWidth="6"
              fill="none"
              className="animate-wave"
            />
            <path
              d="M0 60 Q75 30, 150 60 T300 60"
              stroke="url(#waterGradient)"
              strokeWidth="4"
              fill="none"
              className="animate-wave-delay"
            />
          </svg>
        </div>

        {/* Contact Cards */}
        <div
          className="mb-16 animate-slideUp"
          style={{ animationDelay: "0.3s" }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
            Get In Touch
          </h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"> */}
          <div className="flex justify-center items-center max-w-4xl mx-auto">
            {[
              {
                icon: <Mail className="text-blue-600" size={28} />,
                title: "Email",
                value: "enquiry@plumbazar.com",
                link: "mailto:enquiry@plumbazar.com",
              },
            ].map((contact, idx) => (
              <a
                key={idx}
                href={contact.link || "#"}
                className={`bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 transform transition-all hover:scale-105 hover:shadow-xl ${
                  !contact.link && "pointer-events-none"
                }`}
              >
                <div className="bg-blue-50 p-4 rounded-xl">{contact.icon}</div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {contact.title}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {contact.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Features Preview */}
        <div
          className="max-w-4xl mx-auto animate-fadeIn"
          style={{ animationDelay: "0.5s" }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🚰",
                title: "Emergency Repairs",
                desc: "24/7 rapid response",
              },
              {
                icon: "🔧",
                title: "Installation",
                desc: "Expert fixture setup",
              },
              { icon: "💧", title: "Maintenance", desc: "Regular check-ups" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer
          className="text-center mt-16 text-gray-500 animate-fadeIn"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-sm">© 2025 Plumbazar.com - All Rights Reserved</p>
          <p className="text-xs mt-2">
            Professional Plumbing Services You Can Trust
          </p>
        </footer>
      </div>
    </div>
  );
}
