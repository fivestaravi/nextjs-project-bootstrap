"use client";

import { useState } from "react";
import { HorizontalBarChart } from "@/components/Charts";

type Status = "Approved" | "Refused" | "Pending";

const years = [2019, 2020, 2021, 2022, 2023, 2024];
const statuses: Status[] = ["Approved", "Refused", "Pending"];

// Dummy data for rejection rates
const rejectionRates = [
  { label: "Nigeria", value: 35 },
  { label: "Pakistan", value: 42 },
  { label: "India", value: 28 },
  { label: "Somalia", value: 45 },
  { label: "Afghanistan", value: 38 },
];

// Dummy data for approval breakdown
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

export default function RejectionAnalysisPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedStatus, setSelectedStatus] = useState<Status>("Refused");

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Rejection Analysis
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
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as Status)}
          className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Card */}
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

      {/* Horizontal Bar Chart */}
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
      <div className="bg-gray-800 bg-opacity-90 rounded-xl p-6 shadow-lg">
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
    </section>
  );
}
