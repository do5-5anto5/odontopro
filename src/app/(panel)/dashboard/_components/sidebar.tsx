"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Banknote, CalendarCheck2, Folder, List, Settings } from "lucide-react";
import Link from "next/link";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isColapsed, setIsColapsed] = useState(false);

  return (
    <div className="flax min-h-screen w-full">
      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isColapsed,
          "md:ml-64": !isColapsed,
        })}
      >
        <header
          className="md:hidden flex items-center justify-between
         border-b px-4 md:px-6 h-14 z-10 sticky top-0 bg-white"
        >
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger
                asChild
                className="md:hidden rounded shadow drop-shadow-sidebar-foreground"
              >
                <Button variant="outline" size="icon" className="md:hidden">
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <h1 className="text-base md:text-lg font-semibold">
                Menu OdontoPro
              </h1>
            </div>

            <SheetContent className="p-4 sm:max-w-xs text-black">
              <SheetTitle>OdontoPRO</SheetTitle>
              <SheetDescription>Menu administrativo</SheetDescription>

              <nav className="grid gap-2 pt-5">
                <SidebarLink
                  href="/dashboard"
                  label="Agendamentos"
                  icon={<CalendarCheck2 className="w-6 h-6" />}
                  pathname={pathname}
                  isColapsed={isColapsed}
                />
                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  icon={<Folder className="w-6 h-6" />}
                  pathname={pathname}
                  isColapsed={isColapsed}
                />
                <SidebarLink
                  href="/dashboard/profile"
                  label="Perfil"
                  icon={<Settings className="w-6 h-6" />}
                  pathname={pathname}
                  isColapsed={isColapsed}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  icon={<Banknote className="w-6 h-6" />}
                  pathname={pathname}
                  isColapsed={isColapsed}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  pathname: string;
  isColapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname: pathname,
  isColapsed,
}: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          {
            "bg-blue-500 text-white": pathname === href,
            "text-gray-600 hover:bg-gray-100": pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6">{icon}</span>
        {!isColapsed && <span>{label}</span>}
      </div>
    </Link>
  );
}
