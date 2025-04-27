
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Medicine {
  id: number;
  name: string;
  category: string;
  stock: number;
  expiry: string;
}

const Inventory = () => {
  const { toast } = useToast();
  const [medicines, setMedicines] = useState<Medicine[]>([
    { id: 1, name: "Amoxicillin", category: "Antibiotic", stock: 500, expiry: "2026-04-27" },
    { id: 2, name: "Paracetamol", category: "Pain Relief", stock: 1000, expiry: "2026-06-15" },
    { id: 3, name: "Omeprazole", category: "Antacid", stock: 300, expiry: "2026-05-20" },
    { id: 4, name: "Ibuprofen", category: "Anti-inflammatory", stock: 750, expiry: "2026-07-10" },
  ]);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      stock: 0,
      expiry: "",
    },
  });

  const onSubmit = (data: Omit<Medicine, 'id'>) => {
    if (editingMedicine) {
      setMedicines(medicines.map(medicine => 
        medicine.id === editingMedicine.id 
          ? { ...medicine, ...data }
          : medicine
      ));
      toast({
        title: "Medicine Updated",
        description: "Medicine information has been updated successfully.",
      });
    } else {
      const newMedicine = {
        id: medicines.length + 1,
        ...data,
      };
      setMedicines([...medicines, newMedicine]);
      toast({
        title: "Medicine Added",
        description: "New medicine has been added successfully.",
      });
    }
    setIsDialogOpen(false);
    setEditingMedicine(null);
    form.reset();
  };

  const handleEdit = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    form.reset({
      name: medicine.name,
      category: medicine.category,
      stock: medicine.stock,
      expiry: medicine.expiry,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (medicineId: number) => {
    setMedicines(medicines.filter(medicine => medicine.id !== medicineId));
    toast({
      title: "Medicine Deleted",
      description: "Medicine has been removed successfully.",
      variant: "destructive",
    });
  };

  const handleAddNew = () => {
    setEditingMedicine(null);
    form.reset({
      name: "",
      category: "",
      stock: 0,
      expiry: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Medicine Inventory</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
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
                        <Input placeholder="Enter medicine name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter stock quantity" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {editingMedicine ? 'Update Medicine' : 'Add Medicine'}
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
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.category}</TableCell>
              <TableCell>{medicine.stock}</TableCell>
              <TableCell>{medicine.expiry}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(medicine)}
                  className="inline-flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(medicine.id)}
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

export default Inventory;
