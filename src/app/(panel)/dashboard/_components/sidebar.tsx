"use client";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../../../../../public/logo-odonto.png";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flax min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col border-r bg-background transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="mb-6 mt-4">
          {!isCollapsed ? (
            <Image
              src={logo}
              alt="OdontoPRO"
              priority
              quality={100}
              style={{ width: "auto", height: "auto" }}
            ></Image>
          ) : null}
        </div>

        <Button
          className="bg-gray-100 hover:bg-gray-50 text-zinc-900 self-end"
          variant="outline"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="w-12 h-12" />
          ) : (
            <ChevronLeft className="w-12 h-12" />
          )}
        </Button>

        {/* show only when sidebar is collapsed */}
        {isCollapsed && (
          <nav className="flex flex-col gap-1 overflow-hidden mt-2">
            <SidebarLink
              href="/dashboard"
              label="Agendamentos"
              icon={<CalendarCheck2 className="w-6 h-6" />}
              pathname={pathname}
              isColapsed={isCollapsed}
            />
            <SidebarLink
              href="/dashboard/services"
              label="Serviços"
              icon={<Folder className="w-6 h-6" />}
              pathname={pathname}
              isColapsed={isCollapsed}
            />
            <SidebarLink
                href="/dashboard/profile"
                label="Perfil"
                icon={<Settings className="w-6 h-6" />}
                pathname={pathname}
                isColapsed={isCollapsed}
              />
              <SidebarLink
                href="/dashboard/plans"
                label="Planos"
                icon={<Banknote className="w-6 h-6" />}
                pathname={pathname}
                isColapsed={isCollapsed}
              />
          </nav>
        )}

        <Collapsible open={!isCollapsed}>
          <CollapsibleContent>
            <nav className="flex flex-col gap-1 overflow-hidden">
              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                painel
              </span>

              <SidebarLink
                href="/dashboard"
                label="Agendamentos"
                icon={<CalendarCheck2 className="w-6 h-6" />}
                pathname={pathname}
                isColapsed={isCollapsed}
              />
              <SidebarLink
                href="/dashboard/services"
                label="Serviços"
                icon={<Folder className="w-6 h-6" />}
                pathname={pathname}
                isColapsed={isCollapsed}
              />

              <span className="text-sm text-gray-400 font-medium mt-1 uppercase">
                configuraçoes
              </span>
              <SidebarLink
                href="/dashboard/profile"
                label="Perfil"
                icon={<Settings className="w-6 h-6" />}
                pathname={pathname}
                isColapsed={isCollapsed}
              />
              <SidebarLink
                href="/dashboard/plans"
                label="Planos"
                icon={<Banknote className="w-6 h-6" />}
                pathname={pathname}
                isColapsed={isCollapsed}
              />
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
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
                  isColapsed={isCollapsed}
                />
                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  icon={<Folder className="w-6 h-6" />}
                  pathname={pathname}
                  isColapsed={isCollapsed}
                />
                <SidebarLink
                  href="/dashboard/profile"
                  label="Perfil"
                  icon={<Settings className="w-6 h-6" />}
                  pathname={pathname}
                  isColapsed={isCollapsed}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  icon={<Banknote className="w-6 h-6" />}
                  pathname={pathname}
                  isColapsed={isCollapsed}
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
  pathname,
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
