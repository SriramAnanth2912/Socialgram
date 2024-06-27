import './globals.css';
import { Routes, Route } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import RootLayout from './_root/RootLayout';
import AuthLayout from './_auth/AuthLayout';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <main className='flex h-screen'>
     <Routes>
       {/* public routes - signup and signin */}
       <Route element={<AuthLayout/>}>
        <Route path='/sign-in' element={<SigninForm />} />
        <Route path='/sign-up' element={<SignupForm />} />
      </Route>
      {/* private routes  - Home  */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/saved' element={<Saved/>}/>
        <Route path='/all-users' element={<AllUsers/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/update-post/:id' element={<EditPost/>}/>
        <Route path='/Posts/:id' element={<PostDetails/>}/>
        <Route path='/profile/:id/*' element={<Profile/>}/>
        <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
      </Route>
     </Routes>
     
     <Toaster />
     <Analytics />
     <SpeedInsights />
    </main>
  )
}

export default App