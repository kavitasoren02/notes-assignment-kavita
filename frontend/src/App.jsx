import { Route, Routes } from 'react-router-dom'
import './App.css'
import NoAuthRoute from './hooks/NoAuthRoute'
import FullScreenLayout from './layout/FullScreenLayout'
import Login from './pages/Login'
import ProtectedRoute from './hooks/ProtectedRoute'
import DashboardLayout from './layout/DashboardLayout'
import NotesPage from './pages/NotesPage'
import Register from './pages/Register'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <div>
      <Routes>
        <Route 
          path="/login" 
          element={
            <NoAuthRoute>
              <FullScreenLayout>
                <Login />
              </FullScreenLayout>
            </NoAuthRoute>
          } 
        />

        <Route 
          path="/register" 
          element={
            <NoAuthRoute>
              <FullScreenLayout>
                <Register />
              </FullScreenLayout>
            </NoAuthRoute>
          } 
        />

        <Route 
          path='/'
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <NotesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
