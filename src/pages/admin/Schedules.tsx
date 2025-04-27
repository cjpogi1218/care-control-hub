
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Schedules = () => {
  const schedules = [
    { id: 1, doctor: "Dr. Sarah Wilson", date: "2025-04-28", time: "09:00 AM", department: "Cardiology" },
    { id: 2, doctor: "Dr. Michael Brown", date: "2025-04-28", time: "10:30 AM", department: "Pediatrics" },
    { id: 3, doctor: "Dr. Sarah Wilson", date: "2025-04-29", time: "02:00 PM", department: "Cardiology" },
    { id: 4, doctor: "Dr. Michael Brown", date: "2025-04-29", time: "03:30 PM", department: "Pediatrics" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Doctor Schedules</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Department</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>{schedule.doctor}</TableCell>
              <TableCell>{schedule.date}</TableCell>
              <TableCell>{schedule.time}</TableCell>
              <TableCell>{schedule.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Schedules;
