import React from 'react'
import { Button } from '../ui'
import { useUIStore } from '@/store/uiStore'
import { authApi } from '@/lib/api'
import { Trash2, X } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const LogoutModal = () => {
  const {  closeModal } = useUIStore()
  const { clearAuth } = useAuthStore()


  const handleLogout = async () => {
    clearAuth()
    closeModal()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="modal-box">
        <div className="flex justify-end mb-2">
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ color: 'var(--text-3)' }}
            onClick={closeModal}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center gap-3 pb-2">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: '#FCEBEB' }}>
            <Trash2 className="w-7 h-7" style={{ color: '#A32D2D' }} />
          </div>

          <div>
            <h2 className="text-base font-semibold mb-1" style={{ color: 'var(--text-1)' }}>Logout?</h2>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>
              You will be logged out of your account.
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-3)' }}>This action cannot be undone.</p>
          </div>
        </div>

        <div className="flex gap-2.5 mt-5">
          <Button variant="ghost" className="flex-1" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" className="flex-1" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal