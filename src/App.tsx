import './globals.css';
import { Routes, Route } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import RootLayout from './_root/RootLayout';
import AuthLayout from './_auth/AuthLayout';
import { Home } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';

function App() {
  return (
    <main className='flex h-screen'>
     <Routes>
       {/* public routes - signup and signin */}
       <Route element={<AuthLayout/>}>
        <Route path='/sign-in' element={<SigninForm />} />
        <Route path='/sign-up' element={<SignupForm />} />
      </Route>
      {/* private routes  - home  */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
     </Routes>
    </main>
  )
}

export default App