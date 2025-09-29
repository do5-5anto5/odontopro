import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-zinc-900">
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav className="hidden md:flex items-center">
          <a href="#">Profissionais</a>
        </nav>
        <Sheet>
          <SheetTrigger className="md:hidden text-black hover:bg-gray-100">
            <Menu className="w-4 h-4 m-2" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300] z-[9999]">
            <div className="p-4">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Veja nossos links</SheetDescription>
              <nav>
                <a href="#">Profissionais</a>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
