import { useSelector } from 'react-redux'

import {
  selectCustomers,
  selectOrders,
} from '../dashboardSlice'

export default function useDashboardStats() {
  const customers = useSelector(selectCustomers)
  const orders = useSelector(selectOrders)

  const totalRevenue = orders
    .filter((order) => order.status !== 'Cancelled')
    .reduce((total, order) => total + order.amount, 0)

  const pendingOrders = orders.filter(
    (order) => order.status === 'Pending'
  ).length

  return {
    customers,
    orders,
    totalRevenue,
    pendingOrders,
  }
}