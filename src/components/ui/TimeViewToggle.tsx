"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TimeViewToggleProps {
  view: "monthly" | "yearly";
  onChange: (view: "monthly" | "yearly") => void;
}

export default function TimeViewToggle({ view, onChange }: TimeViewToggleProps) {
  const { t } = useLanguage();

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={`px-4 py-2 text-sm font-medium rounded-l-lg border border-gray-700 
          ${view === "monthly"
            ? "bg-[#2B9CEF] text-white"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
      >
        {t.monthlyView}
      </button>
      <button
        type="button"
        onClick={() => onChange("yearly")}
        className={`px-4 py-2 text-sm font-medium rounded-r-lg border border-l-0 border-gray-700 
          ${view === "yearly"
            ? "bg-[#2B9CEF] text-white"
            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
      >
        {t.yearlyView}
      </button>
    </div>
  );
}

// Helper function to format axis labels based on view mode
export function getAxisLabels(view: "monthly" | "yearly", t: any) {
  return {
    xAxis: view === "monthly" ? t.month : t.year,
    yAxis: t.applications
  };
}
