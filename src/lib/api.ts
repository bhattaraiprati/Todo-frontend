import { Task, User, AuthCredentials, RegisterCredentials, CreateTaskPayload, UpdateTaskPayload } from '@/types'

const BASE_URL = 'http://localhost:5000/api/auth'

const TOKEN_KEY = 'taskly_token'
const USER_KEY = 'taskly_user'

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY)
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if(!response.ok) {
    if (response.status === 401) {
      authApi.logout()
      window.location.href = '/login'
    }
     throw new Error(data.message || 'Something went wrong')
  }

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

// Auth API
export const authApi = {
  async login(creds: AuthCredentials): Promise<{ user: User; token: string }> {
    const data = await request<{ token: string; message: string }>('/login', {
      method: 'POST',
      body: JSON.stringify(creds),
    })
    
    const user: User = { 
      id: 'temp-id', 
      name: creds.email.split('@')[0], 
      email: creds.email, 
      avatarInitials: creds.email[0].toUpperCase() 
    }

    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    
    return { user, token: data.token }
  },

  async register(creds: RegisterCredentials): Promise<{ user: User; token: string }> {
    await request('/register', {
      method: 'POST',
      body: JSON.stringify(creds),
    })
    
    return authApi.login({ email: creds.email, password: creds.password })
  },

  async logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    window.location.href = '/login'
  },

  getStoredUser(): User | null {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null') } catch { return null }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  }
}

// Tasks API
export const tasksApi = {

  async getAll(): Promise<Task[]> {
   const data:{tasks:Task[]} = await request('/getAllTask',{
    method: 'GET',
   })
    return data.tasks;
  },

  async create(payload: CreateTaskPayload): Promise<Task> {
    const data = await request<{ message: string; task: Task }>('/createTask', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return data.task
  },

  async update(payload: UpdateTaskPayload): Promise<Task> {
    const data = await request<{ message: string; task: Task }>('/updateTask', {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    return data.task
  },

  async delete(id: string): Promise<void> {
    await request('/deleteTask', {
      method: 'DELETE',
      body: JSON.stringify({taskId:id}),
    })
  },

  async toggleStatus(id: string): Promise<Task> {
    const data = await request<{ message: string; task: Task }>('/toggleStatus', {
      method: 'PATCH',
      body: JSON.stringify({taskId:id}),
    })
    return data.task
  }
}
