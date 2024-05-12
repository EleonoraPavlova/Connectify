import { ExtendedInitialResponseProfileUser, UserPhotos } from 'common/types'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
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
  const { updateProfileUserTC, updateProfileUserStatusTC, updateProfileUserPhotoTC } = useActions(userThunks)

  const updatePhotoUser = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0] as unknown as string
      const updatedProfileUserState: ExtendedInitialResponseProfileUser = {
        ...profileUserState,
        photos: {
          ...profileUserState.photos,
          large: file,
        },
      }
      setProfileUserState(updatedProfileUserState)
    }
  }

  const saveForm = useCallback(() => {
    if (!editMode) {
      setEditMode(true)
    } else {
      setEditMode(false)
      const updatedProfileUserState = { ...profileUserState }
      setProfileUserState((prevState) => ({ ...prevState }))
      updateProfileUserTC({ params: updatedProfileUserState })
      updateProfileUserStatusTC({ status: updatedProfileUserState.status })

      const updatedUserPhotos: UserPhotos = {
        ...profileUserState.photos,
        large: updatedProfileUserState.photos.large,
      }
      updateProfileUserPhotoTC(updatedUserPhotos)
    }
  }, [
    editMode,
    profileUserState,
    setProfileUserState,
    updateProfileUserTC,
    updateProfileUserStatusTC,
    updateProfileUserPhotoTC,
  ])

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
    updatePhotoUser,
    saveForm,
  }
}
