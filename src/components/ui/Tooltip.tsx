"use client";

import { useState } from "react";

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="inline-flex items-center cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children || (
          <span className="ml-1 text-gray-400 hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        )}
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 px-4 py-2 mt-2 text-sm text-gray-200 bg-gray-800 rounded-md border border-gray-700 shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
}
