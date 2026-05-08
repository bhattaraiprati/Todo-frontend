import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { X, Plus, Save } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useCreateTask, useUpdateTask } from '@/hooks/useTasks'
import { Priority, TaskStatus } from '@/types'
import { Button, Input, Textarea, Select } from '@/components/ui'

interface TaskFormData {
  title: string
  description: string
  priority: Priority
  dueDate: string
  status: TaskStatus
}

export function TaskModal() {
  const { modal, selectedTask, closeModal } = useUIStore()
  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const isEdit = modal === 'edit'

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<TaskFormData>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      status: 'pending'
    }
  })

  useEffect(() => {
    if (isEdit && selectedTask) {
      reset({
        title: selectedTask.title,
        description: selectedTask.description ?? '',
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate ?? '',
        status: selectedTask.status
      })
    } else {
      reset({ title: '', description: '', priority: 'medium', dueDate: '', status: 'pending' })
    }
  }, [modal, selectedTask, isEdit, reset])

  const onSubmit = async (data: TaskFormData) => {
    if (isEdit && selectedTask) {
      await updateTask.mutateAsync({ taskId: selectedTask.id, ...data })
    } else {
      await createTask.mutateAsync({ ...data })
    }
    closeModal()
  }

  const statusValue = watch('status')
  const isPending = createTask.isPending || updateTask.isPending

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="modal-box">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold" style={{ color: 'var(--text-1)' }}>
            {isEdit ? 'Edit task' : 'New task'}
          </h2>
          <button
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: 'var(--text-3)' }}
            onClick={closeModal}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Task title *"
            placeholder="What needs to be done?"
            error={errors.title?.message}
            {...register('title', { required: 'Title is required', minLength: { value: 2, message: 'Too short' } })}
          />

          <Textarea
            label="Description"
            placeholder="Add any extra details or notes…"
            rows={3}
            {...register('description')}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select label="Priority" {...register('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>

            <Input
              label="Due date"
              type="date"
              {...register('dueDate')}
            />
          </div>

          {isEdit && (
            <div>
              <p className="text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>Status</p>
              <div className="grid grid-cols-2 gap-2">
                {(['pending', 'completed'] as TaskStatus[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    className="py-2 px-3 rounded-xl text-sm font-medium border transition-all"
                    style={{
                      background: statusValue === s ? 'var(--brand)' : 'var(--surface)',
                      color: statusValue === s ? 'white' : 'var(--text-2)',
                      borderColor: statusValue === s ? 'var(--brand)' : 'var(--border-strong)',
                    }}
                    onClick={() => setValue('status', s)}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2.5 pt-1">
            <Button type="button" variant="ghost" className="flex-1" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" className="flex-[2]" loading={isPending}>
              {isEdit ? <><Save className="w-4 h-4" /> Save changes</> : <><Plus className="w-4 h-4" /> Create task</>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
