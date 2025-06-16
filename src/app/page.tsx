"use client";

import Link from "next/link";

// Dummy data for KPIs
const kpiData = {
  totalApplications: 12345,
  topMigrationType: "Student Visa",
  topNationality: {
    name: "Nigeria",
    applications: 2845
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Irish Migration Dashboard
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-12">
            Data-driven insights on who's coming to Ireland, and why.
          </p>
          <Link
            href="/asylum"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-[#2B9CEF] rounded-lg hover:bg-blue-600 transition"
          >
            Explore the Dashboard
          </Link>
        </div>
      </section>

      {/* KPI Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Applications */}
            <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-400">Total Asylum Applications (YTD)</h3>
              <p className="text-4xl font-bold text-[#2B9CEF] mt-2">
                {kpiData.totalApplications.toLocaleString()}
              </p>
            </div>

            {/* Top Migration Type */}
            <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-400">Top Migration Type (2025)</h3>
              <p className="text-4xl font-bold text-[#2B9CEF] mt-2">
                {kpiData.topMigrationType}
              </p>
            </div>

            {/* Top Nationality */}
            <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-400">Top Nationality by Asylum Applications (2025)</h3>
              <p className="text-4xl font-bold text-[#2B9CEF] mt-2">
                {kpiData.topNationality.name}
              </p>
              <p className="text-lg text-gray-400 mt-1">
                {kpiData.topNationality.applications.toLocaleString()} applications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 bg-opacity-90 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">
              About the Dashboard
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              The Irish Migration Dashboard provides comprehensive insights into Ireland's migration patterns. 
              Our platform combines official data sources with advanced analytics to help 
              policymakers, researchers, and the public understand migration trends, asylum 
              applications, and demographic changes across Ireland.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                GitHub Repository
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
              >
                Data Sources
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/nationality-breakdown"
              className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                Search by Nationality
              </h3>
              <p className="text-gray-400">
                Explore detailed migration statistics for specific nationalities
              </p>
            </Link>
            <Link
              href="/asylum"
              className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg hover:bg-gray-700 transition"
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                Compare Countries
              </h3>
              <p className="text-gray-400">
                Analyze and compare migration patterns between different countries
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
