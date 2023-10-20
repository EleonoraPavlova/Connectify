import axios from "axios"

export const settings = {
  withCredentials: true, //есть валидац токен
  headers: {
    "API-KEY": "6a891b51-a742-4c47-8da1-58a8df99feb7"
  }
}

export const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings //добавила const settings
})

export type TodolistTypeApi = {
  id: string
  title: string
  addedDate: string
  order: number
}

// type CreateTodolistResponseType = {
//   resultCode: number
//   messages: string[]
//   fieldsErrors: string[]
//   data: {
//     item: TodolistTypeApi
//   }
// }

// type DeleteUpdateTodolistResponseType = {
//   resultCode: number
//   messages: string[]
//   fieldsErrors: string[]
//   data: {}
// }

export type ResponseType<Data> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: Data
}


export const todolistsApi = {
  getTodoslists() {
    let promise = instanse.get<TodolistTypeApi[]>("todo-lists")
    return promise
  },

  createTodoslists(title: string) {
    let promise = instanse.post<ResponseType<{ item: TodolistTypeApi }>>("/todo-lists", {
      title: title
    })
    return promise
  },

  deleteTodoslists(todolistId: string) {
    let promise = instanse.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    return promise
  },

  updateTodoslists(todolistId: string, title: string) {
    let promise = instanse.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {
      title: title
    })
    return promise
  }
}