
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Patient {
  id: number;
  name: string;
  age: number;
  contact: string;
  lastVisit: string;
}

const Patients = () => {
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "Alice Johnson", age: 45, contact: "555-0123", lastVisit: "2025-04-20" },
    { id: 2, name: "Bob Williams", age: 32, contact: "555-0124", lastVisit: "2025-04-22" },
    { id: 3, name: "Carol Martinez", age: 28, contact: "555-0125", lastVisit: "2025-04-23" },
    { id: 4, name: "David Anderson", age: 52, contact: "555-0126", lastVisit: "2025-04-25" },
  ]);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      age: 0,
      contact: "",
      lastVisit: "",
    },
  });

  const onSubmit = (data: Omit<Patient, 'id'>) => {
    if (editingPatient) {
      setPatients(patients.map(patient => 
        patient.id === editingPatient.id 
          ? { ...patient, ...data }
          : patient
      ));
      toast({
        title: "Patient Updated",
        description: "Patient information has been updated successfully.",
      });
    } else {
      const newPatient = {
        id: patients.length + 1,
        ...data,
      };
      setPatients([...patients, newPatient]);
      toast({
        title: "Patient Added",
        description: "New patient has been added successfully.",
      });
    }
    setIsDialogOpen(false);
    setEditingPatient(null);
    form.reset();
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    form.reset({
      name: patient.name,
      age: patient.age,
      contact: patient.contact,
      lastVisit: patient.lastVisit,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (patientId: number) => {
    setPatients(patients.filter(patient => patient.id !== patientId));
    toast({
      title: "Patient Deleted",
      description: "Patient has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleAddNew = () => {
    setEditingPatient(null);
    form.reset({
      name: "",
      age: 0,
      contact: "",
      lastVisit: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patient Information</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter age" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastVisit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Visit</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {editingPatient ? 'Update Patient' : 'Add Patient'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.contact}</TableCell>
              <TableCell>{patient.lastVisit}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(patient)}
                  className="inline-flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(patient.id)}
                  className="inline-flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Patients;
