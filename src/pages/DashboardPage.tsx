import { Plus } from 'lucide-react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { StatsBar } from '@/components/tasks/StatsBar'
import { TaskList } from '@/components/tasks/TaskList'
import { TaskModal } from '@/components/tasks/TaskModal'
import { DeleteModal } from '@/components/tasks/DeleteModal'
import { useUIStore } from '@/store/uiStore'

export function DashboardPage() {
  const { modal, openModal } = useUIStore()

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--surface)' }}>
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto page-enter">
          <StatsBar />
          <TaskList />
        </main>
      </div>

      <BottomNav />

      {/* FAB on mobile */}
      <button
        className="lg:hidden fixed bottom-20 right-4 z-30 w-13 h-13 rounded-full shadow-lg flex items-center justify-center text-white"
        style={{ background: 'var(--brand)', width: 52, height: 52 }}
        onClick={() => openModal('create')}
      >
        <Plus className="w-5 h-5" />
      </button>

      {(modal === 'create' || modal === 'edit') && <TaskModal />}
      {modal === 'delete' && <DeleteModal />}
    </div>
  )
}
