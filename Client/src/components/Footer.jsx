import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">HnilaBazar</h3>
            <p className="text-gray-400">
              Your trusted online shopping destination
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/mens" className="text-gray-400 hover:text-white">
                  Men's
                </Link>
              </li>
              <li>
                <Link to="/womens" className="text-gray-400 hover:text-white">
                  Women's
                </Link>
              </li>
              <li>
                <Link
                  to="/electronics"
                  className="text-gray-400 hover:text-white"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/baby" className="text-gray-400 hover:text-white">
                  Baby
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 HnilaBazar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
