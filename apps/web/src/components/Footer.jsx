
import React from 'react';
import { Heart, Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="text-2xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
              Birthday Bash
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Celebrating life's special moments with joy, laughter, and unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold mb-3">Quick Links</p>
            <div className="space-y-2">
              <a href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Home
              </a>
              <a href="/gallery" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Gallery
              </a>
              <a href="/wishes" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                Wishes
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-semibold mb-3">Connect with us</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-white rounded-lg hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:text-white transition-all duration-200 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Birthday Bash. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Made with Love */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for celebrating you
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
