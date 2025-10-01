import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.reddit.com/r/congreat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-smooth p-2 hover:bg-slate-800 rounded-full"
              aria-label="Visit our Reddit"
            >
              <MessageCircle size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/company/congreat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-smooth p-2 hover:bg-slate-800 rounded-full"
              aria-label="Visit our LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://wa.me/message/XXXXXXXXX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-smooth p-2 hover:bg-slate-800 rounded-full"
              aria-label="Contact us on WhatsApp"
            >
              <Phone size={20} />
            </a>
            <a 
              href="https://www.facebook.com/congreat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-smooth p-2 hover:bg-slate-800 rounded-full"
              aria-label="Visit our Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/congreat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-smooth p-2 hover:bg-slate-800 rounded-full"
              aria-label="Visit our Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="mailto:yoel@congreat.co" 
              className="text-slate-400 hover:text-white transition-smooth p-2 hover:bg-slate-800 rounded-full"
              aria-label="Send us an email"
            >
              <Mail size={20} />
            </a>
          </div>
          
          {/* Footer Links and Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-300">
                © 2024 Congreat. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6">
              <Link 
                to="/privacy" 
                className="text-sm text-slate-300 hover:text-white transition-smooth"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-slate-300 hover:text-white transition-smooth"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};