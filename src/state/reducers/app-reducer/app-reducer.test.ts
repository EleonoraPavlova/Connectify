import { appInitialStatusState, appReducer, setErrorAppAC, setStatusAppAC } from './appReducer'

test('correct error message should be set', () => {
  const endState = appReducer(appInitialStatusState, setErrorAppAC('New error'))

  expect(endState.error).toBe('New error')
  expect(appInitialStatusState.error).toBe(null)
})

test('correct status should be set', () => {
  const endState = appReducer(appInitialStatusState, setStatusAppAC('succeeded'))

  expect(endState.statusApp).toBe('succeeded')
  expect(appInitialStatusState.statusApp).toBe('idle')
})
