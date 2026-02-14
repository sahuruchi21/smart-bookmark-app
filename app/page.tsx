"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  user_id: string;
  created_at: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch bookmarks
  const fetchBookmarks = async (userId: string) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBookmarks(data);
    }
  };

  useEffect(() => {
    let channel: any;

    const init = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/";
        return;
      }

      setUser(data.user);
      await fetchBookmarks(data.user.id);

      // 🔥 REALTIME SUBSCRIPTION
      channel = supabase
        .channel("bookmarks-realtime")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${data.user.id}`,
          },
          () => {
            fetchBookmarks(data.user.id);
          }
        )
        .subscribe();

      setLoading(false);
    };

    init();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  // 🔹 Add bookmark
  const handleAddBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    setTitle("");
    setUrl("");
  };

  // 🔹 Delete bookmark
  const handleDelete = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  // 🔹 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <button
          onClick={handleLogout}
          className="text-red-500 font-medium"
        >
          Logout
        </button>
      </div>

      {/* Add Bookmark */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Bookmark Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Bookmark URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleAddBookmark}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90"
        >
          Add Bookmark
        </button>
      </div>

      {/* Bookmark List */}
      <div className="space-y-3">
        {bookmarks.length === 0 && (
          <p className="text-gray-500 text-center">
            No bookmarks yet. Add your first one 🚀
          </p>
        )}

        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-semibold">{bookmark.title}</p>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm"
              >
                {bookmark.url}
              </a>
            </div>

            <button
              onClick={() => handleDelete(bookmark.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
