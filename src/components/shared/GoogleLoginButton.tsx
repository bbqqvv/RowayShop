"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: any) => void }) => void;
          renderButton: (element: HTMLElement | null, options: { theme: string; size: string }) => void;
        };
      };
    };
  }
}

export default function GoogleLoginButton() {
  const { googleSignIn } = useAuthContext();
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null); // 🟢 Dùng useRef thay vì document.getElementById

  useEffect(() => {
    if (!window.google) return; // 🟢 Kiểm tra nếu Google SDK chưa load thì không làm gì cả

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (response) => {
        if (!response.credential) return;
        try {
          await googleSignIn(response.credential);
          console.log("✅ Google login thành công");
          router.push("/"); // 🟢 Điều hướng sau khi login
        } catch (err) {
          console.error("❌ Google login thất bại:", err);
        }
      },
    });

    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, { theme: "outline", size: "large" });
    }
  }, []); // 🟢 Chỉ chạy một lần khi component mount

  return <div ref={buttonRef}></div>; // 🟢 Gán useRef vào đây thay vì dùng getElementById
}
