import { LayoutDashboard, CheckCircle2, Clock, User } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useTasks } from '@/hooks/useTasks'
import { getTaskStats } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function BottomNav() {
  const { filters, setFilters } = useUIStore()
  const { data: tasks = [] } = useTasks()
  const stats = getTaskStats(tasks)

  const activeFilter = filters.status === 'all'
    ? (filters.priority === 'high' ? 'all' : 'all')
    : filters.status

  const items = [
    { label: 'All', icon: LayoutDashboard, filter: 'all', badge: stats.total },
    { label: 'Pending', icon: Clock, filter: 'pending', badge: stats.pending },
    { label: 'Done', icon: CheckCircle2, filter: 'completed', badge: stats.completed },
    { label: 'Profile', icon: User, filter: 'profile' },
  ]

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center"
      style={{ background: 'white', borderTop: '1px solid var(--border)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {items.map(({ label, icon: Icon, filter, badge }) => {
        const isActive = filter === activeFilter
        return (
          <button
            key={filter}
            className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
            onClick={() => {
              if (filter !== 'profile') {
                setFilters({ status: filter as 'all' | 'pending' | 'completed', priority: 'all' })
              }
            }}
            style={{ color: isActive ? 'var(--brand)' : 'var(--text-3)' }}
          >
            <div className="relative">
              <Icon className={cn('w-5 h-5', isActive && 'text-brand-600')} />
              {badge !== undefined && badge > 0 && (
                <span
                  className="absolute -top-1 -right-1.5 text-[9px] font-semibold w-3.5 h-3.5 rounded-full flex items-center justify-center text-white"
                  style={{ background: isActive ? 'var(--brand)' : 'var(--text-3)', fontSize: '9px' }}
                >
                  {badge > 9 ? '9+' : badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
