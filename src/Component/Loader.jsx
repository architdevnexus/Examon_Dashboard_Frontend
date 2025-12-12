import { MoonLoader } from "react-spinners";

const Loader = ({ className = "h-[30vh]" }) => {
  return (
    <div className={`w-full flex justify-center ${className}    items-center`}>
      <MoonLoader color="#003e68" size={30} />
    </div>
  );
};

export default Loader;
