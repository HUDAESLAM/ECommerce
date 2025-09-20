import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white shadow text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-1">
          <h1 className=" text-2xl font-bold mb-4 text-gray-800"><span className="border text-white font-bold bg-black py-2 px-4 text-xl">S</span> ShopMart</h1>
          <p className="text-gray-500 text-sm">
            Your one-stop destination for the latest technology, fashion, and
            lifestyle products. Quality guaranteed with fast shipping and
            excellent customer service.
          </p>
          <ul className="pt-5 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">123 Shop Street, Octoper City, DC 12345</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">(+20) 01093333333</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">support@shopmart.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-gray-800 font-semibold mb-4">SHOP</h2>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Garden</li>
            <li>Sports</li>
            <li>Deals</li>
          </ul>
        </div>

        <div>
          <h2 className="text-gray-800 font-semibold mb-4">CUSTOMER SERVICE</h2>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Track Your Order</li>
            <li>Returns & Exchanges</li>
            <li>Size Guide</li>
          </ul>
        </div>

        <div>
          <h2 className="text-gray-800 font-semibold mb-4">ABOUT</h2>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>About Shopmart</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Investor Relations</li>
            <li>Sustainability</li>
          </ul>
        </div>

        <div>
          <h2 className="text-gray-800 font-semibold mb-4">POLICIES</h2>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
            <li>Shipping Policy</li>
            <li>Refund Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
