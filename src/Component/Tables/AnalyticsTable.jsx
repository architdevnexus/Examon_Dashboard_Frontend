import React from "react";
import { FaMoneyBillWave, FaChartPie, FaBuilding } from "react-icons/fa";
import Data from "../../DataStore/DataStore.json";

export default function AnalyticsTable() {
  const revenueSummary = Data.admins[0].revenue_summary.currentyear.July;
  const revenueDetails = Data.admins[0].revenue_details.monthly["2025-07"];

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">July 2025 Revenue Overview</h2>

      {/* Total Revenue and Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-blue-900 flex items-center gap-2">
            <FaMoneyBillWave className="text-green-600" /> Total Revenue
          </h3>
          <p className="text-2xl font-bold text-blue-700 mt-2">₹ {revenueSummary.total.toLocaleString()}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-green-900 flex items-center gap-2">
            <FaChartPie className="text-green-700" /> Breakdown
          </h3>
          <ul className="mt-2 space-y-1 text-green-800">
            <li>• Commissions: ₹ {revenueSummary.breakdown.commissions.toLocaleString()}</li>
            <li>• Ads: ₹ {revenueSummary.breakdown.ads.toLocaleString()}</li>
            <li>• Premium Subscriptions: ₹ {revenueSummary.breakdown.premium_subscriptions.toLocaleString()}</li>
          </ul>
        </div>
      </div>

      {/* Retailer Breakdown Table */}
      <div className="bg-gray-50 rounded-lg p-4 shadow-md overflow-x-auto">
        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <FaBuilding className="text-gray-600" /> Retailer Revenue Breakdown
        </h3>
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-600 bg-gray-100">
              <th className="p-2">Retailer</th>
              <th className="p-2">Total Revenue</th>
              <th className="p-2">Products</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(revenueDetails.retailers).map(([id, retailer]) => (
              <tr key={id} className="border-b hover:bg-gray-50 transition">
                <td className="p-2 font-medium">{retailer.retailer_name}</td>
                <td className="p-2 text-green-700 font-semibold">₹ {retailer.revenue.toLocaleString()}</td>
                <td className="p-2">
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {retailer.products.map((product) => (
                      <li key={product.product_id}>
                        {product.name} — ₹ {product.revenue.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
