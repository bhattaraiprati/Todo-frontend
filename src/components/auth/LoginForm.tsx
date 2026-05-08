import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Lock, CheckSquare, Eye, EyeOff } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/lib/api'
import { Button, Input } from '@/components/ui'

interface LoginFormData {
  email: string
  password: string
}

interface LoginFormProps {
  onSwitchToRegister: () => void
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const setAuth = useAuthStore(state => state.setAuth)
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormData>()

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authApi.login(data),
    onSuccess: ({ user, token }) => {
      setAuth(user, token)
    }
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
  }



  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand)' }}>
          <CheckSquare className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-semibold" style={{ color: 'var(--text-1)' }}>Taskly</span>
      </div>

      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Welcome back</h1>
      <p className="text-sm mb-7" style={{ color: 'var(--text-2)' }}>Sign in to continue to your workspace</p>

      {loginMutation.isError && (
        <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: '#FCEBEB', color: '#A32D2D' }}>
          {loginMutation.error.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' }
          })}
        />

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>Password</label>
            <button type="button" className="text-xs" style={{ color: 'var(--brand)' }}>Forgot password?</button>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="input-base pl-9 pr-9"
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-3)' }}
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" loading={loginMutation.isPending} className="mt-1 w-full">
          Sign in
        </Button>
      </form>

      <div className="mt-6 text-center text-sm" style={{ color: 'var(--text-2)' }}>
        Don't have an account?{' '}
        <button type="button" className="font-medium" style={{ color: 'var(--brand)' }} onClick={onSwitchToRegister}>
          Register
        </button>
      </div>
    </div>
  )
}
