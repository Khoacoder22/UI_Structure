import { useDispatch, useSelector } from 'react-redux'

import {
  loginUser,
  logout as logoutAction,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthStatus,
  selectAuthError,
} from '../authSlice'

export default function useAuth() {
  const dispatch = useDispatch()

  const user = useSelector(selectCurrentUser)

  const isAuthenticated = useSelector(
    selectIsAuthenticated
  )

  const status = useSelector(selectAuthStatus)
  const error = useSelector(selectAuthError)

  const login = (credentials) => {
    return dispatch(loginUser(credentials)).unwrap()
  }

  const logout = () => {
    dispatch(logoutAction())
  }

  return {
    user,
    isAuthenticated,
    status,
    error,
    login,
    logout,
  }
}