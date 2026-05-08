import { clsx, type ClassValue } from 'clsx'
import { Task, TaskFilters, Priority } from '@/types'
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  return tasks.filter(task => {
    if (filters.status && filters.status !== 'all' && task.status !== filters.status) return false
    if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (!task.title.toLowerCase().includes(q) && !(task.description ?? '').toLowerCase().includes(q)) return false
    }
    return true
  })
}

export function formatDueDate(dateStr?: string): string {
  if (!dateStr) return ''
  const d = parseISO(dateStr)
  if (isToday(d)) return 'Today'
  if (isTomorrow(d)) return 'Tomorrow'
  return format(d, 'MMM d')
}

export function isDueSoon(dateStr?: string): boolean {
  if (!dateStr) return false
  const d = parseISO(dateStr)
  return isPast(d) || isToday(d)
}

export function priorityLabel(p: Priority): string {
  return p.charAt(0).toUpperCase() + p.slice(1)
}

export function getTaskStats(tasks: Task[]) {
  const total = tasks.length
  const completed = tasks.filter(t => t.status === 'completed').length
  const pending = total - completed
  const high = tasks.filter(t => t.priority === 'high' && t.status === 'pending').length
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0
  return { total, completed, pending, high, progress }
}
