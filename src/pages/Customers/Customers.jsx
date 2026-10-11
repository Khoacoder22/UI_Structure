import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, Search, Trash2, X } from 'lucide-react'

import {
  addCustomer,
  deleteCustomer,
  selectCustomers,
} from '../../features/dashboard/dashboardSlice'

import StatusBadge from '../../components/common/StatusBadge'

export default function Customers() {
  const dispatch = useDispatch()
  const customers = useSelector(selectCustomers)

  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase()

    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword)
    )
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    const cleanName = name.trim()
    const cleanEmail = email.trim()

    if (!cleanName || !cleanEmail) {
      return
    }

    dispatch(
      addCustomer({
        id: Date.now(),
        name: cleanName,
        email: cleanEmail,
        status: 'Active',
        joined: new Date().toISOString().slice(0, 10),
      })
    )

    setName('')
    setEmail('')
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Customer Management
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage and organize your customers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((previous) => !previous)}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Close Form' : 'Add Customer'}
        </button>
      </section>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-3"
        >
          <div>
            <label
              htmlFor="customerName"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Full name
            </label>

            <input
              id="customerName"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter customer name"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="customerEmail"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="customerEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Save Customer
            </button>
          </div>
        </form>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-slate-900">
              All Customers
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {filteredCustomers.length} customers found
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search customers..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">
                    {customer.name}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    {customer.email}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                    {customer.joined}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge status={customer.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      aria-label={`Delete ${customer.name}`}
                      onClick={() =>
                        dispatch(deleteCustomer(customer.id))
                      }
                      className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No customers found.
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