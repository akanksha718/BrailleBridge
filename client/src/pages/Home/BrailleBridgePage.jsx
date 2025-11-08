import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TeamMemberCard from "@/components/Home/DeveloperCard";
import { ArrowRight, Eye, FileText, Image as ImageIcon } from "lucide-react";
import Footer from "@/components/common/footer";

const BrailleBridgePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Text to Braille",
      description: "Convert any text into Braille format instantly",
    },
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Image OCR",
      description: "Extract text from images and convert to Braille",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "PDF Processing",
      description: "Convert PDF content to accessible Braille",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Accessibility First",
      description: "Designed for visually impaired learners",
    },
  ];

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl shadow-2xl mb-6 animate-bounce-slow">
              <span className="text-5xl text-white">BB</span>
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-transparent bg-clip-text">
              Braille Bridge
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              AI-Powered Braille Converter for Educational Access
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Breaking educational barriers for visually impaired individuals by
              converting text, images, and PDFs into accessible Braille format.
            </p>

            {/* Conditional Buttons */}
            <div className="flex gap-4 justify-center pt-6">
              {!isAuthenticated && (
                <button
                  onClick={() => navigate("/auth/signup")}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => navigate("/convert")}
                  className="px-8 py-4 bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Try Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600">
            Everything you need for accessible education
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 md:p-12 border border-green-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            About Braille Bridge
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg">
              <strong className="text-green-700">BrailleBridge</strong> is an
              innovative AI-powered solution aimed at breaking educational
              barriers for visually impaired individuals. It automatically
              converts printed or digital content—such as textbooks, PDFs, and
              handwritten notes—into Braille and audio formats, making study
              materials more accessible and inclusive.
            </p>
            <p className="text-lg">
              Using advanced technologies like{" "}
              <strong>Optical Character Recognition (OCR)</strong>,{" "}
              <strong>Natural Language Processing (NLP)</strong>, and
              text-to-speech systems, BrailleBridge extracts and simplifies text
              before translating it into readable Braille (.brf) files or spoken
              audio.
            </p>
            <p className="text-lg">
              The platform supports multiple Indian languages and works
              seamlessly across web and desktop interfaces, ensuring ease of
              access for students, teachers, and institutions. BrailleBridge
              bridges the gap between traditional content and accessible
              education using low-cost, scalable software.
            </p>
            <p className="text-lg font-semibold text-green-700 mt-6">
              Empowering visually impaired learners to study independently and
              fostering an inclusive society.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Meet the Team
          </h2>
          <p className="text-lg text-gray-600">
            The talented people behind Braille Bridge
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <TeamMemberCard />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BrailleBridgePage;
