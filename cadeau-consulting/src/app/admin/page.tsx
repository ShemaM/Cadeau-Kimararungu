import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, BookOpen, Activity, ArrowUpRight } from "lucide-react";

// Types
interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
         {/* Add Date Range Picker here later if needed */}
      </div>

      {/* 1. Top Metrics */}
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
            title="Active Content" 
            value="12" 
            icon={<BookOpen className="h-4 w-4 text-muted-foreground" />} 
            description="19 articles published" 
        />
        <MetricCard 
            title="Active Now" 
            value="+573" 
            icon={<Activity className="h-4 w-4 text-muted-foreground" />} 
            description="+201 since last hour" 
        />
      </div>

      {/* 2. Charts & Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Main Chart Area */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue over time</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-75 w-full flex items-center justify-center rounded-md bg-slate-50 border border-dashed text-slate-400">
              <p>Chart Component Placeholder</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Bookings List */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
                {/* Mock Data Items */}
                {[1, 2, 3, 4, 5].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                JD
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">John Doe</p>
                                <p className="text-xs text-muted-foreground">Booking #00{i + 1}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                             <div className="font-medium">+$250.00</div>
                             <div className="text-xs text-green-600 flex items-center">
                                Confirmed <ArrowUpRight className="ml-1 h-3 w-3" />
                             </div>
                        </div>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Reusable Metric Card Component
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