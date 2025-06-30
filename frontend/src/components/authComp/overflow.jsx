import { EllipsisVertical } from "lucide-react";
import { useEffect, useState, useRef } from "react";

import { DeleteChat } from "./deleteChat";
export const OverFlow = () => {
  const [dropDown, setDropDown] = useState(false);
  const inside = useRef(null);
  // mousedown means click
  // Handles outside click (close)
  // useEffect runs once added the eventListenre and return will only happnd when
  // useEffect was called again (unmounts, or remvoed)
  useEffect(() => {
    const handelDropDown = (e) => {
      // if current value (of ref), !contains the element (hindi contain ang element.)
      if (inside.current && !inside.current.contains(e.target)) {
        setDropDown(false);
      }
    };
    // add event listener when clicked it will call the function
    document.addEventListener("mousedown", handelDropDown);
    return () => document.removeEventListener("mousedown", handelDropDown);
  }, []);

  return (
    <div>
      <button
        className="text-neutral-600 z-10 hover:text-black duration-300 "
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDropDown(!dropDown);
        }}
      >
        <EllipsisVertical />
      </button>

      {dropDown ? (
        <div
          className="absolute bg-white border-2 rounded-lg shadow-lg flex flex-col"
          ref={inside}
            onClick={(e) => e.stopPropagation()}
        >
          <DeleteChat />
        </div>
      ) : null}
    </div>
  );
};
