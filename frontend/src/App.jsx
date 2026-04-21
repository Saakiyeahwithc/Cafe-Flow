import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/selectRole.jsx'
import LoginScreen from './pages/auth/loginScreen.jsx'
import Sidebar from './components/layouts/sidebar.jsx'
import Header from './components/layouts/header.jsx'
import Signin from './pages/auth/signin.jsx'
import Staff from './components/layouts/staff.jsx'

function App() {
 return (<>
    <Routes>
      {/* Select role screen */}
      <Route path="/" element={<Login />} />

      {/* Login screen */}
      <Route path="/login" element={<LoginScreen />} />

      {/* Sign in screen */}
      <Route path="/signin" element={<Signin />} />

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
    {/* {<Staff/>} */}
    </>
  )
}

export default App