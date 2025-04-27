
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Inventory = () => {
  const medicines = [
    { id: 1, name: "Amoxicillin", category: "Antibiotic", stock: 500, expiry: "2026-04-27" },
    { id: 2, name: "Paracetamol", category: "Pain Relief", stock: 1000, expiry: "2026-06-15" },
    { id: 3, name: "Omeprazole", category: "Antacid", stock: 300, expiry: "2026-05-20" },
    { id: 4, name: "Ibuprofen", category: "Anti-inflammatory", stock: 750, expiry: "2026-07-10" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Medicine Inventory</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Expiry Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.category}</TableCell>
              <TableCell>{medicine.stock}</TableCell>
              <TableCell>{medicine.expiry}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Inventory;
