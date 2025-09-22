import React from "react";

export default function PaymentStatusView() {
  const payments = [
    { id: 1, status: "Paid", amount: 1200, date: "2025-09-01" },
    { id: 2, status: "Pending", amount: 800, date: "2025-09-15" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Payment Status</h2>
      <ul className="space-y-3">
        {payments.map((p) => (
          <li key={p.id} className="border rounded-lg p-3 flex justify-between">
            <div>
              <p className="font-medium">Amount: ${p.amount}</p>
              <p className="text-sm text-gray-500">Date: {p.date}</p>
            </div>
            <span
              className={`px-2 py-1 rounded text-white ${
                p.status === "Paid" ? "bg-green-600" : "bg-yellow-600"
              }`}
            >
              {p.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
