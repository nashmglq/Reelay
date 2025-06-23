import { useEffect, useState } from "react";
import { getDetailViewStore } from "../stores/authStore";
import { useParams } from "react-router-dom";

export const DetailChat = () => {
  const { getDetail, loading, success, error, message } = getDetailViewStore();
  const { id } = useParams();
  
  const [inputText, setInputText] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();
    setGeneratedScript("Generated script will appear here...");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <div>Error loading data</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4">Project Details</h2>
          
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Title:</span>
              <p className="mt-1">{message?.title || "No title available"}</p>
            </div>

            <div>
              <span className="font-medium text-gray-700">Platforms:</span>
              <div className="flex items-center mt-1 space-x-2">
                {success && message?.platform ? 
                  message.platform.map((platform, index) => (
                    <span key={index} className="flex items-center mx-1">
                      {platform === "Tiktok" ? "📱" : platform === "Youtube" ? "📹" : "📘"}
                      <span className="ml-1">{platform}</span>
                    </span>
                  )) : 
                  <span className="text-gray-500">No platforms selected</span>
                }
              </div>
            </div>

            <div>
              <span className="font-medium text-gray-700">Content Type:</span>
              <div className="mt-1">
                {success && message?.typeOfChat ? 
                  message.typeOfChat.map((type, index) => (
                    <span key={index} className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm mr-2 mb-1">
                      {type}
                    </span>
                  )) : 
                  <span className="text-gray-500">No type specified</span>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4">Script Generator</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your content ideas here..."
              />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transform hover:scale-105 transition-all duration-200"
            >
              Generate Script
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated Script
              </label>
              <textarea
                value={generatedScript}
                readOnly
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none bg-gray-50"
                placeholder="Generated script will appear here..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4">Quick Info</h2>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span>📱</span>
              <span>Primary Platform: TikTok</span>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Content Type:</span>
              <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                Script
              </span>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium text-gray-700 mb-2">Tips:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Keep scripts engaging and concise</li>
                <li>• Include strong hooks in the first 3 seconds</li>
                <li>• Add clear call-to-actions</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};