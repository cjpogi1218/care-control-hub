
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Reports = () => {
  const reports = [
    { title: "Monthly Patient Visits", period: "April 2025", count: 450 },
    { title: "Medicine Stock Status", period: "Current", items: 35 },
    { title: "Doctor Performance", period: "Q2 2025", doctors: 8 },
    { title: "Revenue Report", period: "April 2025", amount: "$75,000" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports Generation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <Card key={report.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Period: {report.period}</p>
              <p className="mt-2 text-2xl font-bold">
                {report.count || report.items || report.doctors || report.amount}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
