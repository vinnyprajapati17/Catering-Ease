import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  ShoppingCart,
  ClipboardList,
  User,
  LogIn,
  UserPlus,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import Logo from "./logo";

const navLinks = [
  { href: "/#menu", label: "Menu" },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/orders", label: "My Orders", icon: ClipboardList },
];

// Mock user state
const isLoggedIn = true;
const isAdmin = false;

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 ml-10 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && isAdmin && (
            <Link
              href="/admin/orders"
              className="flex items-center transition-colors hover:text-primary"
            >
              <ShieldCheck className="mr-2 h-5 w-5" /> Admin
            </Link>
          )}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/orders">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register">
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Link>
              </Button>
            </div>
          )}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <Logo className="mb-8" />
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                   {isLoggedIn && isAdmin && (
                    <Link
                      href="/admin/orders"
                      className="text-lg flex items-center transition-colors hover:text-primary"
                    >
                      <ShieldCheck className="mr-2 h-5 w-5" /> Admin
                    </Link>
                  )}
                  <div className="border-t pt-4">
                     {!isLoggedIn && <>
                       <Button asChild variant="ghost" className="w-full justify-start text-lg mb-2">
                          <Link href="/login"><LogIn className="mr-2 h-5 w-5" /> Login</Link>
                       </Button>
                        <Button asChild className="w-full justify-start text-lg">
                          <Link href="/register"><UserPlus className="mr-2 h-5 w-5" /> Register</Link>
                        </Button>
                     </>}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
