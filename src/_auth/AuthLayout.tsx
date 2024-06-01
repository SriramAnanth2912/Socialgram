import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthorized = true;
  return (
    (isAuthorized)? (<div>
      <Outlet />
    </div>):
    (<Navigate to='/' />)
  )
}

export default AuthLayout