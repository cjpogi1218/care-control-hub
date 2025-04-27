
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Schedule {
  id: number;
  doctor: string;
  date: string;
  time: string;
  department: string;
}

const Schedules = () => {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: 1, doctor: "Dr. Sarah Wilson", date: "2025-04-28", time: "09:00", department: "Cardiology" },
    { id: 2, doctor: "Dr. Michael Brown", date: "2025-04-28", time: "10:30", department: "Pediatrics" },
    { id: 3, doctor: "Dr. Sarah Wilson", date: "2025-04-29", time: "14:00", department: "Cardiology" },
    { id: 4, doctor: "Dr. Michael Brown", date: "2025-04-29", time: "15:30", department: "Pediatrics" },
  ]);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      doctor: "",
      date: "",
      time: "",
      department: "",
    },
  });

  const onSubmit = (data: Omit<Schedule, 'id'>) => {
    if (editingSchedule) {
      setSchedules(schedules.map(schedule => 
        schedule.id === editingSchedule.id 
          ? { ...schedule, ...data }
          : schedule
      ));
      toast({
        title: "Schedule Updated",
        description: "Schedule has been updated successfully.",
      });
    } else {
      const newSchedule = {
        id: schedules.length + 1,
        ...data,
      };
      setSchedules([...schedules, newSchedule]);
      toast({
        title: "Schedule Added",
        description: "New schedule has been added successfully.",
      });
    }
    setIsDialogOpen(false);
    setEditingSchedule(null);
    form.reset();
  };

  const handleEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    form.reset({
      doctor: schedule.doctor,
      date: schedule.date,
      time: schedule.time,
      department: schedule.department,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (scheduleId: number) => {
    setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    toast({
      title: "Schedule Deleted",
      description: "Schedule has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleAddNew = () => {
    setEditingSchedule(null);
    form.reset({
      doctor: "",
      date: "",
      time: "",
      department: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctor Schedules</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter department" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {editingSchedule ? 'Update Schedule' : 'Add Schedule'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>{schedule.doctor}</TableCell>
              <TableCell>{schedule.date}</TableCell>
              <TableCell>{schedule.time}</TableCell>
              <TableCell>{schedule.department}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(schedule)}
                  className="inline-flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(schedule.id)}
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

export default Schedules;
