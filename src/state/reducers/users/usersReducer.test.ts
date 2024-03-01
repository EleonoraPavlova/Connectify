import { ResponseDomainType, toggleFollowUserAC, increaseLikeCounterAC, decreaseLikeCounterAC } from './usersReducer'
import { usersReducer } from './usersReducer'

test('reducer should toggle follow status', () => {
  let state: ResponseDomainType = {
    items: [
      {
        name: 'Shubert',
        id: 1,
        photos: {
          small: '',
          large: '',
        },
        status: '',
        followingInProgress: 'idle',
        likeCounter: 1,
        followed: false,
      },
      {
        name: 'Hacker',
        id: 2,
        photos: {
          small: '',
          large: '',
        },
        status: '',
        followingInProgress: 'loading',
        likeCounter: 4,
        followed: false,
      },
    ],
    totalCount: 30,
    error: '',
    isLoader: false,
  }

  let endState = usersReducer(state, toggleFollowUserAC(1, false))

  expect(state.items[0].id).toBe(1)
  expect(endState.items[0].followed).toBe(true)
  expect(endState.items[0].followingInProgress).toBe('idle')
  expect(endState.items[1].followingInProgress).toBe('loading')
})

test('reducer should increase likeCounter', () => {
  let state: ResponseDomainType = {
    items: [
      {
        name: 'Shubert',
        id: 1,
        photos: {
          small: '',
          large: '',
        },
        status: '',
        followingInProgress: 'idle',
        likeCounter: 1,
        followed: false,
      },
      {
        name: 'Hacker',
        id: 2,
        photos: {
          small: '',
          large: '',
        },
        status: '',
        followingInProgress: 'loading',
        likeCounter: 4,
        followed: false,
      },
    ],
    totalCount: 30,
    error: '',
    isLoader: false,
  }

  let endState = usersReducer(state, increaseLikeCounterAC(1))

  expect(state.items[0].id).toBe(1)
  expect(endState.items[0].followed).toBe(true)
  expect(endState.items[0].likeCounter).toBe(2)
  expect(endState.items[1].likeCounter).toBe(4)
})

test('reducer should decrease likeCounter', () => {
  let state: ResponseDomainType = {
    items: [
      {
        name: 'Shubert',
        id: 1,
        photos: {
          small: '',
          large: '',
        },
        status: '',
        followingInProgress: 'idle',
        likeCounter: 1,
        followed: false,
      },
      {
        name: 'Hacker',
        id: 2,
        photos: {
          small: '',
          large: '',
        },
        status: '',
        followingInProgress: 'loading',
        likeCounter: 4,
        followed: false,
      },
    ],
    totalCount: 30,
    error: '',
    isLoader: false,
  }

  let endState = usersReducer(state, decreaseLikeCounterAC(2))

  expect(state.items[0].id).toBe(1)
  expect(endState.items[0].followed).toBe(true)
  expect(endState.items[0].likeCounter).toBe(1)
  expect(endState.items[1].likeCounter).toBe(3)
})
