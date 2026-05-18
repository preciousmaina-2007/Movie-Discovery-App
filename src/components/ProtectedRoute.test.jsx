import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.jsx'

vi.mock('../context/AuthContext.jsx', () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from '../context/AuthContext.jsx'

test('redirects anonymous users to login', () => {
  useAuth.mockReturnValue({ currentUser: null, authLoading: false })

  render(
    <MemoryRouter initialEntries={['/favorites']}>
      <Routes>
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <div>Protected content</div>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>,
  )

  expect(screen.getByText('Login page')).toBeInTheDocument()
})

test('renders protected content for authenticated users', () => {
  useAuth.mockReturnValue({ currentUser: { uid: '123' }, authLoading: false })

  render(
    <MemoryRouter initialEntries={['/favorites']}>
      <Routes>
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <div>Protected content</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  )

  expect(screen.getByText('Protected content')).toBeInTheDocument()
})
