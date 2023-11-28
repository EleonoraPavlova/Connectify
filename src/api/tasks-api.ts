import axios from "axios"
import { instanse } from "./usersApi"

const settings = {
  withCredentials: true, //есть валидац токен
  headers: {
    "API-KEY": "6a891b51-a742-4c47-8da1-58a8df99feb7"
  }
}

export type TasksTypeApi = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}


export type GetTaskResponse = {
  error: string
  totalCount: number
  items: TasksTypeApi[]
}

export type ResponseType<Data = {}> = {
  resultCode: number
  messages: string[]
  data: Data
}


export type UpdateTaskModel = { //какие поля можно обновить в tasks
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

export const tasksApi = {
  getTasks(todolistId: string) {
    let promise = instanse.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    return promise
  },

  createTasks(title: string, todolistId: string) {
    try {
      let promise = instanse.post<ResponseType<{ item: GetTaskResponse }>>(`todo-lists/${todolistId}/tasks`, {
        title: title
      }, settings)
      return promise
    } catch {
      throw new Error("Enter title or todolistId")
    }
  },

  deleteTasks(todolistId: string, taskId: string) {
    let promise = instanse.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    return promise
  },

  updateTasks(todolistId: string, taskId: string, title: string) {
    let promise = instanse.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {
      title: title
    })
    return promise
  }
}