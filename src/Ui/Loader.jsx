import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-200 gap-2">
      {/* Dot 1 */}
      <div
        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
        style={{ animationDelay: '0s' }}
      ></div>

      {/* Dot 2 */}
      <div
        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
        style={{ animationDelay: '0.2s' }}
      ></div>

      {/* Dot 3 */}
      <div
        className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
        style={{ animationDelay: '0.4s' }}
      ></div>
    </div>
  );
}
