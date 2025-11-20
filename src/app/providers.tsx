"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store, persistor } from "@/redux/store";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import PageLoader from "@/components/shared/PageLoader";

export default function Providers({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }, []);

    // Show loader briefly when pathname changes
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 250); // Show loader for minimum 250ms for smooth transition

        return () => clearTimeout(timer);
    }, [pathname]);

    // Listen to link clicks to show loader immediately
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            if (link && link.href && !link.href.startsWith("mailto:") && !link.href.startsWith("tel:")) {
                const url = new URL(link.href);
                const currentUrl = new URL(window.location.href);

                // Only show loader for internal navigation
                if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
                    setIsLoading(true);
                }
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <>
            {isLoading && <PageLoader />}
            <ToastContainer position="top-right" autoClose={3000} />
            <Provider store={store}>
                <PersistGate loading={children} persistor={persistor}>
                    <AuthProvider>
                        <div className="layout min-h-screen flex flex-col bg-gray-100 text-gray-900">
                            {!isAdminRoute && <Header />}
                            <main className="flex-grow">{children}</main>
                            {!isAdminRoute && <Footer />}
                        </div>
                    </AuthProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
