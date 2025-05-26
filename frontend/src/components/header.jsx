export const Header = () => {
  return (
    <div className="flex bg-neutral-100 border-1 border-neutral-200 rounded-lg m-2 p-2 sticky top-2">
      <div>
        <h1 className="font-extrabold">Reelay</h1>
      </div>
      <div className="flex w-full justify-end gap-x-4">
        <h1 className="font-normal">About us</h1>
        <h1 className="font-normal">Contact us</h1>
      </div>
    </div>
  );
};
