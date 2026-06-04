import Link from 'next/link'

/* ─── LOGO ───────────────────────────────────────────────────────────────── */
function LumisLogo() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-label="LUMIS logo">
      <rect width="34" height="34" rx="9" fill="#d4ff00" />
      <path d="M9 25V9h4v13h8v3H9z" fill="#000" />
      <circle cx="25" cy="11" r="3" fill="#000" />
    </svg>
  )
}

/* ─── SOCIAL ICONS (inline SVG, no external dependency) ─────────────────── */
function IconX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function IconLinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
function IconGitHub() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}
function IconYouTube() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

/* ─── COLUMN DATA ────────────────────────────────────────────────────────── */
const COLUMNS = [
  {
    title: 'Produits',
    links: [
      { label: 'LUMIS Ultra',  href: '/produits' },
      { label: 'Agents IA',   href: '/agents' },
      { label: 'Marketplace', href: '/produits' },
      { label: 'API LUMIS',   href: '/docs' },
      { label: 'LUMIS ONE',   href: '/produits' },
      { label: 'Enterprise',  href: '/entreprises' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'PME & Scale-ups',   href: '/entreprises' },
      { label: 'Grands comptes',    href: '/entreprises' },
      { label: 'Secteur Santé',     href: '/entreprises' },
      { label: 'Finance & Banque',  href: '/entreprises' },
      { label: 'Industrie',         href: '/entreprises' },
      { label: 'Secteur Public',    href: '/entreprises' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Académie',      href: '/academie' },
      { label: 'Blog',          href: '/blog' },
      { label: 'Status',        href: '/status' },
      { label: 'Changelog',     href: '/changelog' },
      { label: 'Communauté',    href: '/blog' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos',                  href: '/presse' },
      { label: 'Investisseurs',             href: '/investir' },
      { label: 'Carrières — 31 postes',     href: '/carrieres', yellow: true },
      { label: 'Presse',                    href: '/presse' },
      { label: 'Partenaires',              href: '/entreprises' },
      { label: 'Contact',                  href: '/contact' },
    ],
  },
] as const

const LEGAL_LINKS = [
  { label: 'Confidentialité',  href: '/legal/confidentialite' },
  { label: 'CGU',              href: '/legal/cgu' },
  { label: 'Mentions légales', href: '/legal/mentions' },
  { label: 'RGPD',             href: '/legal/confidentialite' },
  { label: 'Prospectus AMF',   href: '/investir' },
] as const

const SOCIAL_LINKS = [
  { label: 'X (Twitter)',  href: '#', icon: <IconX /> },
  { label: 'LinkedIn',     href: '#', icon: <IconLinkedIn /> },
  { label: 'GitHub',       href: '#', icon: <IconGitHub /> },
  { label: 'YouTube',      href: '#', icon: <IconYouTube /> },
] as const

/* ─── FOOTER COMPONENT ───────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer id="footer" aria-label="Pied de page LUMIS">
      <div className="w">
        {/* Main grid */}
        <div className="fgrid">
          {/* Brand column */}
          <div className="fbrand">
            <Link href="/" aria-label="LUMIS — Accueil" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <LumisLogo />
              <span
                style={{
                  fontFamily: 'var(--fh)',
                  fontSize: '1.0625rem',
                  fontWeight: 800,
                  color: 'var(--snow)',
                  letterSpacing: '-0.02em',
                }}
              >
                LUMIS<span style={{ color: 'var(--y)' }}>.AI</span>
              </span>
            </Link>

            <p className="fbrand-desc">
              La plateforme d&apos;intelligence artificielle souveraine française.
              Agents autonomes, LLM propriétaires, infrastructure 100&nbsp;% hébergée en France.
              RGPD natif, sécurité militaire.
            </p>

            <div className="fbrand-badges">
              <span className="fbrand-badge">Souverain FR</span>
              <span className="fbrand-badge">RGPD</span>
              <span className="fbrand-badge">ISO 27001</span>
              <span className="fbrand-badge">SOC 2</span>
              <span className="fbrand-badge">HDS</span>
            </div>

            <nav className="fsoc" aria-label="Réseaux sociaux LUMIS">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="fsoc-a"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </nav>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} className="fcol" aria-label={col.title}>
              <p className="fcol-title">{col.title}</p>
              {col.links.map((link) => (
                <Link
                  key={`${col.title}-${link.label}`}
                  href={link.href}
                  className={'yellow' in link && link.yellow ? 'fy' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="fbot">
          <p className="fcopy">
            © 2025 LUMIS SAS — SIRET 123&nbsp;456&nbsp;789&nbsp;00012 · 42 av.
            des Champs-Élysées, 75008 Paris
          </p>

          <nav className="flegal" aria-label="Liens légaux">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href + l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
