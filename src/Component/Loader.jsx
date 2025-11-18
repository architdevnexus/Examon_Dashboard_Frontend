import { MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full flex justify-center h-[30vh]   items-center">
      <MoonLoader color="#003e68" size={30} />
    </div>
  );
};

export default Loader;
