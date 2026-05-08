export type Priority = 'low' | 'medium' | 'high'
export type TaskStatus = 'pending' | 'completed'

export interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  status: TaskStatus
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  avatarInitials: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends AuthCredentials {
  name: string
}

export interface TaskFilters {
  status?: TaskStatus | 'all'
  priority?: Priority | 'all'
  search?: string
}

export interface CreateTaskPayload {
  title: string
  description?: string
  priority: Priority
  dueDate?: string
  status: TaskStatus
}

export interface UpdateTaskPayload extends Partial<CreateTaskPayload> {
  taskId:string
  status?: TaskStatus
}
