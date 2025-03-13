import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    
      <footer className="w-full flex flex-col md:flex-row items-center justify-between text-center md:text-left bg-orange hover:bg-hoverOrange  text-white p-4 ">
        {/* Branding */}
        <div>
          <h2 className="text-lg font-semibold">TestingEats</h2>
          <p className="text-sm mt-1">
            &copy; 2025 TestingEats. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-wrap gap-4 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-4 md:mt-0 flex gap-4">
          <a href="#" className="hover:text-white">
            <Instagram />
          </a>
          <a href="#" className="hover:text-white">
            <Facebook />
          </a>
        </div>
      </footer>

  );
};

export default Footer;
