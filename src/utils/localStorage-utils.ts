import { AppRootState } from 'state/store'

//loads the state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('app-state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

//saves the state to localStorage
export const saveState = (state: Partial<AppRootState>) => {
  try {
    const currentState = loadState()
    const updatedState = { ...currentState, ...state }
    const serializedState = JSON.stringify(updatedState)
    localStorage.setItem('app-state', serializedState)
  } catch {
    console.warn('Something went wrong')
  }
}
