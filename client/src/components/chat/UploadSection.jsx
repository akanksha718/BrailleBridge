import { useState } from "react";
import { Send, Image, FileText } from "lucide-react";
import { toast } from "sonner";

const UploadSection = ({
  userId,
  inputText,
  setInputText,
  handleSubmit,
  handleFileConversion,
  isConverting
}) => {
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (type === 'image' && !file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    if (type === 'pdf' && file.type !== 'application/pdf') {
      toast.error("Please select a PDF file");
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size should be less than 10MB");
      return;
    }

    await handleFileConversion(file, type);
    
    // Reset file input
    setFileInputKey(prev => prev + 1);
  };

  return (
    <div className="bg-white border-t-2 border-gray-200 shadow-xl">
      <div className="max-w-5xl mx-auto p-4">
        {/* File Upload Buttons */}
        <div className="flex justify-center gap-3 mb-4">
          <label className="cursor-pointer group flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
            <Image size={20} />
            <span className="font-medium">📷 Image</span>
            <input
              key={fileInputKey}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e, "image")}
              disabled={isConverting}
            />
          </label>
          <label className="cursor-pointer group flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
            <FileText size={20} />
            <span className="font-medium">📄 PDF</span>
            <input
              key={fileInputKey + 100}
              type="file"
              accept=".pdf"
              hidden
              onChange={(e) => handleFileChange(e, "pdf")}
              disabled={isConverting}
            />
          </label>
        </div>

        {/* Text Input */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message or send text, image, or PDF..."
              className="w-full px-5 py-4 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all duration-200 text-gray-700 placeholder-gray-400 disabled:bg-gray-100"
              disabled={isConverting}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              💬
            </div>
          </div>
          <button
            type="submit"
            disabled={isConverting || !inputText.trim()}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white p-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            <Send size={24} />
          </button>
        </form>

        <div className="text-center mt-3">
          <p className={`text-xs transition-all ${isConverting ? 'text-green-600 font-semibold animate-pulse' : 'text-gray-500'}`}>
            {isConverting ? "⏳ Converting to Braille..." : "✨ Send text, images, or PDFs to convert"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
