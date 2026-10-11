import { configureStore } from '@reduxjs/toolkit'
import { dashboardReducer,   authReducer} from './slices'

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
  },
})