import "./Loader.css"; // Animasyon keyframes'lerini burada tutacağız

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-5 h-5 border-2 border-gray-300 rounded-full mx-2 animate-circle-keys">
        <div className="absolute w-4 h-4 bg-gray-300 rounded-full animate-dot-keys"></div>
        <div className="absolute w-5 h-5 animate-outline-keys"></div>
      </div>
      <div className="relative w-5 h-5 border-2 border-gray-300 rounded-full mx-2 animate-circle-keys delay-300">
        <div className="absolute w-4 h-4 bg-gray-300 rounded-full animate-dot-keys delay-300"></div>
        <div className="absolute w-5 h-5 animate-outline-keys delay-1200"></div>
      </div>
      <div className="relative w-5 h-5 border-2 border-gray-300 rounded-full mx-2 animate-circle-keys delay-600">
        <div className="absolute w-4 h-4 bg-gray-300 rounded-full animate-dot-keys delay-600"></div>
        <div className="absolute w-5 h-5 animate-outline-keys delay-1500"></div>
      </div>
      <div className="relative w-5 h-5 border-2 border-gray-300 rounded-full mx-2 animate-circle-keys delay-900">
        <div className="absolute w-4 h-4 bg-gray-300 rounded-full animate-dot-keys delay-900"></div>
        <div className="absolute w-5 h-5 animate-outline-keys delay-1800"></div>
      </div>
      <div className="relative w-5 h-5 border-2 border-gray-300 rounded-full mx-2 animate-circle-keys delay-1200">
        <div className="absolute w-4 h-4 bg-gray-300 rounded-full animate-dot-keys delay-1200"></div>
        <div className="absolute w-5 h-5 animate-outline-keys delay-2100"></div>
      </div>
    </div>
  );
};

export default Loader;
