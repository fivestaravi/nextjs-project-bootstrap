"use client";

import { useState } from "react";
import { BarChart } from "@/components/Charts";
import Image from "next/image";

type MigrationType = "Asylum" | "Student" | "Worker";
type Nationality = "Nigeria" | "Pakistan" | "India" | "Somalia" | "Afghanistan";

interface CountyStats {
  county: string;
  nationalities: {
    name: string;
    population: number;
    breakdown: Record<MigrationType, number>;
  }[];
}

// Sample data
const years = [2019, 2020, 2021, 2022, 2023, 2024];
const counties = [
  "Dublin", "Cork", "Galway", "Limerick", "Waterford",
  "Kerry", "Mayo", "Donegal", "Clare", "Wicklow"
];

// Sample county statistics
const countyStats: CountyStats[] = [
  {
    county: "Dublin",
    nationalities: [
      {
        name: "Nigeria",
        population: 2000,
        breakdown: { Asylum: 60, Student: 30, Worker: 10 }
      },
      {
        name: "India",
        population: 1500,
        breakdown: { Asylum: 20, Student: 50, Worker: 30 }
      },
      {
        name: "Pakistan",
        population: 1200,
        breakdown: { Asylum: 40, Student: 40, Worker: 20 }
      }
    ]
  },
  {
    county: "Cork",
    nationalities: [
      {
        name: "India",
        population: 1000,
        breakdown: { Asylum: 30, Student: 45, Worker: 25 }
      },
      {
        name: "Nigeria",
        population: 800,
        breakdown: { Asylum: 50, Student: 35, Worker: 15 }
      },
      {
        name: "Somalia",
        population: 600,
        breakdown: { Asylum: 70, Student: 20, Worker: 10 }
      }
    ]
  },
  {
    county: "Galway",
    nationalities: [
      {
        name: "India",
        population: 900,
        breakdown: { Asylum: 25, Student: 55, Worker: 20 }
      },
      {
        name: "China",
        population: 700,
        breakdown: { Asylum: 15, Student: 65, Worker: 20 }
      },
      {
        name: "Nigeria",
        population: 500,
        breakdown: { Asylum: 45, Student: 40, Worker: 15 }
      }
    ]
  }
];

export default function CountyBreakdownPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);

  const handleCountySelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedCounties(selected);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
        County Breakdown Analysis
      </h1>

      {/* Filters */}
      <div className="mb-8 flex justify-center space-x-4">
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
          multiple
          value={selectedCounties}
          onChange={handleCountySelection}
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent min-h-[120px]"
        >
          {counties.map((county) => (
            <option key={county} value={county}>
              {county}
            </option>
          ))}
        </select>
      </div>

      {selectedCounties.length === 0 ? (
        <div className="text-center text-gray-400 mt-8">
          Please select one or more counties to view details.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {selectedCounties.map((countyName) => {
            const countyData = countyStats.find(c => c.county === countyName);
            if (!countyData) return null;

            return (
              <div key={countyName} className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-100">
                  {countyName}
                </h2>
                
                {countyData.nationalities.map((nat, index) => (
                  <div key={nat.name} className="mb-6 last:mb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg text-gray-200">{nat.name}</h3>
                      <span className="text-[#2B9CEF] font-semibold">
                        {nat.population.toLocaleString()} residents
                      </span>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(nat.breakdown).map(([type, percentage]) => (
                        <div key={type} className="flex items-center">
                          <span className="w-20 text-sm text-gray-400">{type}</span>
                          <div className="flex-1 ml-4">
                            <div className="h-2 bg-gray-700 rounded-full">
                              <div
                                className="h-2 bg-[#2B9CEF] rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-4 text-sm text-gray-400">
                            {percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
