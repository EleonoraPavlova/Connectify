import { createAction } from '@reduxjs/toolkit'

// export type ClearTasksTodolistsType = {
//   tasks: TasksObjType
//   todolists: TodolistDomainType[]
// }

export const clearTasksTodolists = createAction('actions/clear-tasks-todolists')
