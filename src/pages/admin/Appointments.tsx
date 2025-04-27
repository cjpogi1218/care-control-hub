
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Appointment {
  id: number;
  patient: string;
  doctor: string;
  date: string;
  status: string;
}

const Appointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patient: "Alice Johnson", doctor: "Dr. Sarah Wilson", date: "2025-04-20", status: "Completed" },
    { id: 2, patient: "Bob Williams", doctor: "Dr. Michael Brown", date: "2025-04-22", status: "Completed" },
    { id: 3, patient: "Carol Martinez", doctor: "Dr. Sarah Wilson", date: "2025-04-28", status: "Scheduled" },
    { id: 4, patient: "David Anderson", doctor: "Dr. Michael Brown", date: "2025-04-29", status: "Scheduled" },
  ]);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      patient: "",
      doctor: "",
      date: "",
      status: "",
    },
  });

  const onSubmit = (data: Omit<Appointment, 'id'>) => {
    if (editingAppointment) {
      setAppointments(appointments.map(appointment => 
        appointment.id === editingAppointment.id 
          ? { ...appointment, ...data }
          : appointment
      ));
      toast({
        title: "Appointment Updated",
        description: "Appointment has been updated successfully.",
      });
    } else {
      const newAppointment = {
        id: appointments.length + 1,
        ...data,
      };
      setAppointments([...appointments, newAppointment]);
      toast({
        title: "Appointment Added",
        description: "New appointment has been added successfully.",
      });
    }
    setIsDialogOpen(false);
    setEditingAppointment(null);
    form.reset();
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    form.reset({
      patient: appointment.patient,
      doctor: appointment.doctor,
      date: appointment.date,
      status: appointment.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (appointmentId: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    toast({
      title: "Appointment Deleted",
      description: "Appointment has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleAddNew = () => {
    setEditingAppointment(null);
    form.reset({
      patient: "",
      doctor: "",
      date: "",
      status: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointment History</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="patient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter patient name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="doctor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Doctor</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter doctor name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter status" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {editingAppointment ? 'Update Appointment' : 'Add Appointment'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.patient}</TableCell>
              <TableCell>{appointment.doctor}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.status}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(appointment)}
                  className="inline-flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(appointment.id)}
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

export default Appointments;
