import { useEffect, useState } from "react";
import { getDetailViewStore } from "../stores/authStore";
import { useParams, useNavigate, Link } from "react-router-dom";
import { generateScriptStore, historyChatStore } from "../stores/aiStore";
import { Copy, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatText = (text) => {
  if (!text || typeof text !== "string") return "";

  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>")
    .replace(/\r\n/g, "<br>")
    .replace(/\r/g, "<br>");
};

export const DetailChat = () => {
  const { getDetail, loading, success, error, message } = getDetailViewStore();
  const {
    generateScript,
    loading: genScriptLoading,
    success: genScriptSuccess,
    error: genScriptError,
    message: genScriptMessage,
  } = generateScriptStore();
  const {
    historyChat,
    loading: historyLoading,
    success: historySuccess,
    error: historyError,
    message: historyMessage,
  } = historyChatStore();

  const { id } = useParams();
  const [inputText, setInputText] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDetail(id);
  }, [getDetail]);

  useEffect(() => {
    historyChat(id);
  }, [historyChat, genScriptSuccess, genScriptMessage]);

  useEffect(() => {
    if (genScriptMessage) {
      setGeneratedScript(genScriptMessage);
    }
  }, [genScriptMessage]);

  useEffect(() => {
    if (
      message?.typeOfChat?.includes("Image") &&
      message?.typeOfChat?.length === 1
    ) {
      navigate(`/chat/image/${id}`);
    }
  }, [getDetail, message]);

  useEffect(() => {
    setInputText("");
    setGeneratedScript("");
    setSelectedChat(null);
  }, [id]);

  const handleGenerate = (e) => {
    e.preventDefault();
    const formData = {
      uuid: id,
      prompt: inputText,
      platform: message.placeholder || [],
      scriptType: message.scriptType,
    };
    generateScript(formData);
  };

  const handleCopy = async () => {
    const textToCopy =
      generatedScript || "Generated script will appear here...";
    const plainText = textToCopy
      .replace(/<strong>(.*?)<\/strong>/g, "$1")
      .replace(/<br>/g, "\n")
      .replace(/<[^>]*>/g, "");

    try {
      await navigator.clipboard.writeText(plainText);
      toast.success("Copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        style: { backgroundColor: "white", color: "black" },
      });
    } catch (err) {
      toast.error("Failed to copy!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        style: { backgroundColor: "white", color: "black" },
      });
    }
  };

  const handleReset = () => {
    setGeneratedScript("");
    setInputText("");
    setSelectedChat(null);
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setInputText(chat.prompt);
    setGeneratedScript(chat.content);
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleGoToImage = () => {
    navigate(`/chat/image/${id}`, {
      state: {
        allowValue: true,
      },
    });
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
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6 mt-10"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white shadow-lg rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>

            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Title:</span>
                <p className="mt-1">{message?.title || "No title available"}</p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Platforms:</span>
                <div className="flex items-center mt-1 space-x-2">
                  {success && message?.platform ? (
                    message.platform.map((platform, index) => (
                      <span key={index} className="flex items-center mx-1">
                        {platform === "Tiktok"
                          ? "📱"
                          : platform === "Youtube"
                          ? "📹"
                          : "📘"}
                        <span className="ml-1">{platform}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No platforms selected</span>
                  )}
                </div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Content Type:</span>
                <div className="mt-1">
                  {success && message?.typeOfChat ? (
                    message.typeOfChat.map((type, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm mr-2 mb-1"
                      >
                        {type}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No type specified</span>
                  )}
                </div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Script Type:</span>
                <div className="mt-1">
                  {
                    <span className="text-gray-500">
                      {message.scriptType || "No type specified"}
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white shadow-lg rounded-lg p-6 border">
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
                disabled={genScriptLoading}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {genScriptLoading ? "Generating..." : "Generate Script"}
              </button>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Generated Script
                  </label>
                </div>
                <div
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto"
                  dangerouslySetInnerHTML={{
                    __html: formatText(
                      genScriptLoading
                        ? "Generating script..."
                        : generatedScript ||
                            "Generated script will appear here..."
                    ),
                  }}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center px-3 py-1 text-sm bg-black text-white rounded hover:bg-neutral-800 transition-colors"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white shadow-lg rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">Chat History</h2>

            <div className="space-y-4">
              <div className="max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg p-3">
                {Array.isArray(historyMessage) && historyMessage.length > 0 ? (
                  historyMessage.map((chat, index) => (
                    <div
                      key={index}
                      onClick={() => handleChatClick(chat)}
                      className="p-3 mb-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-800">
                        {truncateText(chat.prompt)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    No chat history available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {message?.typeOfChat?.includes("Image") && (
        <button
          onClick={handleGoToImage}
          className="right-2 bottom-2 
          sm:right-10 sm:bottom-10
          p-2 sm:p-3
          fixed
          border rounded-full
          font-medium
          bg-black text-white text-sm
          hover:bg-gray-800 hover:scale-105 transition-all"
        >
          Image Generator
        </button>
      )}
      <ToastContainer />
    </>
  );
};
