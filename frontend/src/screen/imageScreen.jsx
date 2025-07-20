import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailViewStore } from "../stores/authStore";
import { generateImageStore, historyImageStore } from "../stores/aiStore";

export const ImageScreen = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const [position, setPosition] = useState("");
  const [oriented, setOriented] = useState("");
  const [allowed, setallowed] = useState(false);
  const [imageHistory, setImageHistory] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  const { getDetail, success, message } = getDetailViewStore();

  const {
    generateImage,
    success: genImgSuccess,
    loading: genImgLoading,
    message: genImgMessage,
  } = generateImageStore();

  const {
    historyImage,
    loading: genHistoryLoading,
    success: genHistorySuccess,
    message: genHistoryMessage,
  } = historyImageStore();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = { prompt, uuid: id, text, position, allowed, oriented };
    generateImage(formData);
  };

  useEffect(() => {
    getDetail(id);
    historyImage(id);
  }, [id, genImgSuccess, genImgMessage]);

  useEffect(() => {
    if (success && message) {
      const hasImage = message.typeOfChat?.includes("Image");
      setallowed(hasImage);

      if (!hasImage) {
        nav(`/chat/${id}`);
      } else {
        historyImage(id);
      }
    }
  }, [success, message, id, nav]);

  useEffect(() => {
    if (genHistorySuccess && Array.isArray(genHistoryMessage)) {
      setImageHistory(genHistoryMessage);
    }
  }, [genHistorySuccess, genHistoryMessage]);

  const openModal = (thumbnail) => {
    setModalImage(
      `${process.env.REACT_APP_SERVER_BASE_URL}/uploads/genImage/${thumbnail}.png`
    );
  };

  const closeModal = () => setModalImage(null);

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = modalImage;
    link.download = "generated-image.png";
    link.click();
  };

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Project Details */}
        <div className="w-full lg:w-1/3 bg-white shadow rounded-lg p-6 border flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Project Details</h2>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Title:</span>
              <p className="mt-1"> {message.title || "No title available"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Platforms:</span>
              <div className="flex flex-wrap mt-1 space-x-2">
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
              <div className="mt-1 flex flex-wrap">
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
              <div className="mt-1 text-gray-500">
                {message.scriptType || "No type specified"}
              </div>
            </div>
          </div>
        </div>

        {/* Image Generator */}
        <div className="w-full lg:w-1/3 bg-white shadow rounded-lg p-6 border flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Image Generator</h2>
          <form className="space-y-4" onSubmit={submitHandler}>
            <textarea
              name="prompt"
              className="w-full p-2 border rounded placeholder-gray-400"
              placeholder="Prompt"
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
            />
            <input
              name="text"
              className="w-full p-2 border rounded placeholder-gray-400"
              placeholder="Text on Image (optional)"
              onChange={(e) => setText(e.target.value)}
            />
            <input
              name="position"
              className="w-full p-2 border rounded placeholder-gray-400"
              placeholder="Text Position (optional)"
              onChange={(e) => setPosition(e.target.value)}
            />
            <select
              name="platform"
              className="w-full p-2 border rounded text-gray-700"
              onChange={(e) => setOriented(e.target.value)}
            >
              <option value="">Select platform</option>
              <option value="Landscape">Landscape</option>
              <option value="Portrait">Portrait</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800 flex items-center justify-center"
              disabled={genImgLoading}
            >
              {genImgLoading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
              ) : (
                "Generate Image"
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="mb-2 font-medium">Image Preview</div>
            <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              {genImgSuccess && genImgMessage ? (
                <img
                  src={`${process.env.REACT_APP_SERVER_BASE_URL}/uploads/genImage/${genImgMessage}.png`}
                  alt="Generated Preview"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                "Image will display here..."
              )}
            </div>
          </div>
        </div>

        {/* Image History */}
        <div className="w-full lg:w-1/3 bg-white shadow rounded-lg p-6 border flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
          <div className="flex-1 overflow-y-auto max-h-[500px]">
            {genHistoryLoading ? (
              <div className="text-center text-gray-500">
                Loading image history...
              </div>
            ) : imageHistory.length === 0 ? (
              <div className="text-center text-gray-500">
                No image history available
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {imageHistory.map((img) => (
                  <img
                    key={img.image_id}
                    src={`${process.env.REACT_APP_SERVER_BASE_URL}/uploads/genImage/${img.thumbnailImage}.png`}
                    alt={`Generated ${img.image_id}`}
                    className="w-full h-auto rounded shadow cursor-pointer"
                    onClick={() => openModal(img.thumbnailImage)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-4">
          <div className="bg-white p-4 rounded shadow-lg max-w-full max-h-full flex flex-col items-center">
            <img
              src={modalImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[80vh] mb-4"
            />
            <div className="flex gap-4">
              <button
                onClick={downloadImage}
                className="px-4 py-2 bg-black text-white rounded hover:bg-neutral-900"
              >
                Download
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
