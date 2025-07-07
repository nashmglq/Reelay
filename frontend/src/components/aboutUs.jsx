export const AboutUs = ({id}) => {
  
  return (
    <div id={id} className="min-h-screen bg-white text-black flex pt-20 px-20 justify-center gap-x-12">
      <div className="flex flex-col w-1/2 space-y-6">
        <h1 className="text-5xl font-bold text-black border-b-4 border-black pb-4">
          About Reelay
        </h1>
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
          <p className="text-lg leading-relaxed text-gray-800">
            Reelay is an advanced AI-powered script and image generator designed
            to help content creators bring their ideas to life effortlessly.
            Whether you're planning a short video or a full-length reel, Reelay
            can instantly generate high-quality scripts tailored to your specific
            concept or niche.
          </p>
        </div>
        <div className="bg-black text-white p-6 rounded-lg">
          <p className="text-lg leading-relaxed">
            But that's not all—Reelay also creates eye-catching
            thumbnails perfect for TikTok, YouTube Shorts, Facebook Reels, and
            other social media platforms. With just a few inputs, you can
            streamline your creative process, save time, and focus more on
            producing engaging content.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
          <p className="text-lg leading-relaxed text-gray-800">
            Reelay is the perfect tool for influencers, marketers, and anyone 
            looking to enhance their online presence with compelling visuals 
            and professionally written scripts.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col w-1/2 space-y-6">
        <h1 className="text-5xl font-bold text-black border-b-4 border-black pb-4">
          How to use Reelay?
        </h1>
        <div className="bg-black text-white p-8 rounded-lg">
          <p className="text-xl leading-relaxed font-medium">
            Reelay is an AI-Powered script and image generator. It can generate
            scripts based on your ideas and also provide thumbnails for your TikTok,
            YouTube, or even Facebook Reels.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black">Simple Steps:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">1</div>
                <p className="text-gray-800">Input your content idea or concept</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">2</div>
                <p className="text-gray-800">Choose your platform and style preferences</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">3</div>
                <p className="text-gray-800">Generate professional scripts and thumbnails instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};