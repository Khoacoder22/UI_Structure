import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customers: [
    {
      id: 1,
      name: 'Nguyen Minh Anh',
      email: 'minhanh@example.com',
      status: 'Active',
      joined: '2026-10-02',
    },
    {
      id: 2,
      name: 'Tran Hoang Nam',
      email: 'nam@example.com',
      status: 'Active',
      joined: '2026-10-04',
    },
    {
      id: 3,
      name: 'Le Thu Ha',
      email: 'ha@example.com',
      status: 'Inactive',
      joined: '2026-10-06',
    },
    {
      id: 4,
      name: 'Pham Gia Bao',
      email: 'bao@example.com',
      status: 'Active',
      joined: '2026-10-08',
    },
  ],

  orders: [
    {
      id: 'ORD-1001',
      customer: 'Nguyen Minh Anh',
      date: '2026-10-10',
      amount: 1250000,
      status: 'Completed',
    },
    {
      id: 'ORD-1002',
      customer: 'Tran Hoang Nam',
      date: '2026-10-10',
      amount: 850000,
      status: 'Pending',
    },
    {
      id: 'ORD-1003',
      customer: 'Le Thu Ha',
      date: '2026-10-11',
      amount: 2400000,
      status: 'Processing',
    },
    {
      id: 'ORD-1004',
      customer: 'Pham Gia Bao',
      date: '2026-10-11',
      amount: 560000,
      status: 'Completed',
    },
    {
      id: 'ORD-1005',
      customer: 'Nguyen Minh Anh',
      date: '2026-10-12',
      amount: 1750000,
      status: 'Pending',
    },
  ],
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,

  // lay du lieu khach hang tu payload 
  reducers: {
    addCustomer: (state, action) => {
      state.customers.unshift(action.payload)
    },

    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      )
    },

    updateOrderStatus: (state, action) => {
      const order = state.orders.find(
        (item) => item.id === action.payload.id
      )

      if (order) {
        order.status = action.payload.status
      }
    },
  },
})

export const {
  addCustomer,
  deleteCustomer,
  updateOrderStatus,
} = dashboardSlice.actions

export const selectCustomers = (state) =>
  state.dashboard.customers

export const selectOrders = (state) =>
  state.dashboard.orders

export default dashboardSlice.reducer