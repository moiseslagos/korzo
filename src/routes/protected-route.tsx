import { Navigate } from "react-router-dom";

import { getCookie } from "src/utils/cookie";

type ProtectedRouteProps = {
  children: React.ReactNode;
}
export default function ProtectedRoute({
  children
}: ProtectedRouteProps) {
  const getCkUser = getCookie('ck-user');
  const user = getCkUser ? JSON.parse(getCkUser) : null;
  return user ? <>{children}</> : <Navigate to="/sign-in" />;
}