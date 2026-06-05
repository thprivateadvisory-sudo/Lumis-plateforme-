import type { Metadata } from 'next'
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'
import Link from 'next/link'

/* ─── FONTS ─────────────────────────────────────────────────────────────── */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--fh',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  style: 'italic',
  weight: '400',
  variable: '--fi',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--fm',
  display: 'swap',
})

/* ─── METADATA ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: 'Cohesif IA — Plateforme IA Souveraine Française | ISO 27001 · HDS · SOC 2',
    template: '%s | Cohesif IA',
  },
  description:
    "Cohesif est la plateforme d'intelligence artificielle souveraine française pour les grandes organisations. Agents IA autonomes, certifiée ISO 27001, HDS, SOC 2. Infrastructure 100% hébergée en France.",
  keywords: [
    'IA souveraine France',
    'intelligence artificielle française',
    'agents IA autonomes',
    'LLM souverain',
    'ISO 27001',
    'HDS',
    'SOC 2',
    'RGPD',
    'grands comptes',
    'CAC40',
    'Cohesif',
    'plateforme IA entreprise',
  ],
  authors: [{ name: 'Groupe Cohesif', url: 'https://cohesif-ia.fr' }],
  creator: 'Groupe Cohesif',
  publisher: 'Groupe Cohesif',
  openGraph: {
    title: 'Cohesif IA — Plateforme IA Souveraine Française',
    description:
      "Agents IA autonomes pour les grandes organisations. Certifiée ISO 27001, HDS, SOC 2. 100% hébergé en France. SLA 99.99%.",
    url: 'https://cohesif-ia.fr',
    siteName: 'Cohesif IA',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Cohesif IA — Plateforme IA Souveraine Française',
      },
    ],
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cohesif IA — L'IA Souveraine Française",
    description:
      "Agents IA autonomes · ISO 27001 · HDS · SOC 2 · 100% hébergé en France.",
    images: ['/og.png'],
    creator: '@CohesifIA',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  metadataBase: new URL('https://cohesif-ia.fr'),
  // Google Search Console verification: add NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION env var
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
}

/* ─── ROOT LAYOUT ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const fontStyle = {
    '--fh': bricolage.style.fontFamily,
    '--fi': instrumentSerif.style.fontFamily,
    '--fm': jetbrainsMono.style.fontFamily,
  } as React.CSSProperties

  return (
    <html
      lang="fr"
      className={`${bricolage.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      style={fontStyle}
    >
      <body style={{ overflowX: 'hidden', cursor: 'none' }}>
        {/* Custom cursor */}
        <div id="cur" aria-hidden="true" />
        <div id="curo" aria-hidden="true" />

        {/* Navigation */}
        <Nav />

        {/* Page content */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />

        {/* Sticky CTA bar */}
        <div id="scta" role="complementary" aria-label="Offre promotionnelle">
          <span>
            <strong>Cohesif Business</strong> — 14 jours gratuits, sans carte
            bancaire.
          </span>
          <Link href="/tarifs" className="btn by bsm">
            Essayer →
          </Link>
          <button id="scta-later" type="button" aria-label="Fermer la bannière">
            Plus tard
          </button>
        </div>

        {/* Floating chat widget */}
        <ChatWidget />

        {/* Client-side scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  'use strict';

  /* ── Cursor ─────────────────────────────────────────────────── */
  var cur  = document.getElementById('cur');
  var curo = document.getElementById('curo');
  var mx = 0, my = 0, ox = 0, oy = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (cur) {
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    }
  });

  function animateCuro() {
    ox += (mx - ox) * 0.14;
    oy += (my - oy) * 0.14;
    if (curo) {
      curo.style.left = ox + 'px';
      curo.style.top  = oy + 'px';
    }
    requestAnimationFrame(animateCuro);
  }
  requestAnimationFrame(animateCuro);

  document.addEventListener('mousedown', function () {
    if (cur)  { cur.style.transform  = 'translate(-50%,-50%) scale(1.8)'; }
    if (curo) { curo.style.transform = 'translate(-50%,-50%) scale(0.7)'; }
  });
  document.addEventListener('mouseup', function () {
    if (cur)  { cur.style.transform  = 'translate(-50%,-50%) scale(1)'; }
    if (curo) { curo.style.transform = 'translate(-50%,-50%) scale(1)'; }
  });

  document.querySelectorAll('a, button, [role="button"], label, select').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      if (cur)  { cur.style.width  = '12px'; cur.style.height  = '12px'; }
      if (curo) { curo.style.width = '48px'; curo.style.height = '48px'; curo.style.borderColor = 'rgba(11, 200, 240, 0.7)'; }
    });
    el.addEventListener('mouseleave', function () {
      if (cur)  { cur.style.width  = '8px';  cur.style.height  = '8px'; }
      if (curo) { curo.style.width = '32px'; curo.style.height = '32px'; curo.style.borderColor = 'rgba(11, 200, 240, 0.45)'; }
    });
  });

  /* ── Nav scroll class ────────────────────────────────────────── */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('sc');
    } else {
      nav.classList.remove('sc');
    }

    /* sticky CTA after 700px */
    var scta = document.getElementById('scta');
    if (scta && !scta.dataset.dismissed) {
      if (window.scrollY > 700) {
        scta.classList.add('visible');
      } else {
        scta.classList.remove('visible');
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Sticky CTA dismiss ──────────────────────────────────────── */
  var sctaLater = document.getElementById('scta-later');
  if (sctaLater) {
    sctaLater.addEventListener('click', function () {
      var scta = document.getElementById('scta');
      if (scta) {
        scta.classList.remove('visible');
        scta.dataset.dismissed = '1';
      }
    });
  }

  /* ── Scroll reveal ───────────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sh');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.rv').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) {
      el.classList.add('sh');
    });
  }
})();
`,
          }}
        />
      </body>
    </html>
  )
}
