"use client";

import { useState } from "react";
import { PieChart, BarChart } from "@/components/Charts";
import Tooltip from "@/components/ui/Tooltip";

type MigrationType = "Asylum" | "Student" | "Worker" | "Family";
type Nationality = "Nigeria" | "India" | "Brazil" | "Pakistan" | "China" | "Somalia";
type TimeView = "monthly" | "yearly";

interface MigrationData {
  overall: { label: string; value: number }[];
  byNationality: Record<MigrationType, { nationality: string; count: number }[]>;
  countryBreakdown: Record<Nationality, {
    reasons: Record<MigrationType, number>;
    counties: { name: string; count: number }[];
    yearlyTrend: { year: number; count: number }[];
    monthlyTrend: { month: number; count: number }[];
  }>;
}

// Sample data
const migrationData: MigrationData = {
  overall: [
    { label: "Asylum", value: 35 },
    { label: "Student", value: 30 },
    { label: "Worker", value: 25 },
    { label: "Family", value: 10 },
  ],
  byNationality: {
    Asylum: [
      { nationality: "Nigeria", count: 2500 },
      { nationality: "Somalia", count: 1800 },
      { nationality: "Pakistan", count: 1500 },
      { nationality: "Afghanistan", count: 1200 },
      { nationality: "Syria", count: 1000 },
    ],
    Student: [
      { nationality: "India", count: 3000 },
      { nationality: "China", count: 2500 },
      { nationality: "Brazil", count: 1500 },
      { nationality: "Pakistan", count: 1200 },
      { nationality: "Nigeria", count: 1000 },
    ],
    Worker: [
      { nationality: "Brazil", count: 2000 },
      { nationality: "India", count: 1800 },
      { nationality: "Philippines", count: 1500 },
      { nationality: "Poland", count: 1200 },
      { nationality: "Romania", count: 1000 },
    ],
    Family: [
      { nationality: "India", count: 800 },
      { nationality: "China", count: 700 },
      { nationality: "Pakistan", count: 600 },
      { nationality: "Nigeria", count: 500 },
      { nationality: "Brazil", count: 400 },
    ],
  },
  countryBreakdown: {
    Nigeria: {
      reasons: {
        Asylum: 45,
        Student: 25,
        Worker: 20,
        Family: 10,
      },
      counties: [
        { name: "Dublin", count: 3000 },
        { name: "Cork", count: 1500 },
        { name: "Galway", count: 1000 },
      ],
      yearlyTrend: [
        { year: 2020, count: 2000 },
        { year: 2021, count: 2500 },
        { year: 2022, count: 3000 },
        { year: 2023, count: 3500 },
        { year: 2024, count: 4000 },
      ],
      monthlyTrend: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        count: Math.floor(Math.random() * 500) + 200
      }))
    },
    // ... (similar structure for other nationalities)
  } as Record<Nationality, any>, // Type assertion for brevity
};

export default function MigrationBreakdownPage() {
  const [selectedNationality, setSelectedNationality] = useState<Nationality | null>(null);
  const [timeView, setTimeView] = useState<TimeView>("monthly");

  const nationalities = Object.keys(migrationData.countryBreakdown) as Nationality[];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Migration Breakdown Analysis
      </h1>

      {/* Overall Distribution */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-100">
            Overall Migration Purpose Distribution
          </h2>
          <Tooltip text="Distribution of migration purposes across all applications" />
        </div>
        <div className="h-[300px]">
          <PieChart data={migrationData.overall} />
        </div>
      </div>

      {/* Major Immigrant Groups by Reason */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          Major Immigrant Groups by Type
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(Object.keys(migrationData.byNationality) as MigrationType[]).map((type) => (
            <div key={type} className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">{type}</h3>
              <div className="h-[200px]">
                <BarChart
                  data={migrationData.byNationality[type].map(item => ({
                    label: item.nationality,
                    value: item.count
                  }))}
                  label="Number of Migrants"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country Drilldown */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-100">
            Country-Specific Analysis
          </h2>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setTimeView("monthly")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-700 
                ${timeView === "monthly"
                  ? "bg-[#2B9CEF] text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
              Monthly View
            </button>
            <button
              onClick={() => setTimeView("yearly")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg border border-l-0 border-gray-700 
                ${timeView === "yearly"
                  ? "bg-[#2B9CEF] text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
            >
              Yearly View
            </button>
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <select
            value={selectedNationality || ""}
            onChange={(e) => setSelectedNationality(e.target.value as Nationality)}
            className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent"
          >
            <option value="">Select a nationality</option>
            {nationalities.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
        </div>

        {selectedNationality && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">
                Migration Type Breakdown
              </h3>
              <div className="h-[250px]">
                <PieChart
                  data={Object.entries(migrationData.countryBreakdown[selectedNationality].reasons).map(
                    ([key, value]) => ({ label: key, value })
                  )}
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">
                Geographic Distribution
              </h3>
              <div className="h-[250px]">
                <BarChart
                  data={migrationData.countryBreakdown[selectedNationality].counties.map(county => ({
                    label: county.name,
                    value: county.count
                  }))}
                  label="Number of Residents"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">
                {timeView === "yearly" ? "Year-by-Year Trend" : "Month-by-Month Trend"}
              </h3>
              <div className="h-[250px]">
                <BarChart
                  data={
                    timeView === "yearly"
                      ? migrationData.countryBreakdown[selectedNationality].yearlyTrend.map(item => ({
                          label: item.year.toString(),
                          value: item.count
                        }))
                      : migrationData.countryBreakdown[selectedNationality].monthlyTrend.map(item => ({
                          label: item.month.toString(),
                          value: item.count
                        }))
                  }
                  label="Number of Migrants"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
