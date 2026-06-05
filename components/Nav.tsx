'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ─── LOGO ───────────────────────────────────────────────────────────────── */
function CohesifLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-label="Cohesif IA logo">
      <g stroke="#5bbcd4" strokeWidth="1.3" strokeLinecap="round" opacity="0.75">
        <line x1="17" y1="5" x2="29" y2="13"/>
        <line x1="29" y1="13" x2="25" y2="27"/>
        <line x1="25" y1="27" x2="9" y2="27"/>
        <line x1="9" y1="27" x2="5" y2="13"/>
        <line x1="5" y1="13" x2="17" y2="5"/>
        <line x1="17" y1="5" x2="25" y2="27" opacity="0.5"/>
        <line x1="5" y1="13" x2="29" y2="13" opacity="0.5"/>
        <line x1="9" y1="27" x2="29" y2="13" opacity="0.5"/>
      </g>
      <circle cx="17" cy="5" r="2.3" fill="#7ec8da"/>
      <circle cx="5" cy="13" r="2.3" fill="#7ec8da"/>
      <circle cx="9" cy="27" r="2.3" fill="#7ec8da"/>
      <circle cx="25" cy="27" r="2.3" fill="#7ec8da"/>
      <circle cx="29" cy="13" r="3.2" fill="#0BC8F0"/>
    </svg>
  )
}

/* ─── NAV LINK DATA ──────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Accueil',     href: '/' },
  { label: 'Produits',    href: '/produits' },
  { label: 'Agents IA',  href: '/agents' },
  { label: 'Tarifs',     href: '/tarifs' },
  { label: 'Investir',   href: '/investir' },
  { label: 'Académie',   href: '/academie' },
  { label: 'Entreprises', href: '/entreprises' },
] as const

/* ─── COMPONENT ──────────────────────────────────────────────────────────── */
export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)

  /* nav scroll class */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /* close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* helper: is this link active? */
  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav
        id="nav"
        className={scrolled ? 'sc' : ''}
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <Link href="/" className="logo" aria-label="Cohesif IA — Accueil">
          <CohesifLogo />
          <span className="logo-name">
            Cohesif<span> IA</span>
          </span>
        </Link>

        {/* Centre — desktop links */}
        <div className="nav-c" role="menubar" aria-label="Liens de navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className={`nl${isActive(link.href) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/demo"
            role="menuitem"
            className={`nl demo${isActive('/demo') ? ' active' : ''}`}
          >
            Démo Live
          </Link>
        </div>

        {/* Right — CTA buttons */}
        <div className="nav-r">
          <Link
            href="/contact"
            className="btn bg bsm"
            style={{ display: 'inline-flex' }}
          >
            Contact
          </Link>
          <Link href="/contact" className="btn by bsm">
            Demander une démo
          </Link>

          {/* Hamburger — visible below 900px via CSS */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nl${isActive(link.href) ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/demo"
          className={`nl demo${isActive('/demo') ? ' active' : ''}`}
          onClick={() => setMenuOpen(false)}
        >
          Démo Live
        </Link>

        <div className="nav-r" style={{ marginTop: '16px' }}>
          <Link
            href="/contact"
            className="btn bg"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="btn by"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </>
  )
}
