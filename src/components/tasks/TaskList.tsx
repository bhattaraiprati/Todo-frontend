import { ClipboardList, Search } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'
import { useUIStore } from '@/store/uiStore'
import { filterTasks } from '@/lib/utils'
import { TaskRow } from './TaskRow'
import { EmptyState, Spinner } from '@/components/ui'

export function TaskList() {
  const { filters } = useUIStore()
  const { data: tasks = [], isLoading, error } = useTasks()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="w-7 h-7 text-brand-600" />
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>Loading tasks…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm" style={{ color: '#A32D2D' }}>Failed to load tasks. Please try again.</p>
      </div>
    )
  }

  const filtered = filterTasks(tasks, filters)

  const pending = filtered.filter(t => t.status === 'pending')
  const completed = filtered.filter(t => t.status === 'completed')

  if (filtered.length === 0) {
    const hasSearch = !!filters.search
    return (
      <EmptyState
        icon={hasSearch ? <Search className="w-6 h-6" /> : <ClipboardList className="w-6 h-6" />}
        title={hasSearch ? 'No results found' : 'No tasks yet'}
        description={hasSearch ? `Nothing matched "${filters.search}"` : 'Create your first task to get started'}
      />
    )
  }

  const showSections = filters.status === 'all' && !filters.search

  if (showSections) {
    return (
      <div className="px-4 pb-24 lg:pb-6 space-y-5">
        {pending.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>
                Pending
              </h2>
              <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: 'var(--surface-2)', color: 'var(--text-3)' }}>
                {pending.length}
              </span>
            </div>
            <div className="space-y-2">
              {pending.map(task => <TaskRow key={task.id} task={task} />)}
            </div>
          </section>
        )}

        {completed.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-3)' }}>
                Completed
              </h2>
              <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: '#EAF3DE', color: '#3B6D11' }}>
                {completed.length}
              </span>
            </div>
            <div className="space-y-2">
              {completed.map(task => <TaskRow key={task.id} task={task} />)}
            </div>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="px-4 pb-24 lg:pb-6 space-y-2">
      {filtered.map(task => <TaskRow key={task.id} task={task} />)}
    </div>
  )
}
