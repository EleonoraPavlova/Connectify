import { ExtendedInitialResponseProfileUser } from 'common/types'
import {
  ChangeEvent,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { selectUserProfile, userThunks } from 'BLL/reducers/userProfileSlice'
import { useSelector } from 'react-redux'
import { useActions } from './useActions'

export function useUserForm(
  profileUserState: ExtendedInitialResponseProfileUser,
  setProfileUserState: Dispatch<SetStateAction<ExtendedInitialResponseProfileUser>>
) {
  const profileUser = useSelector(selectUserProfile)
  const filePicker: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const formRef = useRef<HTMLDivElement | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)
  const { updateProfileUserTC, updateProfileUserStatusTC, updateProfileUserPhotoTC } = useActions(userThunks)

  const updatePhotoUser = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0]

      setProfileUserState((prevState) => ({
        ...prevState,
        photos: { small: file as any, large: file as any },
      }))
    }
  }

  const saveForm = useCallback(async () => {
    if (!editMode) {
      setEditMode(true)
    } else {
      setEditMode(false)
      const updatedProfileUserState = { ...profileUserState }
      setProfileUserState((prevState) => ({ ...prevState }))

      if (profileUser.status !== profileUserState.status) {
        updateProfileUserStatusTC({ status: updatedProfileUserState.status })
      }

      if (profileUser.photos !== profileUserState.photos) {
        updateProfileUserPhotoTC({
          small: updatedProfileUserState.photos.small,
          large: updatedProfileUserState.photos.large,
        })
      }

      const { status, photos, ...params } = updatedProfileUserState
      updateProfileUserTC({ params })
    }
  }, [
    editMode,
    profileUserState,
    setProfileUserState,
    updateProfileUserTC,
    updateProfileUserStatusTC,
    updateProfileUserPhotoTC,
  ])

  const handlePick = () => {
    if (filePicker.current !== null) {
      filePicker.current.click()
    }
  }

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
    filePicker,
    formRef,
    setEditMode,
    updatePhotoUser,
    saveForm,
    handlePick,
  }
}
