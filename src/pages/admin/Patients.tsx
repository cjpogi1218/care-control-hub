
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Patients = () => {
  const patients = [
    { id: 1, name: "Alice Johnson", age: 45, contact: "555-0123", lastVisit: "2025-04-20" },
    { id: 2, name: "Bob Williams", age: 32, contact: "555-0124", lastVisit: "2025-04-22" },
    { id: 3, name: "Carol Martinez", age: 28, contact: "555-0125", lastVisit: "2025-04-23" },
    { id: 4, name: "David Anderson", age: 52, contact: "555-0126", lastVisit: "2025-04-25" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Patient Information</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Last Visit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.contact}</TableCell>
              <TableCell>{patient.lastVisit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Patients;
