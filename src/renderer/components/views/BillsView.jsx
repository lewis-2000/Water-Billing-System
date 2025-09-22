import React from "react";

export default function BillsView() {
  const bills = [
    { id: 1, month: "August 2025", amount: 1200, status: "Paid" },
    { id: 2, month: "September 2025", amount: 800, status: "Pending" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Bills</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Month</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id} className="text-center">
              <td className="p-2 border">{bill.month}</td>
              <td className="p-2 border">${bill.amount}</td>
              <td
                className={`p-2 border font-medium ${
                  bill.status === "Paid" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {bill.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
