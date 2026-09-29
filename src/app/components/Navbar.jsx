"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Spinner } from "@heroui/react";
import { LogoApple } from "@gravity-ui/icons";
import { SignOut, useSession } from "@/lib/auth-client";

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {data: session, isPending} = useSession();
  console.log("user session in navbar",session);

  if (isPending) {
    return  <div className="flex flex-col items-center gap-2">
        <Spinner color="accent" />
      </div>;
  }

  const links = (
    <>
      <Link href="/dashboard" className="block py-2">
        Dashboard
      </Link>
      <Link href="#" className="block py-2">
        Docs
      </Link>
      <Link href="#" className="block py-2">
        Support
      </Link>
      <Link href="#" className="block py-2">
        Blog
      </Link>
    </>
  );

  const authLinks = (
    <>
     {
      session?.user ? <>
       <span>Welcome, {session.user.name}</span>
       <Button onClick={() => SignOut()}>Sign Out</Button>
      </> : <>
       <Link href="/sign-in">Sign In</Link>
      <Link
        href="/sign-up"
        className="bg-blue-500 px-3 py-2 rounded-3xl text-sm hover:bg-blue-800"
      >
        Sign Up
      </Link>
      </>
     }
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
             <LogoApple />
            <Link className="font-bold" href="/">ACME</Link>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">{links}</ul>
        <div className="hidden items-center gap-4 md:flex">{authLinks}</div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {links}
            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              {authLinks}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
