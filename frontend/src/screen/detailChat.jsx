import { useEffect } from "react";
import { getDetailViewStore } from "../stores/authStore";
import { useParams } from "react-router-dom";

export const DetailChat = () => {
  const { getDetail, loading, success, error, message } = getDetailViewStore();
  const { id } = useParams();

  useEffect(() => {
    getDetail(id);
  }, [getDetail]);

  console.log(message);
  return (
    <div className="flex items-center gap-x-10 w-full mt-2 mx-4 p-4">
      {/* Data such as platforms... title... */}
      <div className="shadow-lg w-[30%] h-1/2 p-4 border-2 rounded-lg">
        <h1>Title: {message && success ? message.title : "error"}</h1>

        <h1>
          Platform:{" "}
          {message && success
            ? message.platform.map((plat) => <h1>{plat === "Tiktok"}</h1>)
            : "error"}
        </h1>

        <div className="flex">
          <h1>
            Type:{" "}
            {message && success
              ? message.typeOfChat.map((type) => <h1>{type}</h1>)
              : "error"}
          </h1>
        </div>
      </div>

      <div className="w-[40%]">
        <div className="flex flex-col w-full h-full mt-4">
          <form className="flex flex-col justify-center items-center">
            <textarea className="border-2 rounded-lg resize-none w-[700px] h-[300px] p-4" />
            <button className="my-4 border-2 p-4 w-1/3 rounded-lg bg-black hover:scale-105 duration-300 text-white font-bold">
              Generate Script
            </button>
            <textarea
              className="border-2 rounded-lg resize-none w-[700px] h-[300px] p-4"
              readOnly
            />
          </form>
        </div>
      </div>

      <div className="shadow-lg w-[30%] h-1/2 p-4 border-2 rounded-lg">
        <h1>Platform: Tiktok</h1>
        <h1>Type: Scipt</h1>
      </div>
    </div>
  );
};
