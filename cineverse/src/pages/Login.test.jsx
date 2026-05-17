import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login.jsx'

const login = vi.fn()

vi.mock('../context/AuthContext.jsx', () => ({
  useAuth: () => ({
    login,
    loginWithGoogle: vi.fn(),
    isFirebaseConfigured: true,
  }),
}))

test('submits email and password login', async () => {
  login.mockResolvedValueOnce({})
  const user = userEvent.setup()

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  )

  await user.type(screen.getByPlaceholderText('Email'), 'cine@example.com')
  await user.type(screen.getByPlaceholderText('Password'), 'secret123')
  await user.click(screen.getByRole('button', { name: 'Log in' }))

  expect(login).toHaveBeenCalledWith('cine@example.com', 'secret123')
})
