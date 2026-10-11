export {
  default as dashboardReducer,
  addCustomer,
  deleteCustomer,
  updateOrderStatus,
  selectCustomers,
  selectOrders,
} from './dashboardSlice'

export { default as useDashboardStats } from './hooks/useDashboardStats'

export { default as StatCard } from './components/StatCard'