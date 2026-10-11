import LoginForm from '../../features/auth/components/LoginForm'

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <section className="hidden flex-col justify-between bg-indigo-600 p-10 text-white md:flex">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest">
              NOVA ADMIN
            </p>

            <h1 className="mt-16 text-4xl font-bold leading-tight">
              Manage your workspace in one place.
            </h1>

            <p className="mt-5 leading-7 text-indigo-100">
              View your dashboard, customers and orders from
              a single administration panel.
            </p>
          </div>

          <p className="text-sm text-indigo-200">
            Frontend learning project
          </p>
        </section>

        <section className="p-6 sm:p-10">
          <LoginForm />
        </section>
      </div>
    </main>
  )
}