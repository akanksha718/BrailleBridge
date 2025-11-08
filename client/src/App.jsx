import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLogin from './pages/auth/login'
import AuthSignUp from './pages/auth/signup'
import AuthLayout from './components/auth/layout'
import BrailleBridgePage from './pages/Home/BrailleBridgePage'
import NotFound from './pages/notfound'
import CheckAuth from './components/common/checkAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import ChatPage from './pages/conversion/conversion'
import { Skeleton } from './components/ui/skeleton'

function App() {
  const { user, isloading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isloading) return <Skeleton className="h-[20px] w-[100px] rounded-full" />;
  return (
    <Routes>
      <Route path="/" element={<BrailleBridgePage />}/>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="signup" element={<AuthSignUp />} />
        </Route>
        <Route path='/convert' element={<CheckAuth><ChatPage user={user}/></CheckAuth>}/>
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
