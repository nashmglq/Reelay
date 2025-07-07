export const Header = () => {
  return (
    // Just add fixed to be part of screen and not push
    <div className="flex bg-stone-900 border-1 border-neutral-200 w-full p-4 z-40 fixed top-0">
      <div>
        <h1 className="font-extrabold text-white">Reelay</h1>
      </div>
      <div className="flex w-full justify-end gap-x-4">
        <button className="font-normal text-white">About us</button>
        <button className="font-normal text-white">Contact us</button>
      </div>
    </div>
  );
};
