"use client";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;

  
  return (
    <nav className="w-full h-16 flex items-center shadow-2xl bg-white justify-between  px-7 py-5">
      <h1 className="text-2xl font-bold text-black ">True Feedback</h1>
      {session ? (
        <>
          <p className="text-xl"> Hii , {user?.username || user?.email}</p>
          <Button variant={"default"} onClick={() => signOut()}>
            Sign out
          </Button>
        </>
      ) : (
        <Link href="/sign-in">
          <Button variant={"default"}>Login</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
