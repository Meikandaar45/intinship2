"use client";

import { useState, useEffect } from "react";
import { getStoredUser, logoutUser, verifyCurrentSession, AuthUser } from "@/lib/auth";
import AuthModal from "./AuthModal";

export default function UserHeader() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Initial check from localStorage
    setUser(getStoredUser());

    // Verify session against server
    verifyCurrentSession().then((u) => setUser(u));

    // Listen for auth change events
    function handleAuthChange() {
      setUser(getStoredUser());
    }

    window.addEventListener("ipl_auth_change", handleAuthChange);
    return () => window.removeEventListener("ipl_auth_change", handleAuthChange);
  }, []);

  async function handleLogout() {
    await logoutUser();
    setUser(null);
  }

  return (
    <div className="flex items-center justify-between py-2 mb-4 border-b border-white/10">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-semibold tracking-wide text-muted">
          Supabase Connected
        </span>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs">
            <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-[10px]">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div className="flex flex-col text-left">
              <span className="font-semibold text-foreground leading-tight truncate max-w-[120px]">
                {user.name}
              </span>
              <span className="text-[10px] text-muted truncate max-w-[120px]">
                {user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="ml-1 text-muted hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 border border-gold/30 px-3.5 py-1 text-xs font-semibold text-gold hover:bg-gold/20 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Fan Login / Register
          </button>
        )}
      </div>

      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={(u) => setUser(u)}
      />
    </div>
  );
}
