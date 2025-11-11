"use client";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-screen bg-white shadow-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold text-black">
          True Feedback
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">
          {session ? (
            <>
              <p className="text-lg text-gray-800">
                Hi,{" "}
                <span className="font-semibold">
                  {user?.username || user?.email}
                </span>
              </p>
              <Button
                onClick={() => signOut()}
                className="bg-black text-white hover:bg-gray-800 transition-all"
              >
                Sign out
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-black text-white hover:bg-gray-800 transition-all">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-inner">
          <div className="px-5 py-3 flex flex-col space-y-3">
            {session ? (
              <>
                <p className="text-base text-gray-700">
                  Hi, {user?.username || user?.email}
                </p>
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="w-full bg-black text-white hover:bg-gray-800 transition-all"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-black text-white hover:bg-gray-800 transition-all">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
