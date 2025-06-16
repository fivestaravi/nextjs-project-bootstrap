"use client";

import { useState } from "react";
import { BarChart } from "@/components/Charts";

const countries = ["Nigeria", "Pakistan", "India", "Somalia", "Afghanistan"];
const years = [2019, 2020, 2021, 2022, 2023, 2024];

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

export default function CountryComparisonPage() {
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

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Country Comparison
      </h1>

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
    </section>
  );
}
