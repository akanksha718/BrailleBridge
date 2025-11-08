import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import MessageBubble from "@/components/chat/messageBubble";
import UploadSection from "@/components/chat/UploadSection";

const ConversionPage = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversation history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('brailleChatHistory');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('brailleChatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleTextConversion = async (text) => {
    if (!text.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setIsConverting(true);
    const userMessage = {
      id: Date.now(),
      senderId: user?.id || 'user',
      type: 'text',
      message: text,
      timestamp: new Date().toISOString(),
      side: 'right'
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      console.log('Sending request with text:', text);
      const response = await axios.post('http://localhost:5000/api/braille/text-to-braille', {
        text: text
      }, {
        withCredentials: true
      });
      
      console.log('Response received:', response);
      console.log('Response data:', response.data);
      console.log('Braille:', response.data.braille);
      console.log('Original:', response.data.original);

      if (!response.data.braille) {
        throw new Error('Invalid response: no braille in response');
      }

      const brailleMessage = {
        id: Date.now() + 1,
        senderId: 'system',
        type: 'braille',
        message: response.data.braille,
        original: response.data.original,
        timestamp: new Date().toISOString(),
        side: 'left'
      };

      setMessages(prev => [...prev, brailleMessage]);
      toast.success("Converted successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Failed to convert text to braille";
      toast.error(errorMessage);
      console.error('Error converting text:', error.response?.data || error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileConversion = async (file, type) => {
    if (!file) return;

    setIsConverting(true);
    const formData = new FormData();
    formData.append('file', file);

    const userMessage = {
      id: Date.now(),
      senderId: user?.id || 'user',
      type: type,
      message: `Uploaded ${type}: ${file.name}`,
      fileName: file.name,
      timestamp: new Date().toISOString(),
      side: 'right'
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const endpoint = type === 'image' ? 'http://localhost:5000/api/braille/image-to-braille' : 'http://localhost:5000/api/braille/pdf-to-braille';
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const brailleMessage = {
        id: Date.now() + 1,
        senderId: 'system',
        type: 'braille',
        message: response.data.braille,
        original: response.data.original_text,
        timestamp: new Date().toISOString(),
        side: 'left'
      };

      setMessages(prev => [...prev, brailleMessage]);
      toast.success("File converted successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || `Failed to convert ${type}`;
      toast.error(errorMessage);
      console.error(`Error converting ${type}:`, error.response?.data || error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadBRF = async (brailleContent) => {
    try {
      const response = await axios.post('http://localhost:5000/api/braille/download-brf', {
        braille: brailleContent
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'braille_output.brf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("BRF file downloaded!");
    } catch (error) {
      toast.error("Failed to download BRF file");
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleTextConversion(inputText);
      setInputText("");
    }
  };

  if (!user?.id) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-green-600 via-green-500 to-teal-600 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔤</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Braille Bridge</h1>
                <p className="text-xs text-green-100">AI-Powered Braille Converter</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear the chat history?")) {
                  setMessages([]);
                  localStorage.removeItem('brailleChatHistory');
                  toast.success("Chat history cleared");
                }
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <span>🗑️</span>
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area with Better Styling */}
      <div className="flex-1 overflow-y-auto p-4 bg-pattern">
        <div className="max-w-5xl mx-auto space-y-3">
          {messages.length === 0 ? (
            <div className="text-center mt-20 animate-fade-in">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-5xl">🔤</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome to Braille Bridge!</h2>
              <p className="text-lg text-gray-600 mb-2">Convert text, images, or PDFs to Braille</p>
              <p className="text-sm text-gray-500">Try sending "Hello World" to get started!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={msg.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-in">
                <MessageBubble
                  msg={msg}
                  userId={user.id}
                  onDownloadBRF={handleDownloadBRF}
                />
              </div>
            ))
          )}
          {isConverting && (
            <div className="flex justify-center animate-pulse">
              <div className="bg-white shadow-lg p-4 rounded-2xl border-2 border-green-200">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <p className="text-xs text-center mt-2 text-gray-600">Converting...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <UploadSection
        userId={user.id}
        inputText={inputText}
        setInputText={setInputText}
        handleSubmit={handleSubmit}
        handleFileConversion={handleFileConversion}
        isConverting={isConverting}
      />
    </div>
  );
};

export default ConversionPage;
