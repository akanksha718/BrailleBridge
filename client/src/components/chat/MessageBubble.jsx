import { Download, Copy } from "lucide-react";
import { toast } from "sonner";

const MessageBubble = ({ msg, userId, onDownloadBRF }) => {
  const isSender = msg.side === 'right';
  const isBraille = msg.type === 'braille';

  const handleCopy = () => {
    if (isBraille && msg.message) {
      navigator.clipboard.writeText(msg.message);
      toast.success("Braille copied to clipboard!");
    }
  };

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`group p-4 rounded-2xl max-w-md transition-all duration-200 ${
          isSender 
            ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg" 
            : "bg-white text-gray-800 border-2 border-gray-200 shadow-md hover:shadow-lg"
        }`}
      >
        {/* Show original text if available */}
        {msg.original && (
          <div className="mb-2 pb-2 border-b border-current/20">
            <p className="text-xs opacity-70 mb-1">Original:</p>
            <p className="text-sm">
              {msg.original}
            </p>
          </div>
        )}

        {/* Message content */}
        {msg.fileName ? (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{msg.type === 'image' ? '🖼️' : '📄'}</span>
            <span className="break-all">{msg.message}</span>
          </div>
        ) : isBraille ? (
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200">
              <p className="text-2xl font-mono leading-relaxed" style={{ 
                fontFamily: 'Courier New, monospace',
                letterSpacing: '0.2em',
                wordBreak: 'break-word'
              }}>
                {msg.message}
              </p>
            </div>
            <div className="flex space-x-2 flex-wrap gap-2">
              <button
                onClick={() => onDownloadBRF(msg.message)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Download size={16} />
                <span>Download .brf</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Copy size={16} />
                <span>Copy</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="text-base leading-relaxed">{msg.message}</p>
        )}

        {/* Timestamp */}
        <p className="text-xs mt-3 opacity-70 text-right">
          {new Date(msg.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
