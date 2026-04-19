import { Routes, Route } from 'react-router-dom'
import UserLogin from './login.jsx'
import LoginScreen from './loginScreen.jsx'
import Testing from './sidebar.jsx'

function App() {
  return (
    <>
    {/* <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/login" element={<LoginScreen />} />
    </Routes>*/}
    <Testing/>
    </>
  )
}

export default App