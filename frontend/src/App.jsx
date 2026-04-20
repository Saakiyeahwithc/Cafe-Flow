import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/selectRole.jsx'
import LoginScreen from './pages/auth/loginScreen.jsx'
import Sidebar from './components/layouts/sidebar.jsx'
import Header from './components/layouts/header.jsx'

function App() {
 return (
    <Routes>
      {/* Select role screen */}
      <Route path="/" element={<Login />} />

      {/* Login screen */}
      <Route path="/login" element={<LoginScreen />} />

      {/* Dashboard (Sidebar + Header together) */}
      <Route
        path="/sidebar"
        element={(
            <div className="flex min-h-screen">
              <Sidebar />
              <Header />
            </div>
          )}
      />
    </Routes>
  )
}

export default App