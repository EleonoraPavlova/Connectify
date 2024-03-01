import { appInitialStatusState, appReducer, setErrorAppAC, setAppStatusAC } from './appSlice'

test('correct error message should be set', () => {
  const endState = appReducer(appInitialStatusState, setErrorAppAC('New error'))

  expect(endState.error).toBe('New error')
  expect(appInitialStatusState.error).toBe(null)
})

test('correct status should be set', () => {
  const endState = appReducer(appInitialStatusState, setAppStatusAC('succeeded'))

  expect(endState.statusApp).toBe('succeeded')
  expect(appInitialStatusState.statusApp).toBe('idle')
})
