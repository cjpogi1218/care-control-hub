
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { User, Users, FileText, Calendar, Clock, Pill, FileChartLine } from "lucide-react";
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const menuItems = [
    { title: "User Accounts", icon: Users, path: "/admin/users" },
    { title: "Patient Information", icon: FileText, path: "/admin/patients" },
    { title: "Schedules", icon: Calendar, path: "/admin/schedules" },
    { title: "Appointment History", icon: Clock, path: "/admin/appointments" },
    { title: "Medicine Inventory", icon: Pill, path: "/admin/inventory" },
    { title: "Report Generation", icon: FileChartLine, path: "/admin/reports" },
  ];

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.path} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
