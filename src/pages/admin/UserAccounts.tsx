
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const UserAccounts = () => {
  const users = [
    { id: 1, name: "Dr. Sarah Wilson", role: "Doctor", email: "sarah.wilson@example.com", status: "Active" },
    { id: 2, name: "John Smith", role: "Nurse", email: "john.smith@example.com", status: "Active" },
    { id: 3, name: "Emma Davis", role: "Admin", email: "emma.davis@example.com", status: "Inactive" },
    { id: 4, name: "Michael Brown", role: "Doctor", email: "michael.brown@example.com", status: "Active" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Accounts</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserAccounts;
