"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MenuIcon, DoorIcon } from "@/components/icons";
import { getAllCities } from "@/lib/services/cities";
import { CitiesMegaMenu } from "@/components/navigation/CitiesMegaMenu";
import type { MenuCity } from "@/lib/types/navigation";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuCities, setMenuCities] = useState<MenuCity[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getAllCities();
        setMenuCities(
          citiesData
            .filter(city => city.data.showInMenu)
            .map(city => ({
              id: city.id,
              name: city.data.name,
              imageUrl: city.data.imageUrl,
            }))
        );
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <DoorIcon className="h-6 w-6" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Openity
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="hover:text-primary">
              Accueil
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Villes</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <CitiesMegaMenu cities={menuCities} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={() => signOut()}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Connexion</Button>
                </Link>
                <Link href="/signup">
                  <Button>
                    Je suis serrurier
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/signup">
              <Button size="sm">
                Je suis serrurier
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-accent"
            >
              Accueil
            </Link>
            <div className="px-3 py-2">
              <div className="font-medium mb-1">Villes</div>
              <div className="grid grid-cols-2 gap-2">
                {menuCities.map((city) => (
                  <Link
                    key={city.id}
                    href={`/ville/${city.id}`}
                    className="relative overflow-hidden rounded-lg aspect-video"
                  >
                    <img
                      src={city.imageUrl}
                      alt={city.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {city.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md hover:bg-accent"
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  className="w-full text-left"
                  onClick={() => signOut()}
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md hover:bg-accent"
                >
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 rounded-md hover:bg-accent"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}