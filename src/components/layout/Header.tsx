import { Search, Plus, Menu, SlidersHorizontal, X } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Priority, TaskStatus } from '@/types'

export function Header() {
  const { filters, setFilters, openModal, toggleSidebar } = useUIStore()

  const statusFilters: Array<{ label: string; value: TaskStatus | 'all' }> = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
  ]

  const priorityFilters: Array<{ label: string; value: Priority | 'all' }> = [
    { label: 'Any priority', value: 'all' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ]

  return (
    <header className="sticky top-0 z-20" style={{ background: 'white', borderBottom: '1px solid var(--border)' }}>
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          className="lg:hidden p-2 rounded-xl"
          style={{ color: 'var(--text-2)' }}
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-3)' }} />
          <input
            type="text"
            placeholder="Search tasks…"
            value={filters.search ?? ''}
            onChange={e => setFilters({ search: e.target.value })}
            className="input-base pl-9 pr-9 h-10"
          />
          {filters.search && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-3)' }}
              onClick={() => setFilters({ search: '' })}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <Button onClick={() => openModal('create')} size="sm">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New task</span>
        </Button>
      </div>

      {/* Filter chips */}
      <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
        <SlidersHorizontal className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-3)' }} />

        {statusFilters.map(f => {
          const isActive = filters.status === f.value && (f.value !== 'all' || filters.priority === 'all')
          return (
            <button
              key={f.value}
              onClick={() => setFilters({ status: f.value, priority: 'all' })}
              className={cn(
                'flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full border transition-all',
                isActive
                  ? 'text-white border-transparent'
                  : 'border-transparent'
              )}
              style={{
                background: isActive ? 'var(--brand)' : 'var(--surface-2)',
                color: isActive ? 'white' : 'var(--text-2)',
              }}
            >
              {f.label}
            </button>
          )
        })}

        <div className="w-px h-4 flex-shrink-0" style={{ background: 'var(--border)' }} />

        {priorityFilters.slice(1).map(f => {
          const isActive = filters.priority === f.value
          const colors: Record<string, string> = { high: '#A32D2D', medium: '#854F0B', low: '#3B6D11' }
          const bgs: Record<string, string> = { high: '#FCEBEB', medium: '#FAEEDA', low: '#EAF3DE' }
          return (
            <button
              key={f.value}
              onClick={() => setFilters({ priority: isActive ? 'all' : f.value, status: 'all' })}
              className="flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full transition-all"
              style={{
                background: isActive ? bgs[f.value] : 'var(--surface-2)',
                color: isActive ? colors[f.value] : 'var(--text-2)',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}
