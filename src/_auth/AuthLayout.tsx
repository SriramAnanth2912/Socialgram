import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthorized = true;
  return (
    (isAuthorized)? (
    <div className="flex flex-1 justify-center items-center h-screen">
      <Outlet />
    </div>):
    (<Navigate to='/' />)
  )
}

export default AuthLayout