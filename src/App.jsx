import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import ProtectedRoute from './routes/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import MainLayout from './layouts/MainLayout'
import useThemeStore from './stores/themeStore'
import CompaniesPage from './pages/CompaniesPage'
import TripsPage from './pages/TripsPage'
import BookingsPage from './pages/BookingsPage'
import UsersPage from './pages/UsersPage'
import CitiesPage from './pages/CitiesPage'

function App() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="trips" element={<TripsPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="cities" element={<CitiesPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
