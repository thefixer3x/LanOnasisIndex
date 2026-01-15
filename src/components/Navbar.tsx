import { useTranslation } from 'react-i18next';
import { useSSO } from '../lib/sso';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useState } from 'react';

/**
 * SSO-aware navigation bar component
 * Shows user info when logged in, sign in link when logged out
 */
export function Navbar() {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading, user, getLoginUrl } = useSSO();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const navLinks = [
    { href: '#features', label: t('navigation.features') },
    { href: '#industries', label: t('navigation.industries') },
    { href: '#platform-services', label: t('navigation.services') },
    { href: '#ecosystem', label: t('navigation.ecosystem') },
    { href: '#story', label: t('navigation.story') },
    { href: '#pricing', label: t('navigation.pricing') },
    { href: '#testimonials', label: t('navigation.testimonials') },
  ];

  return (
    <nav className="nav-fixed">
      <div className="container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-secondary">
              Lan Onasis
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-secondary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}

            {/* Auth Section */}
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-medium">
                    {getInitials(user.email)}
                  </div>
                  <span className="text-sm text-gray-300 hidden lg:block max-w-[150px] truncate">
                    {user.email}
                  </span>
                </div>

                {/* Dashboard Link */}
                <a
                  href="https://dashboard.lanonasis.com/dashboard"
                  className="btn-primary text-sm"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <a
                  href={getLoginUrl(window.location.href)}
                  className="text-gray-300 hover:text-secondary transition-colors duration-300"
                >
                  Sign In
                </a>
                <a
                  href="https://dashboard.lanonasis.com/"
                  className="btn-primary text-sm"
                >
                  {t('navigation.get_started')}
                </a>
              </>
            )}
          </div>

          {/* Right Side: Language + Mobile Menu */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open mobile menu"
              title="Open mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-secondary transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-white/10">
                {isAuthenticated && user ? (
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-medium">
                        {getInitials(user.email)}
                      </div>
                      <span className="text-sm text-gray-300">{user.email}</span>
                    </div>
                    <a
                      href="https://dashboard.lanonasis.com/dashboard"
                      className="btn-primary text-sm text-center"
                    >
                      Dashboard
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <a
                      href={getLoginUrl(window.location.href)}
                      className="text-gray-300 hover:text-secondary transition-colors duration-300"
                    >
                      Sign In
                    </a>
                    <a
                      href="https://dashboard.lanonasis.com/"
                      className="btn-primary text-sm text-center"
                    >
                      {t('navigation.get_started')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
