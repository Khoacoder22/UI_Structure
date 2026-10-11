import {
  Users,
  ShoppingCart,
  CircleDollarSign,
  Clock,
} from 'lucide-react'

import {
  useDashboardStats,
  StatCard,
} from '../../features/dashboard'

import StatusBadge from '../../components/common/StatusBadge'

const formatCurrency = (amount) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount)

const revenueData = [
  { month: 'May', value: 42 },
  { month: 'Jun', value: 65 },
  { month: 'Jul', value: 50 },
  { month: 'Aug', value: 78 },
  { month: 'Sep', value: 60 },
  { month: 'Oct', value: 90 },
]

export default function Dashboard() {
  const {
    customers,
    orders,
    totalRevenue,
    pendingOrders,
  } = useDashboardStats()

  const stats = [
    {
      title: 'Total Customers',
      value: customers.length,
      icon: Users,
      iconClassName: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      iconClassName: 'bg-sky-50 text-sky-600',
    },
    {
      title: 'Revenue',
      value: formatCurrency(totalRevenue),
      icon: CircleDollarSign,
      iconClassName: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Pending Orders',
      value: pendingOrders,
      icon: Clock,
      iconClassName: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-bold text-slate-900">
          Dashboard Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening in your workspace.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="font-bold text-slate-900">
          Revenue Overview
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Sample monthly chart
        </p>

        <div className="mt-6 flex h-48 items-end gap-3 border-b border-slate-100 pb-2 sm:gap-6">
          {revenueData.map((item) => (
            <div
              key={item.month}
              className="flex h-full flex-1 items-end justify-center"
            >
              <div
                title={`${item.month}: ${item.value}`}
                className="w-full max-w-12 rounded-t-lg bg-indigo-500 hover:bg-indigo-600"
                style={{ height: `${item.value}%` }}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-between text-xs text-slate-500">
          {revenueData.map((item) => (
            <span key={item.month}>{item.month}</span>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-bold text-slate-900">
            Recent Orders
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-indigo-600">
                    {order.id}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {order.customer}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {formatCurrency(order.amount)}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}