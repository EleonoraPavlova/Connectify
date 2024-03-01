import { authReducer, setIsLoggedInAC, setLogginParamsAC } from './authReducer'

type initialParamsAuth = {
  email: string
  password: string
  rememberMe: boolean
  isLoggedIn: boolean
}
let startState: initialParamsAuth

beforeEach(() => {
  startState = {
    email: '',
    password: '',
    rememberMe: false,
    isLoggedIn: false,
  }
})

test('auth params should be set', () => {
  const endState = authReducer(
    startState,
    setLogginParamsAC({
      email: 'vdfhhg@gmail.com',
      password: '123456',
      rememberMe: true,
    })
  )

  expect(endState.isLoggedIn).toBe(true)
  expect(endState.email).toBe('vdfhhg@gmail.com')
  expect(endState.password).toBe('123456')
})

test('auth isLoggedIn should be set', () => {
  const endState = authReducer(startState, setIsLoggedInAC(true))

  expect(endState.isLoggedIn).toBe(true)
  expect(startState.isLoggedIn).toBe(false)
})
