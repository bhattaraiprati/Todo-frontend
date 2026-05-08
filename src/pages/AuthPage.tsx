import { useState } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { RegisterForm } from '@/components/auth/RegisterForm'

export function AuthPage() {
  const [view, setView] = useState<'login' | 'register'>('login')

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--surface)' }}>
      {/* Left panel — decorative (hidden on mobile) */}
      <div
        className="hidden lg:flex flex-col justify-between w-2/5 p-12"
        style={{ background: 'var(--brand)', minHeight: '100vh' }}
      >
        <div className="text-white/80 text-sm font-medium">Taskly</div>

        <div>
          <h2 className="text-3xl font-semibold text-white leading-snug mb-4">
            Everything you need to stay on top of your work
          </h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Create tasks, set priorities, track deadlines, and mark progress — all in one clean workspace.
          </p>
        </div>

        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="h-1 rounded-full" style={{ width: i === 0 ? '24px' : '8px', background: i === 0 ? 'white' : 'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </div>

      {/* Right panel — forms */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm page-enter">
          {view === 'login'
            ? <LoginForm onSwitchToRegister={() => setView('register')} />
            : <RegisterForm onSwitchToLogin={() => setView('login')} />
          }
        </div>
      </div>
    </div>
  )
}
