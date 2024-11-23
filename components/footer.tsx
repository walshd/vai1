import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-gray-900">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">About VAi</h3>
            <p className="text-sm text-gray-300">
              Explore museum collections through AI-powered conversations.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <address className="not-italic">
              <p className="text-sm text-gray-300">Victoria and Albert Museum</p>
              <p className="text-sm text-gray-300">London, UK</p>
              <p className="text-sm text-gray-300">info@vai.museum</p>
              <p className="text-sm text-gray-300">+44 20 1234 5678</p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-300">© 2024 VAi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

