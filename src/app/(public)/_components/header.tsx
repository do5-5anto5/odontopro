"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LogIn, Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [{ href: "#profissionais", label: "Profissionais" }];

  const session = null;

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          className="bg-transparent hover:bg-transparent text-black shadow-none text-base"
          onClick={() => setIsOpen(false)}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
      {session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2"
        >
          Acessar clínica
        </Link>
      ) : (
        <Button>
          <LogIn />
          Portal da clínica
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-zinc-900">
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden text-black hover:bg-gray-100">
            <Menu className="w-4 h-4 m-2" />
          </SheetTrigger>

          <SheetContent side="right" className="w-[240px] sm:w-[300] z-[9999]">
            <div className="p-4">
              <SheetTitle>Menu</SheetTitle>

              <SheetDescription>Veja nossos links</SheetDescription>

              <nav className="flex flex-col space-y-4 mt-6">
                <NavLinks />
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
