import { Routes, Route } from 'react-router-dom'
import Login from './login/selectRole.jsx'
import LoginScreen from './login/loginScreen.jsx'
import Sidebar from './Components/sidebar.jsx'
import Header from './Components/header.jsx'

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