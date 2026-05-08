import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

// ── Button ────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  loading?: boolean
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', loading, children, className, disabled, ...props }: ButtonProps) {
  const base = cn(
    'flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
    size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm',
    {
      'btn-primary': variant === 'primary',
      'btn-ghost': variant === 'ghost',
      'btn-danger': variant === 'danger',
    },
    className
  )
  return (
    <button className={base} disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
      {children}
    </button>
  )
}

// ── Input ─────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn('input-base', icon && 'pl-9', error && 'border-red-400', className)}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'

// ── Textarea ──────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>{label}</label>}
      <textarea
        ref={ref}
        className={cn('input-base resize-none', error && 'border-red-400', className)}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
)
Textarea.displayName = 'Textarea'

// ── Select ────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>{label}</label>}
      <select
        ref={ref}
        className={cn('input-base appearance-none cursor-pointer', error && 'border-red-400', className)}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
)
Select.displayName = 'Select'

// ── Badge ─────────────────────────────────────────────────────────
import { Priority } from '@/types'

export function PriorityBadge({ priority }: { priority: Priority }) {
  const cls = priority === 'high' ? 'badge-high' : priority === 'medium' ? 'badge-medium' : 'badge-low'
  return <span className={cls}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
}

// ── Avatar ────────────────────────────────────────────────────────
export function Avatar({ initials, size = 'sm' }: { initials: string; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
  return (
    <div
      className={cn('rounded-full flex items-center justify-center font-medium flex-shrink-0', sz)}
      style={{ background: 'var(--brand-light)', color: 'var(--brand)' }}
    >
      {initials}
    </div>
  )
}

// ── Spinner ───────────────────────────────────────────────────────
export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn('animate-spin', className)} />
}

// ── Progress Bar ──────────────────────────────────────────────────
export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, background: 'var(--brand)' }}
      />
    </div>
  )
}

// ── Empty State ───────────────────────────────────────────────────
export function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--surface-2)', color: 'var(--text-3)' }}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>{title}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>{description}</p>
      </div>
    </div>
  )
}
