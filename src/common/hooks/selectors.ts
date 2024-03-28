import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, AppRootState } from '../store'

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
