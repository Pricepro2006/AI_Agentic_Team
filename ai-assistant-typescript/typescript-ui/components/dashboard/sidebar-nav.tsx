'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  MessageSquare,
  Users,
  FileText,
  Settings,
  PanelLeft,
  Database,
  Home,
  Server,
  FileUp,
  Workflow,
  ChevronRight,
  X,
  Globe,
  AlertCircle,
  BarChart2,
  Brain,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarNavProps {
  className?: string
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  submenu?: NavItem[]
}

export function SidebarNav({ className, sidebarOpen, setSidebarOpen }: SidebarNavProps) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      title: 'Architecture Expert',
      href: '/architecture-expert',
      icon: Brain,
    },
    {
      title: 'Web Scraping',
      href: '/web-scraping',
      icon: Globe,
    },
    {
      title: 'Knowledge Base',
      href: '/knowledge-base',
      icon: FileText,
    },
    {
      title: 'Vector Search',
      href: '/vector-search',
      icon: Search,
    },
    {
      title: 'Professional Dashboard',
      href: '/professional-dashboard',
      icon: BarChart2,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ]

  // Handle closing sidebar when clicking a link on mobile
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) { // lg breakpoint
      setSidebarOpen(false)
    }
  }

  return (
    <>
      {/* Overlay for mobile - only visible when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-20 flex w-72 flex-col border-r bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:static lg:w-64 lg:translate-x-0 lg:shrink-0 lg:mr-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        <div className="flex h-14 sm:h-16 items-center justify-between border-b px-4">
          <a 
            href="/dashboard" 
            className="flex items-center gap-2"
            onClick={handleLinkClick}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TA</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">TypeScript AI</span>
              <span className="text-xs text-muted-foreground">Enterprise Assistant</span>
            </div>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <div className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <NavItemComponent
                key={index}
                item={item}
                pathname={pathname}
                onClick={handleLinkClick}
              />
            ))}
          </nav>
        </div>
        
        {/* User info at bottom */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">TA</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">TypeScript Admin</p>
              <p className="text-xs text-muted-foreground truncate">admin@typescript.ai</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

interface NavItemComponentProps {
  item: NavItem
  pathname: string
  onClick: () => void
}

function NavItemComponent({ item, pathname, onClick }: NavItemComponentProps) {
  const isActive = pathname === item.href
  
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
          : 'hover:bg-white/10 hover:text-white text-gray-400'
      )}
      onClick={onClick}
    >
      <item.icon className="h-4 w-4" />
      <span>{item.title}</span>
    </Link>
  )
}