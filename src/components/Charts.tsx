"use client";

import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function LineChart({ data, year }: { data: number[], year: number }) {
  const chartData = {
    labels: months,
    datasets: [
      {
        label: `Applications in ${year}`,
        data: data,
        borderColor: "#2B9CEF",
        backgroundColor: "rgba(43, 156, 239, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#e0e0e0",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#e0e0e0" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        ticks: { color: "#e0e0e0" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export function BarChart({ data, label }: { data: { label: string; value: number }[], label: string }) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label,
        data: data.map(d => d.value),
        backgroundColor: "#2B9CEF",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#e0e0e0",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#e0e0e0" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        ticks: { color: "#e0e0e0" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export function PieChart({ data }: { data: { label: string; value: number }[] }) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: [
          "#2B9CEF",
          "#6C757D",
          "#28A745",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#e0e0e0",
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
}

export function HorizontalBarChart({ 
  data, 
  label 
}: { 
  data: { label: string; value: number }[]; 
  label: string; 
}) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        label,
        data: data.map(d => d.value),
        backgroundColor: "#2B9CEF",
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#e0e0e0",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#e0e0e0" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        beginAtZero: true,
      },
      y: {
        ticks: { color: "#e0e0e0" },
        grid: { display: false },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
