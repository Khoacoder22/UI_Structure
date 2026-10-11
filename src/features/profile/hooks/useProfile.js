import { useDispatch, useSelector } from 'react-redux'

import {
  selectCurrentUser,
  updateCurrentUser,
} from '../../auth/authSlice'

import {
  isValidEmail,
  isNotEmpty,
} from '../../../utils/validators'

export default function useProfile() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)

  const saveProfile = ({ name, email }) => {
    if (!isNotEmpty(name)) {
      return {
        success: false,
        message: 'Name cannot be empty.',
      }
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        message: 'Please enter a valid email.',
      }
    }

    dispatch(
      updateCurrentUser({
        name: name.trim(),
        email: email.trim(),
      })
    )

    return {
      success: true,
      message: 'Profile updated successfully.',
    }
  }

  return {
    user,
    saveProfile,
  }
}