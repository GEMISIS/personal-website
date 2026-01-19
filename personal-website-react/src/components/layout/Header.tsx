'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useConfig } from '@/context/ConfigContext';

export default function Header() {
  const { config } = useConfig();
  const pathname = usePathname();

  const navLinks = [
    { text: 'Home', path: '/' },
    { text: 'Projects', path: '/projects' },
    { text: 'Experience', path: '/experience' },
    { text: 'Contact', path: '/contact' },
  ];

  if (!config) return null;

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
        <Link id="navbar_brand" className="navbar-brand" href="/">
          {config.user}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul id="navbar_links" className="navbar-nav mr-auto">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link
                  href={link.path}
                  className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
