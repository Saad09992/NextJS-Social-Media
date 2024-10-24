import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      {/* Primary spinner */}
      <div className="relative">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 border-4 border-blue-500 rounded-full animate-ping"></div>
        </div>
      </div>
      <div className="text-gray-600 text-lg font-medium flex items-center">
        Loading
        <span className="ml-1 inline-flex">
          <span className="animate-bounce mx-0.5 delay-100">.</span>
          <span className="animate-bounce mx-0.5 delay-200">.</span>
          <span className="animate-bounce mx-0.5 delay-300">.</span>
        </span>
      </div>
      {/* 
     

      <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="w-full h-full bg-blue-500 animate-loading-bar"></div>
      </div> 
      */}

      {/* Pulse ring */}
      {/* <div className="absolute">
        <div className="w-16 h-16 rounded-full bg-blue-100 animate-pulse"></div>
      </div> */}
    </div>
  );
};

export default Loading;
