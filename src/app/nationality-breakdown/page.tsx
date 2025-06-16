"use client";

import { useState } from "react";
import { BarChart, LineChart, PieChart, HorizontalBarChart } from "@/components/Charts";
import Image from "next/image";

type MigrationType = "Asylum" | "Student" | "Worker";
type Nationality = "Nigeria" | "Pakistan" | "India" | "Somalia" | "Afghanistan";

// Sample data
const nationalities: Nationality[] = ["Nigeria", "Pakistan", "India", "Somalia", "Afghanistan"];
const years = [2019, 2020, 2021, 2022, 2023, 2024];

interface NationalityStats {
  totalPopulation: number;
  asylumByYear: { year: number; applications: number }[];
  rejectionRateByYear: { year: number; rate: number }[];
  topCounties: { county: string; population: number }[];
  migrationTypeBreakdown: { label: MigrationType; value: number }[];
  approvalStats: {
    approved: number;
    rejected: number;
    pending: number;
  };
}

// Sample nationality statistics
const nationalityStats: Record<Nationality, NationalityStats> = {
  Nigeria: {
    totalPopulation: 15000,
    asylumByYear: [
      { year: 2019, applications: 800 },
      { year: 2020, applications: 1200 },
      { year: 2021, applications: 1500 },
      { year: 2022, applications: 1800 },
      { year: 2023, applications: 2200 },
      { year: 2024, applications: 2500 },
    ],
    rejectionRateByYear: [
      { year: 2019, rate: 25 },
      { year: 2020, rate: 28 },
      { year: 2021, rate: 22 },
      { year: 2022, rate: 20 },
      { year: 2023, rate: 18 },
      { year: 2024, rate: 15 },
    ],
    topCounties: [
      { county: "Dublin", population: 5000 },
      { county: "Cork", population: 2500 },
      { county: "Galway", population: 1800 },
      { county: "Limerick", population: 1200 },
      { county: "Waterford", population: 900 },
    ],
    migrationTypeBreakdown: [
      { label: "Asylum", value: 45 },
      { label: "Student", value: 35 },
      { label: "Worker", value: 20 },
    ],
    approvalStats: {
      approved: 1800,
      rejected: 400,
      pending: 300,
    },
  },
  // Add similar data structure for other nationalities...
  Pakistan: {
    totalPopulation: 12000,
    asylumByYear: [
      { year: 2019, applications: 600 },
      { year: 2020, applications: 900 },
      { year: 2021, applications: 1200 },
      { year: 2022, applications: 1500 },
      { year: 2023, applications: 1800 },
      { year: 2024, applications: 2000 },
    ],
    rejectionRateByYear: [
      { year: 2019, rate: 30 },
      { year: 2020, rate: 28 },
      { year: 2021, rate: 25 },
      { year: 2022, rate: 22 },
      { year: 2023, rate: 20 },
      { year: 2024, rate: 18 },
    ],
    topCounties: [
      { county: "Dublin", population: 4000 },
      { county: "Cork", population: 2000 },
      { county: "Galway", population: 1500 },
      { county: "Limerick", population: 1000 },
      { county: "Waterford", population: 800 },
    ],
    migrationTypeBreakdown: [
      { label: "Asylum", value: 40 },
      { label: "Student", value: 40 },
      { label: "Worker", value: 20 },
    ],
    approvalStats: {
      approved: 1500,
      rejected: 300,
      pending: 200,
    },
  },
  India: {
    totalPopulation: 18000,
    asylumByYear: [
      { year: 2019, applications: 1000 },
      { year: 2020, applications: 1400 },
      { year: 2021, applications: 1800 },
      { year: 2022, applications: 2200 },
      { year: 2023, applications: 2600 },
      { year: 2024, applications: 3000 },
    ],
    rejectionRateByYear: [
      { year: 2019, rate: 20 },
      { year: 2020, rate: 18 },
      { year: 2021, rate: 15 },
      { year: 2022, rate: 12 },
      { year: 2023, rate: 10 },
      { year: 2024, rate: 8 },
    ],
    topCounties: [
      { county: "Dublin", population: 6000 },
      { county: "Cork", population: 3000 },
      { county: "Galway", population: 2500 },
      { county: "Limerick", population: 2000 },
      { county: "Waterford", population: 1500 },
    ],
    migrationTypeBreakdown: [
      { label: "Asylum", value: 20 },
      { label: "Student", value: 50 },
      { label: "Worker", value: 30 },
    ],
    approvalStats: {
      approved: 2500,
      rejected: 300,
      pending: 200,
    },
  },
  Somalia: {
    totalPopulation: 8000,
    asylumByYear: [
      { year: 2019, applications: 400 },
      { year: 2020, applications: 600 },
      { year: 2021, applications: 800 },
      { year: 2022, applications: 1000 },
      { year: 2023, applications: 1200 },
      { year: 2024, applications: 1400 },
    ],
    rejectionRateByYear: [
      { year: 2019, rate: 35 },
      { year: 2020, rate: 32 },
      { year: 2021, rate: 30 },
      { year: 2022, rate: 28 },
      { year: 2023, rate: 25 },
      { year: 2024, rate: 22 },
    ],
    topCounties: [
      { county: "Dublin", population: 3000 },
      { county: "Cork", population: 1500 },
      { county: "Galway", population: 1000 },
      { county: "Limerick", population: 800 },
      { county: "Waterford", population: 600 },
    ],
    migrationTypeBreakdown: [
      { label: "Asylum", value: 60 },
      { label: "Student", value: 25 },
      { label: "Worker", value: 15 },
    ],
    approvalStats: {
      approved: 1000,
      rejected: 300,
      pending: 100,
    },
  },
  Afghanistan: {
    totalPopulation: 10000,
    asylumByYear: [
      { year: 2019, applications: 500 },
      { year: 2020, applications: 800 },
      { year: 2021, applications: 1100 },
      { year: 2022, applications: 1400 },
      { year: 2023, applications: 1700 },
      { year: 2024, applications: 2000 },
    ],
    rejectionRateByYear: [
      { year: 2019, rate: 28 },
      { year: 2020, rate: 25 },
      { year: 2021, rate: 22 },
      { year: 2022, rate: 20 },
      { year: 2023, rate: 18 },
      { year: 2024, rate: 15 },
    ],
    topCounties: [
      { county: "Dublin", population: 3500 },
      { county: "Cork", population: 1800 },
      { county: "Galway", population: 1400 },
      { county: "Limerick", population: 1000 },
      { county: "Waterford", population: 800 },
    ],
    migrationTypeBreakdown: [
      { label: "Asylum", value: 55 },
      { label: "Student", value: 30 },
      { label: "Worker", value: 15 },
    ],
    approvalStats: {
      approved: 1600,
      rejected: 250,
      pending: 150,
    },
  },
};

export default function NationalityBreakdownPage() {
  const [selectedNationality, setSelectedNationality] = useState<Nationality>("Nigeria");
  const stats = nationalityStats[selectedNationality];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Nationality Breakdown Analysis
      </h1>

      {/* Nationality Selector */}
      <div className="mb-8 flex justify-center">
        <select
          value={selectedNationality}
          onChange={(e) => setSelectedNationality(e.target.value as Nationality)}
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent"
        >
          {nationalities.map((nationality) => (
            <option key={nationality} value={nationality}>
              {nationality}
            </option>
          ))}
        </select>
      </div>

      {/* Total Population Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Total Population</h2>
          <p className="text-4xl font-bold text-[#2B9CEF] mt-2">
            {stats.totalPopulation.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Approval Rate</h2>
          <p className="text-4xl font-bold text-[#2B9CEF] mt-2">
            {Math.round((stats.approvalStats.approved / 
              (stats.approvalStats.approved + stats.approvalStats.rejected)) * 100)}%
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Pending Cases</h2>
          <p className="text-4xl font-bold text-[#2B9CEF] mt-2">
            {stats.approvalStats.pending.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asylum Applications Over Time */}
        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            Asylum Applications per Year
          </h2>
          <div className="h-[300px]">
            <LineChart 
              data={stats.asylumByYear.map(d => d.applications)}
              year={2024}
            />
          </div>
        </div>

        {/* Rejection Rate Over Time */}
        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            Rejection Rate Over Time
          </h2>
          <div className="h-[300px]">
            <LineChart 
              data={stats.rejectionRateByYear.map(d => d.rate)}
              year={2024}
            />
          </div>
        </div>

        {/* Top Counties */}
        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            Top Counties of Residence
          </h2>
          <div className="h-[300px]">
            <BarChart 
              data={stats.topCounties.map(c => ({ 
                label: c.county, 
                value: c.population 
              }))}
              label="Population"
            />
          </div>
        </div>

        {/* Migration Type Breakdown */}
        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            Migration Type Breakdown
          </h2>
          <div className="h-[300px]">
            <PieChart data={stats.migrationTypeBreakdown} />
          </div>
        </div>

        {/* Approval vs Rejection */}
        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg col-span-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            Application Status Breakdown
          </h2>
          <div className="h-[200px]">
            <HorizontalBarChart 
              data={[
                { label: "Approved", value: stats.approvalStats.approved },
                { label: "Rejected", value: stats.approvalStats.rejected },
                { label: "Pending", value: stats.approvalStats.pending },
              ]}
              label="Number of Applications"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
