"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        window.location.href = "/";
      } else {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      <p className="mt-4 text-gray-600">Logged in as: {user.email}</p>
    </div>
  );
}
