"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/useAuth";
import { 
  CampaignIcon, 
  PriceTagIcon, 
  HelpCircleIcon, 
  MapPinIcon, 
  KeyIcon,
  FileTextIcon 
} from "@/components/icons";

const getNavigation = (role?: string) => {
  const baseNavigation = [
    { name: "Campagne Publicitaire", href: "/dashboard/campaign", icon: CampaignIcon },
    { name: "Tarifs", href: "/dashboard/pricing", icon: PriceTagIcon },
    { name: "Comment ça marche ?", href: "/dashboard/help", icon: HelpCircleIcon },
  ];

  if (role === "serrurier") {
    return [
      {
        name: "Ma fiche serrurier",
        href: "/dashboard/my-profile",
        icon: FileTextIcon,
      },
      ...baseNavigation,
    ];
  }

  if (role === "admin") {
    return [
      {
        name: "Gestion villes",
        href: "/dashboard/cities",
        icon: MapPinIcon,
      },
      {
        name: "Gestion serruriers",
        href: "/dashboard/locksmiths",
        icon: KeyIcon,
      },
      ...baseNavigation,
    ];
  }

  return baseNavigation;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const navigation = getNavigation(user?.role);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow border-r bg-card pt-5">
              <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex overflow-x-auto border-b">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                    "flex flex-col items-center justify-center min-w-[5rem] py-2 px-1 text-xs font-medium border-b-2"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="mt-1 text-center">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Main content */}
          <div className="flex-1">
            <main className="py-6">
              <div className="mx-auto px-4 sm:px-6 md:px-8">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}