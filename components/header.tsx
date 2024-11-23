import Link from "next/link"
import { Building2, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="border-b border-gray-700 bg-gray-900">
      <div className="container flex h-14 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-white" />
          <span className="text-lg font-bold text-white">VAi</span>
        </Link>
        <nav className="ml-auto hidden md:flex md:gap-6">
          <Link href="/" className="text-sm text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/collections" className="text-sm text-gray-300 hover:text-white">
            Collections
          </Link>
          <Link href="/about" className="text-sm text-gray-300 hover:text-white">
            About
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="ml-auto md:hidden">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-800 text-white">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm hover:text-gray-300">
                Home
              </Link>
              <Link href="/collections" className="text-sm hover:text-gray-300">
                Collections
              </Link>
              <Link href="/about" className="text-sm hover:text-gray-300">
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

