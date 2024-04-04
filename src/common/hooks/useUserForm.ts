import { ExtendedInitialResponseProfileUser } from 'common/types'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from './selectors'
import { selectUserProfile, userThunks } from 'BLL/reducers/userProfileSlice'
import { useSelector } from 'react-redux'

export function useUserForm(
  profileUserState: ExtendedInitialResponseProfileUser,
  formRef: React.MutableRefObject<HTMLDivElement | null>,
  setProfileUserState: React.Dispatch<React.SetStateAction<ExtendedInitialResponseProfileUser>>
) {
  const profileUser = useSelector(selectUserProfile)
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

  const saveForm = useCallback(() => {
    if (!editMode) {
      setEditMode(true)
    } else {
      setEditMode(false)
      const updatedProfileUserState = { ...profileUserState }
      setProfileUserState((prevState) => ({ ...prevState }))
      dispatch(userThunks.updateProfileUserTC({ params: updatedProfileUserState, isLoader: false }))
      dispatch(userThunks.updateProfileUserStatusTC({ status: updatedProfileUserState.status, isLoader: false }))
    }
  }, [editMode, profileUserState, setProfileUserState, dispatch])

  useEffect(() => {
    const globalBlurHandler = (e: MouseEvent) => {
      e.preventDefault()
      if (formRef) {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
          setEditMode(false)
          setProfileUserState(profileUser)
        }
      }
    }
    document.addEventListener('click', globalBlurHandler)

    return () => {
      document.removeEventListener('click', globalBlurHandler)
    }
  })

  return {
    editMode,
    setEditMode,
    collectionOfForm,
    collectionOfFormCheckbox,
    saveForm,
  }
}
