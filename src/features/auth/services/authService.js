const DEMO_EMAIL = 'admin@example.com'
const DEMO_PASSWORD = 'admin123'

export async function login(credentials) {
  const email = credentials.email?.trim().toLowerCase()
  const password = credentials.password

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    throw new Error('Email hoặc mật khẩu không chính xác.')
  }

  return {
    token: 'demo-token',
    user: {
      id: 1,
      name: 'Admin User',
      email: DEMO_EMAIL,
      role: 'Administrator',
    },
  }
}

// API

// const API_URL = import.meta.env.VITE_API_URL

// export async function login(credentials) {
//   const response = await fetch(`${API_URL}/api/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: credentials.email.trim().toLowerCase(),
//       password: credentials.password,
//     }),
//   })

//   const data = await response.json().catch(() => ({}))

//   if (!response.ok) {
//     throw new Error(
//       data.message || 'Email hoặc mật khẩu không chính xác.'
//     )
//   }

//   return data
// }
