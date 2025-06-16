"use client";

import { useState } from "react";
import { LineChart, BarChart, PieChart, HorizontalBarChart } from "@/components/Charts";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const years = [2019, 2020, 2021, 2022, 2023, 2024];
const countries = ["Nigeria", "Pakistan", "India", "Somalia", "Afghanistan"];

// Dummy data for charts
const applicationsPerMonth: Record<number, number[]> = {
  2019: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
  2020: [55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165],
  2021: [60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
  2022: [65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175],
  2023: [70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
  2024: [75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185],
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

// Dummy data for asylum decisions by nationality
const asylumDecisions: Record<string, {
  currentStatus: { approved: number; rejected: number; pending: number };
  trends: { year: number; approved: number; rejected: number; pending: number }[];
}> = {
  Nigeria: {
    currentStatus: { approved: 65, rejected: 25, pending: 10 },
    trends: [
      { year: 2020, approved: 55, rejected: 35, pending: 10 },
      { year: 2021, approved: 58, rejected: 32, pending: 10 },
      { year: 2022, approved: 60, rejected: 30, pending: 10 },
      { year: 2023, approved: 62, rejected: 28, pending: 10 },
      { year: 2024, approved: 65, rejected: 25, pending: 10 },
    ]
  },
  Pakistan: {
    currentStatus: { approved: 58, rejected: 32, pending: 10 },
    trends: [
      { year: 2020, approved: 50, rejected: 40, pending: 10 },
      { year: 2021, approved: 52, rejected: 38, pending: 10 },
      { year: 2022, approved: 54, rejected: 36, pending: 10 },
      { year: 2023, approved: 56, rejected: 34, pending: 10 },
      { year: 2024, approved: 58, rejected: 32, pending: 10 },
    ]
  },
  India: {
    currentStatus: { approved: 72, rejected: 18, pending: 10 },
    trends: [
      { year: 2020, approved: 65, rejected: 25, pending: 10 },
      { year: 2021, approved: 67, rejected: 23, pending: 10 },
      { year: 2022, approved: 68, rejected: 22, pending: 10 },
      { year: 2023, approved: 70, rejected: 20, pending: 10 },
      { year: 2024, approved: 72, rejected: 18, pending: 10 },
    ]
  },
  Somalia: {
    currentStatus: { approved: 75, rejected: 15, pending: 10 },
    trends: [
      { year: 2020, approved: 68, rejected: 22, pending: 10 },
      { year: 2021, approved: 70, rejected: 20, pending: 10 },
      { year: 2022, approved: 72, rejected: 18, pending: 10 },
      { year: 2023, approved: 73, rejected: 17, pending: 10 },
      { year: 2024, approved: 75, rejected: 15, pending: 10 },
    ]
  },
  Afghanistan: {
    currentStatus: { approved: 80, rejected: 12, pending: 8 },
    trends: [
      { year: 2020, approved: 70, rejected: 20, pending: 10 },
      { year: 2021, approved: 73, rejected: 18, pending: 9 },
      { year: 2022, approved: 75, rejected: 16, pending: 9 },
      { year: 2023, approved: 78, rejected: 14, pending: 8 },
      { year: 2024, approved: 80, rejected: 12, pending: 8 },
    ]
  },
};

export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [country1, setCountry1] = useState(countries[0]);
  const [country2, setCountry2] = useState(countries[1]);
  const [selectedNationality, setSelectedNationality] = useState<string | null>(null);

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
        Asylum Applications Dashboard
      </h1>

      <div className="mb-6 flex justify-center">
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
      </div>

      {/* Line Chart */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Applications Per Month</h2>
        <div className="h-[300px]">
          <LineChart data={applicationsPerMonth[selectedYear]} year={selectedYear} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Top 5 Origin Countries</h2>
        <div className="h-[300px]">
          <BarChart data={topCountries} label="Number of Applications" />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Outcome Status</h2>
        <div className="h-[300px]">
          <PieChart data={outcomeStatus} />
        </div>
      </div>

      {/* Asylum Decision Analysis */}
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Asylum Decision Analysis</h2>
        <div className="mb-6 flex justify-center">
          <select
            value={selectedNationality || ""}
            onChange={(e) => setSelectedNationality(e.target.value || null)}
            className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent"
          >
            <option value="">Select a nationality</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {selectedNationality && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Status */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Current Decision Status</h3>
              <div className="h-[250px]">
                <HorizontalBarChart
                  data={[
                    { label: "Approved", value: asylumDecisions[selectedNationality].currentStatus.approved },
                    { label: "Rejected", value: asylumDecisions[selectedNationality].currentStatus.rejected },
                    { label: "Pending", value: asylumDecisions[selectedNationality].currentStatus.pending },
                  ]}
                  label="Percentage"
                />
              </div>
            </div>

            {/* Trends */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Decision Trends (2020-2024)</h3>
              <div className="h-[250px]">
                <LineChart
                  data={asylumDecisions[selectedNationality].trends.map(t => t.approved)}
                  year={2024}
                />
              </div>
            </div>
          </div>
        )}
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
