import { Link } from "react-scroll";

export const Header = () => {
  return (
    // Just add fixed to be part of screen and not push
    <div className="flex bg-stone-900 border-1 border-neutral-200 w-full p-4 z-40 fixed top-0">
      <div>
        <Link
          to="/"
          smooth={true}
          duration={500}
          className="font-extrabold text-white"
        >
          Reelay
        </Link>
      </div>
      <div className="flex w-full justify-end gap-x-4">
        <Link
          to="about"
          smooth={true}
          duration={500}
          className="font-normal text-white cursor-pointer hover:text-gray-300 transition-colors"
        >
          About us
        </Link>
        <Link
          to="contact"
          smooth={true}
          duration={500}
          className="font-normal text-white cursor-pointer hover:text-gray-300 transition-colors"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
};
