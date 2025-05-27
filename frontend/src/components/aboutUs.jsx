
export const AboutUs = ({id}) => {
  
  return (
    <div id = {id} className="min-h-screen m-2 flex pt-20 px-20 justify-center gap-x-2">
      <div className="flex flex-col w-1/2">
        <h1 className="text-4xl font-bold">About Reelay</h1>
        <h1 className="text-3xl">
          Reelay is an advanced AI-powered script and image generator designed
          to help content creators bring their ideas to life effortlessly.
          Whether you're planning a short video or a full-length reel, Reelay
          can instantly generate high-quality scripts tailored to your specific
          concept or niche. But that’s not all—Reelay also creates eye-catching
          thumbnails perfect for TikTok, YouTube Shorts, Facebook Reels, and
          other social media platforms. With just a few inputs, you can
          streamline your creative process, save time, and focus more on
          producing engaging content. Reelay is the perfect tool for
          influencers, marketers, and anyone looking to enhance their online
          presence with compelling visuals and professionally written scripts.
        </h1>
      </div>
      <div className="flex flex-col w-1/2">
        <h1 className="text-4xl font-bold">How to use Reelay?</h1>
        <h1 className="text-3xl">
          Reelay is an Al-Powered script and image generator. It can generate
          script base on your ideas and also provide thumbnail for your TikTok,
          YouTube, or even Facebook Reels.
        </h1>
      </div>
    </div>
  );
};
