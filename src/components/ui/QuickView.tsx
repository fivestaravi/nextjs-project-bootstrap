"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface QuickViewProps {
  nationality?: string;
  county?: string;
  rejectionRate?: number;
}

export default function QuickView({ nationality, county, rejectionRate }: QuickViewProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;

    switch (value) {
      case "nationality":
        router.push(`/nationality-breakdown?nationality=${nationality}`);
        break;
      case "county":
        router.push(`/county-breakdown?county=${county}`);
        break;
      case "rejection":
        router.push(`/asylum?nationality=${nationality}&view=rejection`);
        break;
    }
  };

  return (
    <div className="mb-6 flex justify-end">
      <select
        onChange={handleOptionSelect}
        defaultValue=""
        className="bg-gray-800 border border-gray-700 text-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#2B9CEF] focus:border-transparent"
      >
        <option value="" disabled>
          {t.quickView}
        </option>
        <option value="nationality">
          {t.viewNationalityAcrossIreland}
        </option>
        <option value="county">
          {t.compareByCounty}
        </option>
        <option value="rejection">
          {t.exploreRejectionRate}
        </option>
      </select>
    </div>
  );
}
