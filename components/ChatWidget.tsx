'use client'

import Link from 'next/link'

export default function ChatWidget() {
  return (
    <Link
      href="/demo"
      aria-label="Essayer la démo IA"
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 900,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#0BC8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 24px rgba(11,200,240,.35)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'scale(1.1)'
        el.style.boxShadow = '0 8px 32px rgba(11, 200, 240, .5)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.transform = 'scale(1)'
        el.style.boxShadow = '0 4px 24px rgba(11,200,240,.35)'
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="#000"/>
      </svg>
    </Link>
  )
}
