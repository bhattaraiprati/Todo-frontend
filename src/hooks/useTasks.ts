import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksApi } from '@/lib/api'
import { Task, CreateTaskPayload, UpdateTaskPayload } from '@/types'

export const TASKS_KEY = ['tasks']

export function useTasks() {
  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: tasksApi.getAll,
    staleTime: 30_000,
  })
}

export function useCreateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => tasksApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useUpdateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateTaskPayload) => tasksApi.update(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useDeleteTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => tasksApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useToggleTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => tasksApi.toggleStatus(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: TASKS_KEY })
      const prev = qc.getQueryData(TASKS_KEY)
      qc.setQueryData(TASKS_KEY, (old: unknown) => {
        if (!Array.isArray(old)) return old
        return (old as Task[]).map(t =>
          t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t
        )
      })
      return { prev }
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(TASKS_KEY, ctx.prev)
    },
    onSettled: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}
