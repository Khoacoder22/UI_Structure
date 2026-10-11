import { useEffect, useState } from 'react'
import { Save, UserRound } from 'lucide-react'

import useProfile from '../hooks/useProfile'

export default function ProfileForm() {
  const { user, saveProfile } = useProfile()

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setName(user?.name ?? '')
    setEmail(user?.email ?? '')
  }, [user?.name, user?.email])

  const handleSubmit = (event) => {
    event.preventDefault()

    const result = saveProfile({ name, email })

    setError(result.success ? '' : result.message)
    setMessage(result.success ? result.message : '')
  }

  if (!user) {
    return (
      <p className="text-sm text-slate-500">
        No user profile found.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <section className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
          <UserRound size={32} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {user.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {user.role}
          </p>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
      >
        <div>
          <h3 className="font-bold text-slate-900">
            Personal Information
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Update your name and email address.
          </p>
        </div>

        <div>
          <label
            htmlFor="profileName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>

          <input
            id="profileName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="profileEmail"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <input
            id="profileEmail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
          </label>

          <input
            value={user.role}
            readOnly
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-rose-600">
            {error}
          </p>
        )}

        {message && (
          <p role="status" className="text-sm text-emerald-600">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Save size={17} />
          Save Changes
        </button>
      </form>
    </div>
  )
}