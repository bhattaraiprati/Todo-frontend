import { create } from 'zustand'
import { Task, TaskFilters } from '@/types'

type ModalType = 'create' | 'edit' | 'delete'  | 'logout' | null

interface UIState {
  filters: TaskFilters
  modal: ModalType
  selectedTask: Task | null
  sidebarOpen: boolean

  setFilters: (filters: Partial<TaskFilters>) => void
  resetFilters: () => void
  openModal: (type: ModalType, task?: Task) => void
  closeModal: () => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  filters: { status: 'all', priority: 'all', search: '' },
  modal: null,
  selectedTask: null,
  sidebarOpen: false,

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  resetFilters: () =>
    set({ filters: { status: 'all', priority: 'all', search: '' } }),

  openModal: (type, task = undefined) =>
    set({ modal: type, selectedTask: task ?? null }),

  closeModal: () =>
    set({ modal: null, selectedTask: null }),

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
