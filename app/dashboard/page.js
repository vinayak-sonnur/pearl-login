"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Welcome to Dashboard 🎉</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
