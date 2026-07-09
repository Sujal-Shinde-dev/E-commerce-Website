import { useAuthStore } from "@/features/auth/store";
import { Navigate } from "react-router-dom";
import { Commonloader } from "@/components/common/Loader";

export function AuthCallbackPage() {
  const { isBootstrapped, status, user } = useAuthStore();

  if (!isBootstrapped || status === "loading") {
    return <Commonloader />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/" replace />;
}
