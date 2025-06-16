"use client";

import { useState } from "react";
import { LineChart, BarChart, PieChart, HorizontalBarChart } from "@/components/Charts";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const years = [2019, 2020, 2021, 2022, 2023, 2024];
const countries = ["Nigeria", "Pakistan", "India", "Somalia", "Afghanistan"];
const viewModes = ["Yearly", "Monthly"] as const;

// Dummy data for charts
const applicationsPerMonth: Record<number, number[]> = {
  2019: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
  2020: [55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165],
  2021: [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
  2022: [65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175],
  2023: [70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
  2024: [75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185],
};

const applicationsPerYear: Record<number, number> = {
  2019: 1200,
  2020: 1500,
  2021: 1800,
  2022: 2100,
  2023: 2400,
  2024: 2700,
};

const topCountries = [
  { label: "Nigeria", value: 1200 },
  { label: "Pakistan", value: 900 },
  { label: "India", value: 850 },
  { label: "Somalia", value: 800 },
  { label: "Afghanistan", value: 750 },
];

const outcomeStatus = [
  { label: "Approved", value: 3000 },
  { label: "Refused", value: 1500 },
  { label: "Pending", value: 500 },
];

// Rejection analysis data
const rejectionRates = [
  { label: "Somalia", value: 45 },
  { label: "Pakistan", value: 42 },
  { label: "Afghanistan", value: 38 },
  { label: "Nigeria", value: 35 },
  { label: "India", value: 28 },
];

const approvalBreakdown = [
  {
    nationality: "Nigeria",
    total: 1000,
    approved: 650,
    refused: 250,
    pending: 100,
  },
  {
    nationality: "Pakistan",
    total: 800,
    approved: 464,
    refused: 256,
    pending: 80,
  },
  {
    nationality: "India",
    total: 1200,
    approved: 864,
    refused: 240,
    pending: 96,
  },
  {
    nationality: "Somalia",
    total: 600,
    approved: 330,
    refused: 210,
    pending: 60,
  },
  {
    nationality: "Afghanistan",
    total: 500,
    approved: 310,
    refused: 150,
    pending: 40,
  },
];

// Find nationality with highest rejection rate
const highestRejection = rejectionRates.reduce((prev, current) => 
  current.value > prev.value ? current : prev
);

// Dummy data for yearly applications by country
const applicationsByCountry: Record<string, Record<number, number>> = {
  Nigeria: {
    2019: 800,
    2020: 900,
    2021: 1000,
    2022: 1100,
    2023: 1200,
    2024: 1300,
  },
  Pakistan: {
    2019: 600,
    2020: 700,
    2021: 750,
    2022: 800,
    2023: 900,
    2024: 950,
  },
  India: {
    2019: 500,
    2020: 600,
    2021: 650,
    2022: 700,
    2023: 850,
    2024: 900,
  },
  Somalia: {
    2019: 400,
    2020: 500,
    2021: 600,
    2022: 650,
    2023: 800,
    2024: 850,
  },
  Afghanistan: {
    2019: 300,
    2020: 400,
    2021: 500,
    2022: 600,
    2023: 750,
    2024: 800,
  },
};

export default function AsylumPage() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [viewMode, setViewMode] = useState<typeof viewModes[number]>("Monthly");
  const [country1, setCountry1] = useState(countries[0]);
  const [country2, setCountry2] = useState(countries[1]);

  const country1Data = years.map(year => ({
    label: year.toString(),
    value: applicationsByCountry[country1][year]
  }));

  const country2Data = years.map(year => ({
    label: year.toString(),
    value: applicationsByCountry[country2][year]
  }));

  function exportToCSV() {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Month,Applications\n" +
      applicationsPerMonth[selectedYear]
        .map((val, idx) => `${idx + 1},${val}`)
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `applications_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Asylum Applications Analysis
      </h1>

      {/* Filters */}
      <div className="mb-6 flex justify-center gap-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value as typeof viewModes[number])}
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent"
        >
          {viewModes.map((mode) => (
            <option key={mode} value={mode}>
              {mode} View
            </option>
          ))}
        </select>
      </div>

      {/* Applications Over Time */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          Applications {viewMode === "Monthly" ? "Per Month" : "Per Year"}
        </h2>
        <div className="h-[300px]">
          {viewMode === "Monthly" ? (
            <LineChart data={applicationsPerMonth[selectedYear]} year={selectedYear} />
          ) : (
            <BarChart
              data={Object.entries(applicationsPerYear).map(([year, value]) => ({
                label: year,
                value,
              }))}
              label="Total Applications"
            />
          )}
        </div>
      </div>

      {/* Rejection Analysis Summary */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-100">
              Highest Rejection Rate (2024)
            </h2>
            <p className="text-4xl font-bold text-[#2B9CEF] mt-2">
              {highestRejection.label}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Rejection Rate</p>
            <p className="text-2xl font-semibold text-gray-100">
              {highestRejection.value}%
            </p>
          </div>
        </div>
      </div>

      {/* Bar Chart and Pie Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Bar Chart */}
        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Top 5 Origin Countries</h2>
          <div className="h-[300px]">
            <BarChart data={topCountries} label="Number of Applications" />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Outcome Status</h2>
          <div className="h-[300px]">
            <PieChart data={outcomeStatus} />
          </div>
        </div>
      </div>

      {/* Rejection Rate Chart */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          Rejection Rate by Nationality
        </h2>
        <div className="h-[400px]">
          <HorizontalBarChart
            data={rejectionRates}
            label="Rejection Rate (%)"
          />
        </div>
      </div>

      {/* Approval vs Rejection Table */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">
          Approval vs Rejection Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-200">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-2 text-left">Nationality</th>
                <th className="px-4 py-2 text-right">Total</th>
                <th className="px-4 py-2 text-right">Approved</th>
                <th className="px-4 py-2 text-right">Refused</th>
                <th className="px-4 py-2 text-right">Pending</th>
                <th className="px-4 py-2 text-right">Rejection Rate</th>
              </tr>
            </thead>
            <tbody>
              {approvalBreakdown.map((row) => (
                <tr key={row.nationality} className="border-b border-gray-700">
                  <td className="px-4 py-2">{row.nationality}</td>
                  <td className="px-4 py-2 text-right">{row.total}</td>
                  <td className="px-4 py-2 text-right">{row.approved}</td>
                  <td className="px-4 py-2 text-right">{row.refused}</td>
                  <td className="px-4 py-2 text-right">{row.pending}</td>
                  <td className="px-4 py-2 text-right">
                    {((row.refused / row.total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Country Comparison Section */}
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="country-comparison" className="border-gray-700">
          <AccordionTrigger className="text-xl font-semibold text-gray-100 hover:no-underline">
            Country Comparison
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Country 1 Selector */}
                <div className="flex flex-col items-center">
                  <label htmlFor="country1" className="mb-2 text-gray-300">
                    Select First Country
                  </label>
                  <select
                    id="country1"
                    value={country1}
                    onChange={(e) => setCountry1(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Country 2 Selector */}
                <div className="flex flex-col items-center">
                  <label htmlFor="country2" className="mb-2 text-gray-300">
                    Select Second Country
                  </label>
                  <select
                    id="country2"
                    value={country2}
                    onChange={(e) => setCountry2(e.target.value)}
                    className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comparison Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Country 1 Chart */}
                <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-100">{country1}</h2>
                  <div className="h-[300px]">
                    <BarChart data={country1Data} label={`Applications from ${country1}`} />
                  </div>
                </div>

                {/* Country 2 Chart */}
                <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-gray-100">{country2}</h2>
                  <div className="h-[300px]">
                    <BarChart data={country2Data} label={`Applications from ${country2}`} />
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-center">
        <button
          onClick={exportToCSV}
          className="bg-[#2B9CEF] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Export to CSV
        </button>
      </div>
    </section>
  );
}
