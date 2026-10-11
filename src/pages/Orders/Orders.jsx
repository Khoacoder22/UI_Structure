import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search, ShoppingCart } from 'lucide-react'

import {
  selectOrders,
  updateOrderStatus,
} from '../../features/dashboard/dashboardSlice'

const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount)

const statusStyles = {
  Completed: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Processing: 'bg-blue-50 text-blue-700',
  Cancelled: 'bg-rose-50 text-rose-700',
}

export default function Orders() {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filteredOrders = orders.filter((order) => {
    const keyword = search.toLowerCase()

    const matchesSearch =
      order.id.toLowerCase().includes(keyword) ||
      order.customer.toLowerCase().includes(keyword)

    const matchesStatus =
      filter === 'All' || order.status === filter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(
      updateOrderStatus({
        id: orderId,
        status: newStatus,
      })
    )
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-bold text-slate-900">
          Order Management
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track and manage customer orders.
        </p>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <ShoppingCart size={22} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                All Orders
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {filteredOrders.length} orders found
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search orders..."
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 sm:w-56"
              />
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
            >
              <option value="All">All statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Order ID</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-indigo-600">
                    {order.id}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-700">
                    {order.customer}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    {order.date}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800">
                    {formatCurrency(order.amount)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <select
                      aria-label={`Status of ${order.id}`}
                      value={order.status}
                      onChange={(event) =>
                        handleStatusChange(
                          order.id,
                          event.target.value
                        )
                      }
                      className={`rounded-full border-0 px-3 py-2 text-xs font-semibold outline-none ${statusStyles[order.status] || 'bg-slate-100 text-slate-600'}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}