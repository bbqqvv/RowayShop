"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { CircularProgress } from "@nextui-org/react";
import useAuth from "@/hooks/auth/useAuth";
import AdminLayout from "./components/AdminLayout";

interface LayoutProps {
  children: ReactNode;
}
const AdminChecking: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/sign-in"); // Use replace to prevent navigating back to this page.
    }
  }, [token, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress size="lg" />
      </div>
    );
  }

  if (!token) {
    return null; // Avoid rendering any content if no token is present.
  }

  return <>{children}</>;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <AdminLayout>
        <AdminChecking>{children}</AdminChecking>
      </AdminLayout>
    </main>
  );
};

export default Layout;
