import { Edit2, Trash2, Calendar, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { Task } from '@/types'
import { useToggleTask } from '@/hooks/useTasks'
import { useUIStore } from '@/store/uiStore'
import { PriorityBadge } from '@/components/ui'
import { formatDueDate, isDueSoon, cn } from '@/lib/utils'

interface TaskRowProps {
  task: Task
}

export function TaskRow({ task }: TaskRowProps) {
  const { openModal } = useUIStore()
  const toggleTask = useToggleTask()
  const [menuOpen, setMenuOpen] = useState(false)

  const isCompleted = task.status === 'completed'
  const overdue = isDueSoon(task.dueDate) && !isCompleted

  return (
    <div className={cn('task-row', isCompleted && 'opacity-60')}>
      {/* Checkbox */}
      <button
        className="flex-shrink-0 mt-0.5 transition-all"
        onClick={() => toggleTask.mutate(task.id)}
      >
        <div
          className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            isCompleted
              ? 'border-transparent'
              : 'border-current hover:scale-110'
          )}
          style={{
            background: isCompleted ? 'var(--brand)' : 'transparent',
            borderColor: isCompleted ? 'var(--brand)' : 'var(--text-3)',
          }}
        >
          {isCompleted && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn('text-sm font-medium leading-tight', isCompleted && 'line-through')}
          style={{ color: isCompleted ? 'var(--text-3)' : 'var(--text-1)' }}
        >
          {task.title}
        </p>

        {task.description && (
          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-3)' }}>
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-1.5">
          <PriorityBadge priority={task.priority} />

          {task.dueDate && (
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: overdue ? '#A32D2D' : 'var(--text-3)' }}
            >
              <Calendar className="w-3 h-3" />
              {formatDueDate(task.dueDate)}
            </span>
          )}

          {isCompleted && (
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>Done</span>
          )}
        </div>
      </div>

      {/* Desktop actions */}
      <div className="hidden sm:flex items-center gap-1  group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          className="p-1.5 rounded-lg transition-colors hover:bg-brand-50"
          style={{ color: 'var(--text-3)' }}
          onClick={() => openModal('edit', task)}
          title="Edit"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
          style={{ color: 'var(--text-3)' }}
          onClick={() => openModal('delete', task)}
          title="Delete"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mobile kebab menu */}
      <div className="sm:hidden relative flex-shrink-0">
        <button
          className="p-1.5 rounded-lg"
          style={{ color: 'var(--text-3)' }}
          onClick={() => setMenuOpen(v => !v)}
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div
              className="absolute right-0 top-8 z-20 w-36 rounded-xl py-1 shadow-lg"
              style={{ background: 'white', border: '1px solid var(--border)' }}
            >
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                style={{ color: 'var(--text-2)' }}
                onClick={() => { openModal('edit', task); setMenuOpen(false) }}
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-red-50"
                style={{ color: '#A32D2D' }}
                onClick={() => { openModal('delete', task); setMenuOpen(false) }}
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
