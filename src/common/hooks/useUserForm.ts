import { ExtendedInitialResponseProfileUser } from 'common/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from './selectors'
import { selectUserProfile, userThunks } from 'BLL/reducers/userProfileSlice'
import { useSelector } from 'react-redux'
import { useActions } from './useActions'

export function useUserForm(
  profileUserState: ExtendedInitialResponseProfileUser,
  setProfileUserState: React.Dispatch<React.SetStateAction<ExtendedInitialResponseProfileUser>>
) {
  const profileUser = useSelector(selectUserProfile)
  const formRef = useRef<HTMLDivElement | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { updateProfileUserTC, updateProfileUserStatusTC } = useActions(userThunks)

  const saveForm = useCallback(() => {
    if (!editMode) {
      setEditMode(true)
    } else {
      setEditMode(false)
      const updatedProfileUserState = { ...profileUserState }
      setProfileUserState((prevState) => ({ ...prevState }))
      updateProfileUserTC({ params: updatedProfileUserState, isLoader: false })
      updateProfileUserStatusTC({ status: updatedProfileUserState.status, isLoader: false })
    }
  }, [editMode, profileUserState, setProfileUserState, updateProfileUserTC, updateProfileUserStatusTC])

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
    formRef,
    setEditMode,
    saveForm,
  }
}
