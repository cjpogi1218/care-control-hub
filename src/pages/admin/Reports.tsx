
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileChartLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();
  const reports = [
    { title: "Monthly Patient Visits", period: "April 2025", count: 450 },
    { title: "Medicine Stock Status", period: "Current", items: 35 },
    { title: "Doctor Performance", period: "Q2 2025", doctors: 8 },
    { title: "Revenue Report", period: "April 2025", amount: "$75,000" },
  ];

  const handleGenerateReport = (reportTitle: string) => {
    toast({
      title: "Generating Report",
      description: `${reportTitle} is being generated. Please wait...`,
    });

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: `${reportTitle} has been generated successfully.`,
      });
    }, 2000);
  };

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
              <Button 
                className="mt-4 w-full flex items-center gap-2"
                onClick={() => handleGenerateReport(report.title)}
              >
                <FileChartLine className="h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
