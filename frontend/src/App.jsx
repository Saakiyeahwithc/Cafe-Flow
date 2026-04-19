import { Routes, Route } from 'react-router-dom'
import UserLogin from './login.jsx'
import LoginScreen from './loginScreen.jsx'
import Sidebar from './sidebar.jsx'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/sidebar" element={<Sidebar />} />
    </Routes>
    {/*<Testing/>*/}
    </>
  )
}

export default App