import { ProfileForm } from '../../features/profile'

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information.
        </p>
      </div>

      <ProfileForm />
    </div>
  )
}