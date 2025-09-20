"use client"
import { useState, useContext } from "react";
import Link from "next/link";
import { Loader, ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "../context/CartContext";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { isLoading, cartData } = useContext(CartContext);
  const session = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="py-3 bg-gray-50 shadow font-semibold relative">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          ShopMart
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-5 items-center">
          <div className="flex flex-1 justify-center gap-5">
            <Link
              href="/products"
              className="px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-900 hover:text-white transition"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-900 hover:text-white transition"
            >
              Categories
            </Link>
            <Link
              href="/brands"
              className="px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-900 hover:text-white transition"
            >
              Brands
            </Link>
          </div>

          {/* Right side: Hi user + UserIcon + Cart */}
          <div className="flex items-center gap-4">
            {session.status === "authenticated" && (
            <h2 className="text-sm ml-4">Hi {session.data?.user.name}</h2>
          )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="outline-0 cursor-pointer">
              <UserIcon className="w-6 h-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              {session.status === "authenticated" ? (
                <>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer" >Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
                  </Link>
                  <Link href="/register">
                    <DropdownMenuItem className="cursor-pointer">Register</DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {session.status === "authenticated" && (
            <div className="relative ml-2">
              <Link href="/cart">
                <ShoppingCartIcon className="w-6 h-6 cursor-pointer" />
                <Badge className="size-5 rounded-full absolute -top-3 -end-2.5 ">
                  <span className="text-xs">
                    {isLoading ? <Loader className="animate-spin" /> : cartData?.numOfCartItems}
                  </span>
                </Badge>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 w-full shadow-md mt-2 absolute left-0 z-50">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            </li>
            <li>
              <Link href="/categories" onClick={() => setMenuOpen(false)}>Categories</Link>
            </li>
            <li>
              <Link href="/brands" onClick={() => setMenuOpen(false)}>Brands</Link>
            </li>
            {/* User + Cart in mobile*/}
            <li className="mt-2 flex items-center gap-3">
              {session.status === "authenticated" && (
                <span className="text-sm">Hi {session.data?.user.name}</span>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-0 cursor-pointer">
                  <UserIcon className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  {session.status === "authenticated" ? (
                    <>
                      <Link href="/profile">
                        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
                      </Link>
                      <Link href="/register">
                        <DropdownMenuItem className="cursor-pointer">Register</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {session.status === "authenticated" && (
                <Link href="/cart" className="relative">
                  <ShoppingCartIcon className="w-5 h-5 cursor-pointer" />
                  <Badge className="size-4 rounded-full absolute -top-1 -end-1">
                    <span className="text-[10px]">
                      {isLoading ? <Loader className="animate-spin" /> : cartData?.numOfCartItems}
                    </span>
                  </Badge>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
