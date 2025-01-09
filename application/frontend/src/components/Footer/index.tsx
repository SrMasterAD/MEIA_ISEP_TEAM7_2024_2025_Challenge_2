import {
  FaWineBottle,
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaWineBottle className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold text-white">
                Vineyard Select
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Elevating restaurant wine selections with premium curated
              collections from the world's finest vineyards.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+1234567890"
                className="text-gray-400 hover:text-rose-400 transition-colors duration-200 flex items-center gap-2"
              >
                <FaPhone className="h-4 w-4" />
                +1 (234) 567-890
              </a>
              <a
                href="mailto:contact@vineyardselect.com"
                className="text-gray-400 hover:text-rose-400 transition-colors duration-200 flex items-center gap-2"
              >
                <FaEnvelope className="h-4 w-4" />
                contact@vineyardselect.com
              </a>
              <div className="text-gray-400 flex items-center gap-2">
                <FaMapMarkerAlt className="h-4 w-4" />
                123 Wine Valley, CA 94000
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Vineyard Select. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-rose-400 transition-colors duration-200"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-rose-400 transition-colors duration-200"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
