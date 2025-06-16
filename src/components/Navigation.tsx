"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link 
              href="/"
              className={`inline-flex items-center px-1 pt-1 transition ${
                pathname === "/" ? "text-[#2B9CEF]" : "text-gray-300 hover:text-[#2B9CEF]"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/asylum"
              className={`inline-flex items-center px-1 pt-1 transition ${
                pathname === "/asylum" ? "text-[#2B9CEF]" : "text-gray-300 hover:text-[#2B9CEF]"
              }`}
            >
              Asylum
            </Link>
            <Link 
              href="/migration-breakdown"
              className={`inline-flex items-center px-1 pt-1 transition ${
                pathname === "/migration-breakdown" ? "text-[#2B9CEF]" : "text-gray-300 hover:text-[#2B9CEF]"
              }`}
            >
              Migration Breakdown
            </Link>
            <Link 
              href="/county-breakdown"
              className={`inline-flex items-center px-1 pt-1 transition ${
                pathname === "/county-breakdown" ? "text-[#2B9CEF]" : "text-gray-300 hover:text-[#2B9CEF]"
              }`}
            >
              County Breakdown
            </Link>
            <Link 
              href="/nationality-breakdown"
              className={`inline-flex items-center px-1 pt-1 transition ${
                pathname === "/nationality-breakdown" ? "text-[#2B9CEF]" : "text-gray-300 hover:text-[#2B9CEF]"
              }`}
            >
              Nationality Breakdown
            </Link>
          </div>

          {/* Flag Icons */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl cursor-default hover:opacity-80 transition-opacity" title="English">
              🇬🇧
            </span>
            <span className="text-2xl cursor-default hover:opacity-80 transition-opacity" title="Gaeilge">
              🇮🇪
            </span>
            <span className="text-2xl cursor-default hover:opacity-80 transition-opacity" title="Español">
              🇪🇸
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
