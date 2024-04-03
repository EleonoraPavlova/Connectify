import { ExtendedInitialResponseProfileUser } from 'common/types'
import { ChangeEvent, useCallback, useState } from 'react'
import { useAppDispatch } from './selectors'
import { userThunks } from 'BLL/reducers/userProfileSlice'

export function useUserForm(
  profileUserState: ExtendedInitialResponseProfileUser,
  setProfileUserState: React.Dispatch<React.SetStateAction<ExtendedInitialResponseProfileUser>>
  // updateProfileUser: () => void,
  // updateProfileUserStatus: () => void
) {
  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const collectionOfForm = (key: string, title: string) => {
    setProfileUserState((prevState: ExtendedInitialResponseProfileUser) => ({
      ...prevState,
      [key]: title,
    }))
  }

  const collectionOfFormCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileUserState((prevState: ExtendedInitialResponseProfileUser) => ({
      ...prevState,
      lookingForAJob: e.currentTarget.checked,
    }))
  }

  // useEffect(() => {
  //   const body = document.querySelector('body')
  //   if (editMode) {
  //     body?.addEventListener('click', handleContainerClick)
  //   }
  // }, [editMode])

  const saveForm = useCallback(() => {
    if (!editMode) {
      setEditMode(true)
    } else {
      // updateProfileUser()
      // updateProfileUserStatus()
      setEditMode(false)
      const updatedProfileUserState = { ...profileUserState }
      setProfileUserState((prevState) => ({ ...prevState }))
      dispatch(userThunks.updateProfileUserTC({ params: updatedProfileUserState }))
      dispatch(userThunks.updateProfileUserStatusTC({ status: updatedProfileUserState.status }))
    }
  }, [editMode, profileUserState, setProfileUserState, dispatch])

  // useEffect(() => {
  //   dispatch(userThunks.updateProfileUserTC({ params: profileUser }))
  //   console.log('profileUserState', profileUserState) //сюда приходит инфа пачка со статусом
  // }, [profileUserState])

  // const formRef = useRef(null)
  // const handleContainerClick = (e: Event) => {
  //   e.preventDefault()
  //   const currentElement = e.target

  //   if (formRef.current) {
  //     // @ts-ignore
  //     const isContain = formRef.current.contains(currentElement)

  //     if (!isContain) {
  //       setEditMode(false)
  //       const updatedProfileUserState = { ...profileUserState }
  //       setProfileUserState((prevState) => ({ ...prevState }))
  //dispatch(userThunks.updateProfileUserTC({ params: updatedProfileUserState }))
  //dispatch(userThunks.updateProfileUserStatusTC({ status: updatedProfileUserState.status }))
  // debugger
  // const body = document.querySelector('body')
  // body?.removeEventListener('click', handleContainerClick)
  //   }
  //    }
  // }

  return {
    editMode,
    // formRef,
    setEditMode,
    collectionOfForm,
    collectionOfFormCheckbox,
    saveForm,
  }
}
