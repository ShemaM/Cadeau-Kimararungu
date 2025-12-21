// app/admin/dashboard/page.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, BookOpen, Activity } from "lucide-react";

// 1. Define the interface for the props
interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
            title="Total Revenue" 
            value="$45,231.89" 
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} 
            description="+20.1% from last month" 
        />
        <MetricCard 
            title="Bookings" 
            value="+2350" 
            icon={<Users className="h-4 w-4 text-muted-foreground" />} 
            description="+180.1% from last month" 
        />
        <MetricCard 
            title="Active Blogs" 
            value="12" 
            icon={<BookOpen className="h-4 w-4 text-muted-foreground" />} 
            description="19 pending approval" 
        />
        <MetricCard 
            title="Active Now" 
            value="+573" 
            icon={<Activity className="h-4 w-4 text-muted-foreground" />} 
            description="+201 since last hour" 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-50 flex items-center justify-center bg-gray-50 text-gray-400">
              Bar Chart Placeholder
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-8">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                    <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 2. Apply the interface to the component
function MetricCard({ title, value, icon, description }: MetricCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}