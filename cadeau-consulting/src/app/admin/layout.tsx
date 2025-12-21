// app/admin/layout.tsx
import Link from "next/link";
import { LayoutDashboard, Calendar, FileText, Settings, Layers } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">AdminPanel</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <AdminLink href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <AdminLink href="/admin/bookings" icon={<Calendar size={20} />} label="Bookings" />
          <AdminLink href="/admin/services" icon={<Layers size={20} />} label="Services" />
          <AdminLink href="/admin/publications" icon={<FileText size={20} />} label="Publications" />
          <div className="pt-4 mt-4 border-t border-gray-100">
            <AdminLink href="/admin/settings" icon={<Settings size={20} />} label="Settings" />
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-500"></div>
             <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
           <h2 className="text-lg font-semibold">Overview</h2>
           {/* You can add a mobile menu trigger here later */}
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

// Helper component for Sidebar Links
function AdminLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}