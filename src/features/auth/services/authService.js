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