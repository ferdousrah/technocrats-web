"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">Technocrats</h1>
          </div>
          
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#services" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Services
              </a>
              <a href="#solutions" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Solutions
              </a>
              <a href="#work" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Our Work
              </a>
              <a href="#about" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                About
              </a>
              <a href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Contact
              </a>
            </div>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">
                Services
              </a>
              <a href="#solutions" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">
                Solutions
              </a>
              <a href="#work" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">
                Our Work
              </a>
              <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">
                About
              </a>
              <a href="#contact" className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}