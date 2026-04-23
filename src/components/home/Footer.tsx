import { Mail, MapPin, Phone } from 'lucide-react';
import logo from "../../../assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="KKC Talent Show"
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-amber-500">KKC Talent Show</h3>
                <p className="text-xs text-gray-400">Season 1 - 2026</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              India's premier musical talent discovery platform with a legacy of excellence and world records.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="text-gray-400">+91 99265 61316</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="text-gray-400">sangeetsevasahara@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-amber-500 flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="text-gray-400">, Indore, Madhya Pradesh</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Competition Rules
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 KKC Talent Show. All rights reserved. | 12 World Records Holder | London Book Record
          </p>
        </div>
      </div>
    </footer>
  );
}
