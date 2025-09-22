import React from "react";

export default function MeterView() {
  const meter = { id: "MTR-459821", usage: 350, unit: "kWh" };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Meter Information</h2>
      <div className="border rounded-lg p-4">
        <p>
          <strong>Meter ID:</strong> {meter.id}
        </p>
        <p>
          <strong>Usage:</strong> {meter.usage} {meter.unit}
        </p>
      </div>
    </div>
  );
}
