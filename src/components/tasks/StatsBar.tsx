import { CheckCircle2, Clock, AlertCircle, ListTodo } from 'lucide-react'
import { ProgressBar } from '@/components/ui'
import { useTasks } from '@/hooks/useTasks'
import { getTaskStats } from '@/lib/utils'

export function StatsBar() {
  const { data: tasks = [] } = useTasks()
  const { total, completed, pending, high, progress } = getTaskStats(tasks)

  const stats = [
    { label: 'Total', value: total, icon: <ListTodo className="w-4 h-4" />, color: 'var(--text-2)', bg: 'var(--surface-2)' },
    { label: 'Completed', value: completed, icon: <CheckCircle2 className="w-4 h-4" />, color: '#3B6D11', bg: '#EAF3DE' },
    { label: 'Pending', value: pending, icon: <Clock className="w-4 h-4" />, color: 'var(--brand)', bg: 'var(--brand-light)' },
    { label: 'High priority', value: high, icon: <AlertCircle className="w-4 h-4" />, color: '#A32D2D', bg: '#FCEBEB' },
  ]

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="card p-3.5">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>{s.label}</span>
            </div>
            <p className="text-2xl font-semibold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card p-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>Overall progress</span>
          <span className="text-xs font-semibold" style={{ color: 'var(--brand)' }}>{progress}%</span>
        </div>
        <ProgressBar value={progress} />
        <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
          {completed} of {total} tasks completed
        </p>
      </div>
    </div>
  )
}
