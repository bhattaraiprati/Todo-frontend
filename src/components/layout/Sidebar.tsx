import { CheckSquare, LayoutDashboard, CheckCircle2, Clock, AlertCircle, Settings, LogOut, X } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { useTasks } from '@/hooks/useTasks'
import { getTaskStats } from '@/lib/utils'
import { Avatar } from '@/components/ui'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  icon: React.ReactNode
  filter: string
  count?: number
}

export function Sidebar() {
  const { user, clearAuth } = useAuthStore()
  const { filters, setFilters, sidebarOpen, setSidebarOpen } = useUIStore()
  const { data: tasks = [] } = useTasks()
  const stats = getTaskStats(tasks)

  const navItems: NavItem[] = [
    { label: 'All tasks', icon: <LayoutDashboard className="w-4 h-4" />, filter: 'all', count: stats.total },
    { label: 'Pending', icon: <Clock className="w-4 h-4" />, filter: 'pending', count: stats.pending },
    { label: 'Completed', icon: <CheckCircle2 className="w-4 h-4" />, filter: 'completed', count: stats.completed },
    { label: 'High priority', icon: <AlertCircle className="w-4 h-4" />, filter: 'high', count: stats.high },
  ]

  const activeFilter = filters.status === 'all'
    ? (filters.priority === 'high' ? 'high' : 'all')
    : filters.status

  const handleNav = (filter: string) => {
    if (filter === 'high') {
      setFilters({ status: 'all', priority: 'high' })
    } else {
      setFilters({ status: filter as 'all' | 'pending' | 'completed', priority: 'all' })
    }
    setSidebarOpen(false)
  }

  const logout=()=>{
    clearAuth()
    setSidebarOpen(false)
  }

  const content = (
    <div className="flex flex-col h-full py-5 px-3">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand)' }}>
            <CheckSquare className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-base" style={{ color: 'var(--text-1)' }}>Taskly</span>
        </div>
        <button className="lg:hidden p-1.5 rounded-lg" style={{ color: 'var(--text-2)' }} onClick={() => setSidebarOpen(false)}>
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(item => (
          <button
            key={item.filter}
            onClick={() => handleNav(item.filter)}
            className={cn('sidebar-link w-full text-left')}
            style={activeFilter === item.filter ? { background: 'var(--brand-light)', color: 'var(--brand)' } : {}}
          >
            <span style={activeFilter === item.filter ? { color: 'var(--brand)' } : { color: 'var(--text-3)' }}>
              {item.icon}
            </span>
            <span className="flex-1">{item.label}</span>
            {item.count !== undefined && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  background: activeFilter === item.filter ? 'rgba(83,74,183,0.12)' : 'var(--surface)',
                  color: activeFilter === item.filter ? 'var(--brand)' : 'var(--text-3)',
                  border: activeFilter === item.filter ? 'none' : '1px solid var(--border)'
                }}
              >
                {item.count}
              </span>
            )}
          </button>
        ))}

        <div className="my-2 h-px" style={{ background: 'var(--border)' }} />

        {/* <button className="sidebar-link w-full text-left">
          <Settings className="w-4 h-4" style={{ color: 'var(--text-3)' }} />
          <span>Settings</span>
        </button> */}
      </nav>

      {user && (
        <div className="flex items-center gap-2.5 px-2 pt-3 mt-2" style={{ borderTop: '1px solid var(--border)' }}>
          <Avatar initials={user.avatarInitials} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-1)' }}>{user.name}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-3)' }}>{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
            style={{ color: 'var(--text-3)' }}
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 h-screen sticky top-0" style={{ borderRight: '1px solid var(--border)', background: 'white' }}>
        {content}
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 h-full" style={{ background: 'white', boxShadow: '4px 0 20px rgba(0,0,0,0.1)' }}>
            {content}
          </aside>
        </div>
      )}
    </>
  )
}
