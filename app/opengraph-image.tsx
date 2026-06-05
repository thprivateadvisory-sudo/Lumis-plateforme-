import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Cohesif IA — Plateforme IA Souveraine Française'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(11,200,240,0.15), transparent 70%)',
          display: 'flex',
        }} />

        {/* Accent line */}
        <div style={{ width: 80, height: 4, background: '#0BC8F0', borderRadius: 2, marginBottom: 40, display: 'flex' }} />

        {/* Title */}
        <div style={{
          fontSize: 88,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-4px',
          lineHeight: 1,
          marginBottom: 24,
          display: 'flex',
        }}>
          Cohesif IA
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 32,
          color: '#888888',
          marginBottom: 48,
          display: 'flex',
        }}>
          La plateforme IA souveraine française
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['ISO 27001', 'HDS', 'RGPD', 'SOC 2', 'Hébergé en France'].map(b => (
            <div key={b} style={{
              background: 'rgba(11,200,240,0.1)',
              border: '1px solid rgba(11,200,240,0.3)',
              borderRadius: 50,
              padding: '8px 20px',
              fontSize: 18,
              fontWeight: 700,
              color: '#0BC8F0',
              display: 'flex',
            }}>{b}</div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          position: 'absolute',
          bottom: 60,
          right: 96,
          fontSize: 24,
          color: '#333333',
          display: 'flex',
        }}>
          cohesif-ia.fr
        </div>
      </div>
    ),
    { ...size }
  )
}
