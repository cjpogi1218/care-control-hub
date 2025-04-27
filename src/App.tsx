
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UserAccounts from "./pages/admin/UserAccounts";
import Patients from "./pages/admin/Patients";
import Schedules from "./pages/admin/Schedules";
import Appointments from "./pages/admin/Appointments";
import Inventory from "./pages/admin/Inventory";
import Reports from "./pages/admin/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><UserAccounts /></AdminLayout>} />
            <Route path="/admin/patients" element={<AdminLayout><Patients /></AdminLayout>} />
            <Route path="/admin/schedules" element={<AdminLayout><Schedules /></AdminLayout>} />
            <Route path="/admin/appointments" element={<AdminLayout><Appointments /></AdminLayout>} />
            <Route path="/admin/inventory" element={<AdminLayout><Inventory /></AdminLayout>} />
            <Route path="/admin/reports" element={<AdminLayout><Reports /></AdminLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
