
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Appointments = () => {
  const appointments = [
    { id: 1, patient: "Alice Johnson", doctor: "Dr. Sarah Wilson", date: "2025-04-20", status: "Completed" },
    { id: 2, patient: "Bob Williams", doctor: "Dr. Michael Brown", date: "2025-04-22", status: "Completed" },
    { id: 3, patient: "Carol Martinez", doctor: "Dr. Sarah Wilson", date: "2025-04-28", status: "Scheduled" },
    { id: 4, patient: "David Anderson", doctor: "Dr. Michael Brown", date: "2025-04-29", status: "Scheduled" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Appointment History</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.patient}</TableCell>
              <TableCell>{appointment.doctor}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Appointments;
