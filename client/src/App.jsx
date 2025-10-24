import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLogin from './pages/auth/login'
import AuthSignUp from './pages/auth/signup'
import AuthLayout from './components/auth/layout'
import Mainlayout from './components/Home/layout'
import BrailleBridgePage from './pages/Home/BrailleBridgePage'
import NotFound from './pages/notfound'
import CheckAuth from './components/common/checkAuth'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import Conversion from './pages/conversion/conversion'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route index element={<BrailleBridgePage />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="signup" element={<AuthSignUp />} />
        </Route>
        <Route path='convert' element={<CheckAuth><Conversion/></CheckAuth>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
