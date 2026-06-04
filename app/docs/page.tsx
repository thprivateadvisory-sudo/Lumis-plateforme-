import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation — LUMIS.AI',
  description:
    "Documentation complète de l'API LUMIS.AI : démarrage rapide, référence API, agents autonomes, webhooks et SDKs. Commencez en 5 minutes.",
  openGraph: {
    title: 'Documentation LUMIS.AI',
    description: 'Intégrez LUMIS Ultra en 5 minutes. Guides, référence API, SDKs.',
    url: 'https://lumis.ai/docs',
  },
}

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 34 34" fill="none">
    <rect width="34" height="34" rx="9" fill="#d4ff00" />
    <path d="M9 25V9h4v13h8v3H9z" fill="#000" />
    <circle cx="25" cy="11" r="3" fill="#000" />
  </svg>
)

const NAV_SECTIONS = [
  {
    label: 'Démarrage rapide',
    id: 'quickstart',
    items: [
      { label: 'Installation', id: 'installation' },
      { label: 'Authentification', id: 'auth' },
      { label: 'Première requête', id: 'first-request' },
      { label: 'Streaming', id: 'streaming' },
    ],
  },
  {
    label: 'API Reference',
    id: 'api-reference',
    items: [
      { label: 'Chat Completions', id: 'chat-completions' },
      { label: 'Embeddings', id: 'embeddings' },
      { label: 'Modèles', id: 'models' },
      { label: 'Tokens & Limites', id: 'tokens' },
    ],
  },
  {
    label: 'Agents',
    id: 'agents',
    items: [
      { label: "Vue d'ensemble", id: 'agents-overview' },
      { label: 'Créer un agent', id: 'create-agent' },
      { label: 'Mémoire & Contexte', id: 'memory' },
      { label: 'Outils (Tools)', id: 'tools' },
    ],
  },
  {
    label: 'Webhooks',
    id: 'webhooks',
    items: [
      { label: 'Configuration', id: 'webhook-config' },
      { label: 'Événements', id: 'events' },
      { label: 'Sécurité', id: 'webhook-security' },
    ],
  },
  {
    label: 'SDKs',
    id: 'sdks',
    items: [
      { label: 'Python', id: 'sdk-python' },
      { label: 'JavaScript / TS', id: 'sdk-js' },
      { label: 'Go', id: 'sdk-go' },
      { label: 'Java', id: 'sdk-java' },
    ],
  },
  {
    label: 'Changelog',
    id: 'changelog-section',
    items: [
      { label: 'v3.2.0 — Jan 2025', id: 'v320' },
      { label: 'v3.1.0 — Déc 2024', id: 'v310' },
      { label: 'v3.0.0 — Nov 2024', id: 'v300' },
    ],
  },
]

const CB = ({ lang, code }: { lang: string; code: string }) => (
  <div style={{
    background: '#0a0c12',
    border: '1px solid rgba(255,255,255,.08)',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '24px',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 16px',
      borderBottom: '1px solid rgba(255,255,255,.06)',
      background: 'rgba(255,255,255,.03)',
    }}>
      <span style={{
        fontFamily: 'var(--fm)',
        fontSize: '11px',
        color: 'var(--fog)',
        textTransform: 'uppercase',
        letterSpacing: '.1em',
      }}>{lang}</span>
      <span style={{
        display: 'flex',
        gap: '6px',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
      </span>
    </div>
    <pre style={{
      margin: 0,
      padding: '20px',
      fontFamily: 'var(--fm)',
      fontSize: '13px',
      lineHeight: '1.7',
      color: '#c9d1d9',
      overflowX: 'auto',
      whiteSpace: 'pre',
    }}><code>{code}</code></pre>
  </div>
)

const SectionTitle = ({ tag, title, id }: { tag: string; title: string; id: string }) => (
  <div style={{ marginBottom: '32px' }}>
    <div className="tag">{tag}</div>
    <h2 id={id} className="h2" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '8px' }}>
      {title}
    </h2>
  </div>
)

export default function DocsPage() {
  return (
    <div style={{ background: 'var(--void)', minHeight: '100vh', color: 'var(--snow)' }}>

      {/* Top bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(5,6,10,.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Logo />
            <span style={{ fontFamily: 'var(--fh)', fontWeight: 800, fontSize: '16px', color: 'var(--snow)' }}>
              LUMIS<span style={{ color: 'var(--y)' }}>.</span>AI
            </span>
          </Link>
          <span style={{ color: 'rgba(255,255,255,.15)', fontSize: '20px' }}>/</span>
          <span style={{ fontFamily: 'var(--fm)', fontSize: '14px', color: 'var(--fog)' }}>docs</span>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Search */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--panel)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: '8px',
              padding: '8px 14px',
              width: '220px',
            }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="9" cy="9" r="7" stroke="#8892aa" strokeWidth="2" />
                <path d="m14 14 4 4" stroke="#8892aa" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '12px', color: 'var(--fog)' }}>Rechercher...</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--mist)', background: 'rgba(255,255,255,.05)', padding: '2px 6px', borderRadius: '4px' }}>⌘K</span>
            </div>
            <Link href="/demo" className="btn by" style={{ fontSize: '13px', padding: '8px 18px' }}>
              Essayer l'API
            </Link>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        gap: '0',
        minHeight: 'calc(100vh - 60px)',
      }}>

        {/* Sidebar */}
        <aside style={{
          width: '250px',
          flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,.06)',
          paddingTop: '32px',
          paddingRight: '24px',
          position: 'sticky',
          top: '60px',
          maxHeight: 'calc(100vh - 60px)',
          overflowY: 'auto',
        }}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.id} style={{ marginBottom: '28px' }}>
              <div style={{
                fontFamily: 'var(--fm)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                color: 'var(--fog)',
                marginBottom: '8px',
                paddingBottom: '6px',
                borderBottom: '1px solid rgba(255,255,255,.04)',
              }}>
                {section.label}
              </div>
              {section.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    display: 'block',
                    padding: '6px 10px',
                    fontSize: '13px',
                    color: 'var(--fog)',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    transition: 'all .15s',
                    marginBottom: '2px',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}

          <div style={{
            background: 'rgba(212,255,0,.06)',
            border: '1px solid rgba(212,255,0,.15)',
            borderRadius: '10px',
            padding: '14px',
            marginTop: '8px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--y)', marginBottom: '6px' }}>
              Support technique
            </div>
            <div style={{ fontSize: '12px', color: 'var(--fog)', lineHeight: 1.6 }}>
              Besoin d'aide ?
              <br />
              <a href="mailto:api@lumis.ai" style={{ color: 'var(--y)', textDecoration: 'none' }}>api@lumis.ai</a>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={{
          flex: 1,
          paddingLeft: '48px',
          paddingTop: '48px',
          paddingBottom: '96px',
          maxWidth: '860px',
        }}>

          {/* ── DÉMARRAGE RAPIDE ── */}
          <section id="quickstart" style={{ marginBottom: '72px' }}>
            <SectionTitle tag="01 — Démarrage" title="Démarrage rapide" id="quickstart-title" />
            <p className="lead" style={{ marginBottom: '32px' }}>
              Intégrez LUMIS Ultra dans votre application en moins de 5 minutes. Notre API REST est compatible avec le standard OpenAI — migration depuis GPT-4 possible en 10 minutes.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '40px',
            }}>
              {[
                { n: '1', t: 'Installez le SDK', d: 'pip ou npm en une ligne' },
                { n: '2', t: 'Ajoutez votre clé API', d: "Variable d'environnement" },
                { n: '3', t: 'Première requête', d: 'Réponse en < 500ms' },
              ].map((s) => (
                <div key={s.n} style={{
                  background: 'var(--card)',
                  border: '1px solid rgba(255,255,255,.06)',
                  borderRadius: '10px',
                  padding: '16px',
                }}>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--y)', marginBottom: '6px' }}>
                    ÉTAPE {s.n}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{s.t}</div>
                  <div style={{ fontSize: '12px', color: 'var(--fog)' }}>{s.d}</div>
                </div>
              ))}
            </div>

            {/* Installation */}
            <h3 id="installation" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', marginTop: '40px', color: 'var(--snow)' }}>
              Installation
            </h3>
            <p style={{ color: 'var(--fog)', fontSize: '14px', marginBottom: '16px', lineHeight: 1.7 }}>
              Installez le SDK officiel LUMIS pour votre langage préféré :
            </p>

            <CB lang="bash — Python" code={`pip install lumis-ai`} />
            <CB lang="bash — Node.js" code={`npm install @lumis/sdk
# ou
yarn add @lumis/sdk`} />

            {/* Auth */}
            <h3 id="auth" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', marginTop: '40px', color: 'var(--snow)' }}>
              Authentification
            </h3>
            <p style={{ color: 'var(--fog)', fontSize: '14px', marginBottom: '16px', lineHeight: 1.7 }}>
              Toutes les requêtes API nécessitent un Bearer token. Récupérez votre clé depuis le <Link href="/demo" style={{ color: 'var(--y)' }}>tableau de bord</Link>.
            </p>

            <div style={{
              background: 'rgba(255,51,85,.08)',
              border: '1px solid rgba(255,51,85,.2)',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#ff8899',
              lineHeight: 1.6,
            }}>
              <strong style={{ color: '#ff5577' }}>Sécurité :</strong> Ne commitez jamais votre clé API dans votre code source. Utilisez des variables d'environnement.
            </div>

            <CB lang="bash" code={`export LUMIS_API_KEY="lms-sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`} />

            <CB lang="python" code={`import lumis

client = lumis.Client(api_key="lms-sk-...")
# ou automatiquement depuis l'env
client = lumis.Client()  # lit LUMIS_API_KEY`} />

            <CB lang="typescript" code={`import Lumis from '@lumis/sdk'

const client = new Lumis({
  apiKey: process.env.LUMIS_API_KEY,
})`} />

            {/* First request */}
            <h3 id="first-request" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', marginTop: '40px', color: 'var(--snow)' }}>
              Première requête
            </h3>

            <CB lang="python" code={`import lumis

client = lumis.Client()

response = client.chat.completions.create(
    model="lumis-ultra",
    messages=[
        {
            "role": "system",
            "content": "Tu es un assistant expert en droit français des affaires."
        },
        {
            "role": "user",
            "content": "Rédige une clause de non-concurrence conforme au droit français."
        }
    ],
    max_tokens=1024,
    temperature=0.3,
)

print(response.choices[0].message.content)`} />

            <CB lang="typescript" code={`import Lumis from '@lumis/sdk'

const client = new Lumis()

const response = await client.chat.completions.create({
  model: 'lumis-ultra',
  messages: [
    {
      role: 'system',
      content: 'Tu es un assistant expert en droit français des affaires.',
    },
    {
      role: 'user',
      content: 'Rédige une clause de non-concurrence conforme au droit français.',
    },
  ],
  max_tokens: 1024,
  temperature: 0.3,
})

console.log(response.choices[0].message.content)`} />

            {/* Streaming */}
            <h3 id="streaming" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', marginTop: '40px', color: 'var(--snow)' }}>
              Streaming
            </h3>
            <p style={{ color: 'var(--fog)', fontSize: '14px', marginBottom: '16px', lineHeight: 1.7 }}>
              Activez le streaming pour une expérience utilisateur en temps réel. LUMIS Ultra supporte Server-Sent Events (SSE).
            </p>

            <CB lang="python" code={`with client.chat.completions.stream(
    model="lumis-ultra",
    messages=[{"role": "user", "content": "Écris un plan business en 5 points"}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)`} />

            <CB lang="typescript" code={`const stream = await client.chat.completions.create({
  model: 'lumis-ultra',
  messages: [{ role: 'user', content: 'Écris un plan business en 5 points' }],
  stream: true,
})

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content ?? ''
  process.stdout.write(delta)
}`} />
          </section>

          {/* ── API REFERENCE ── */}
          <section id="api-reference" style={{ marginBottom: '72px' }}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '56px', marginBottom: '32px' }}>
              <SectionTitle tag="02 — Référence" title="API Reference" id="api-ref-title" />
            </div>

            <p className="lead" style={{ marginBottom: '32px' }}>
              L'API LUMIS suit la convention REST. Toutes les requêtes utilisent HTTPS. Base URL : <code style={{ fontFamily: 'var(--fm)', color: 'var(--y)', fontSize: '14px' }}>https://api.lumis.ai/v1</code>
            </p>

            {/* Endpoints table */}
            <h3 id="chat-completions" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--snow)' }}>
              Endpoints disponibles
            </h3>

            <div style={{
              background: 'var(--card)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '32px',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,.03)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--fog)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Méthode</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--fog)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Endpoint</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--fog)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Description</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--fog)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>Auth</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { method: 'POST', endpoint: '/chat/completions', desc: 'Génère une réponse de chat (compatible OpenAI)', auth: 'Bearer' },
                    { method: 'POST', endpoint: '/chat/completions', desc: 'Streaming SSE', auth: 'Bearer' },
                    { method: 'POST', endpoint: '/embeddings', desc: 'Génère des embeddings vectoriels', auth: 'Bearer' },
                    { method: 'GET', endpoint: '/models', desc: 'Liste tous les modèles disponibles', auth: 'Bearer' },
                    { method: 'GET', endpoint: '/models/{id}', desc: "Détails d'un modèle spécifique", auth: 'Bearer' },
                    { method: 'POST', endpoint: '/agents', desc: 'Crée un nouvel agent autonome', auth: 'Bearer' },
                    { method: 'GET', endpoint: '/agents', desc: 'Liste vos agents', auth: 'Bearer' },
                    { method: 'POST', endpoint: '/agents/{id}/run', desc: 'Exécute un agent avec un input', auth: 'Bearer' },
                    { method: 'GET', endpoint: '/usage', desc: 'Consulte votre consommation actuelle', auth: 'Bearer' },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          fontFamily: 'var(--fm)',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: row.method === 'POST' ? 'rgba(77,166,255,.15)' : 'rgba(40,200,64,.15)',
                          color: row.method === 'POST' ? '#4da6ff' : '#28c840',
                        }}>
                          {row.method}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--fm)', fontSize: '12px', color: 'var(--snow)' }}>{row.endpoint}</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--fog)' }}>{row.desc}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--y)' }}>{row.auth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Models */}
            <h3 id="models" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--snow)', marginTop: '40px' }}>
              Modèles disponibles
            </h3>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
              {[
                {
                  id: 'lumis-ultra',
                  name: 'LUMIS Ultra',
                  ctx: '512K tokens',
                  speed: '38ms P95',
                  desc: 'Modèle flagship. Raisonnement avancé, multimodal, optimal pour tâches complexes.',
                  badge: 'Recommandé',
                },
                {
                  id: 'lumis-pro',
                  name: 'LUMIS Pro',
                  ctx: '128K tokens',
                  speed: '18ms P95',
                  desc: 'Équilibre performance/vitesse. Idéal pour la production à grande échelle.',
                  badge: 'Populaire',
                },
                {
                  id: 'lumis-flash',
                  name: 'LUMIS Flash',
                  ctx: '32K tokens',
                  speed: '8ms P95',
                  desc: 'Ultra-rapide. Parfait pour les applications temps réel et chatbots à fort volume.',
                  badge: 'Rapide',
                },
                {
                  id: 'lumis-embed',
                  name: 'LUMIS Embed',
                  ctx: '8K tokens',
                  speed: '5ms P95',
                  desc: "Modèle d'embeddings optimisé pour le français. 1536 dimensions.",
                  badge: 'Embeddings',
                },
              ].map((m) => (
                <div key={m.id} style={{
                  background: 'var(--card)',
                  border: '1px solid rgba(255,255,255,.06)',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <code style={{ fontFamily: 'var(--fm)', fontSize: '13px', color: 'var(--y)' }}>{m.id}</code>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        background: 'rgba(212,255,0,.12)',
                        color: 'var(--y)',
                        border: '1px solid rgba(212,255,0,.2)',
                        padding: '2px 8px',
                        borderRadius: '100px',
                      }}>{m.badge}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--fog)' }}>{m.desc}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: '12px', color: 'var(--snow)', marginBottom: '2px' }}>{m.ctx}</div>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--fog)' }}>{m.speed}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tokens */}
            <h3 id="tokens" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--snow)', marginTop: '40px' }}>
              Tokens & Rate limits
            </h3>

            <div style={{
              background: 'var(--card)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '24px',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,.03)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                    {['Plan', 'RPM', 'TPM', 'TPJ', 'Contexte max'].map((h) => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--fog)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Free', '10', '40K', '1M', '32K'],
                    ['Pro', '60', '400K', '20M', '128K'],
                    ['Business', '300', '2M', '200M', '512K'],
                    ['Enterprise', 'Illimité', 'Illimité', 'Illimité', '512K'],
                  ].map(([plan, rpm, tpm, tpj, ctx], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: plan === 'Enterprise' ? 'var(--y)' : 'var(--snow)' }}>{plan}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--fog)' }}>{rpm}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--fog)' }}>{tpm}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--fog)' }}>{tpj}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--fm)', fontSize: '12px', color: 'var(--snow)' }}>{ctx}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── AGENTS ── */}
          <section id="agents" style={{ marginBottom: '72px' }}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '56px', marginBottom: '32px' }}>
              <SectionTitle tag="03 — Agents" title="Agents autonomes" id="agents-title" />
            </div>

            <p className="lead" style={{ marginBottom: '32px' }}>
              Les agents LUMIS sont des entités autonomes capables de décomposer des objectifs complexes, utiliser des outils externes et maintenir un contexte sur plusieurs sessions.
            </p>

            <h3 id="agents-overview" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--snow)' }}>
              Vue d'ensemble
            </h3>

            <div style={{
              background: 'rgba(212,255,0,.04)',
              border: '1px solid rgba(212,255,0,.15)',
              borderRadius: '10px',
              padding: '16px 20px',
              marginBottom: '24px',
              fontSize: '14px',
              color: 'var(--snow)',
              lineHeight: 1.7,
            }}>
              Les agents LUMIS utilisent un cycle <strong>Raisonnement → Action → Observation</strong> (RAO). Chaque cycle peut appeler des outils externes (API, bases de données, navigateur) et stocker des informations en mémoire longue durée.
            </div>

            <h3 id="create-agent" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--snow)', marginTop: '32px' }}>
              Créer un agent
            </h3>

            <CB lang="python" code={`agent = client.agents.create(
    name="Prospecteur Commercial",
    description="Qualifie les leads LinkedIn et rédige des emails personnalisés",
    model="lumis-ultra",
    instructions="""Tu es un expert en développement commercial B2B.
Pour chaque lead :
1. Analyse le profil LinkedIn et le site web de l'entreprise
2. Identifie la proposition de valeur la plus pertinente
3. Rédige un email de prospection personnalisé en 150 mots max
""",
    tools=["web_search", "send_email", "update_crm"],
    memory={
        "type": "persistent",
        "retention_days": 90,
    },
)`} />

            <CB lang="python" code={`# Exécuter l'agent
run = client.agents.run(
    agent_id=agent.id,
    input="Prospecte les 10 CTOs des startups SaaS levées en Série B en France ce mois-ci",
    context={
        "company": "ACME Corp",
        "product": "Logiciel de comptabilité automatisée",
        "target_segment": "PME 10-200 salariés",
    },
)

# Suivre l'exécution en temps réel
for event in run.stream():
    if event.type == "thought":
        print(f"[Réflexion] {event.content}")
    elif event.type == "action":
        print(f"[Action] {event.tool}: {event.input}")
    elif event.type == "done":
        print(f"[Résultat] {event.output}")`} />

            <h3 id="memory" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--snow)', marginTop: '32px' }}>
              Mémoire longue durée
            </h3>

            <CB lang="python" code={`# Stocker des informations en mémoire
client.agents.memory.store(
    agent_id=agent.id,
    content="Le prospect Jean Dupont (jean@acme.fr) préfère les appels le mardi matin.",
    tags=["prospect", "preferences"],
)

# Récupérer des souvenirs pertinents
memories = client.agents.memory.search(
    agent_id=agent.id,
    query="préférences de contact Jean Dupont",
    limit=5,
)

for m in memories:
    print(f"[Mémoire] {m.content} (score: {m.relevance:.2f})")`} />
          </section>

          {/* ── WEBHOOKS ── */}
          <section id="webhooks" style={{ marginBottom: '72px' }}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '56px', marginBottom: '32px' }}>
              <SectionTitle tag="04 — Webhooks" title="Webhooks" id="webhooks-title" />
            </div>

            <h3 id="webhook-config" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--snow)' }}>
              Configuration
            </h3>

            <CB lang="json — Payload exemple" code={`{
  "id": "evt_01HXYZ...",
  "type": "agent.run.completed",
  "created": 1704067200,
  "data": {
    "agent_id": "agt_abc123",
    "run_id": "run_xyz789",
    "status": "completed",
    "tokens_used": 4821,
    "duration_ms": 12400,
    "output": "..."
  }
}`} />

            <h3 id="events" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--snow)', marginTop: '32px' }}>
              Événements disponibles
            </h3>

            <div style={{
              background: 'var(--card)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '24px',
            }}>
              {[
                { event: 'agent.run.started', desc: "Une exécution d'agent a démarré" },
                { event: 'agent.run.completed', desc: "Une exécution d'agent s'est terminée avec succès" },
                { event: 'agent.run.failed', desc: "Une exécution d'agent a échoué" },
                { event: 'chat.completion.created', desc: 'Une completion a été générée' },
                { event: 'usage.limit.approaching', desc: 'Seuil de consommation à 80%' },
                { event: 'billing.invoice.paid', desc: 'Facture réglée avec succès' },
              ].map((e, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  borderBottom: i < 5 ? '1px solid rgba(255,255,255,.04)' : 'none',
                }}>
                  <code style={{ fontFamily: 'var(--fm)', fontSize: '12px', color: 'var(--y)', flexShrink: 0 }}>{e.event}</code>
                  <span style={{ fontSize: '13px', color: 'var(--fog)' }}>{e.desc}</span>
                </div>
              ))}
            </div>

            <h3 id="webhook-security" style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--snow)', marginTop: '32px' }}>
              Vérifier la signature
            </h3>

            <CB lang="python" code={`import hmac
import hashlib

def verify_webhook(payload: bytes, signature: str, secret: str) -> bool:
    """Vérifie la signature HMAC-SHA256 du webhook."""
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature)

# Dans votre handler Flask/FastAPI :
@app.post("/webhook/lumis")
async def handle_webhook(request: Request):
    payload = await request.body()
    signature = request.headers.get("X-Lumis-Signature")

    if not verify_webhook(payload, signature, os.getenv("LUMIS_WEBHOOK_SECRET")):
        raise HTTPException(status_code=401, detail="Signature invalide")

    event = json.loads(payload)
    # Traiter l'événement...`} />
          </section>

          {/* ── SDKs ── */}
          <section id="sdks" style={{ marginBottom: '72px' }}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: '56px', marginBottom: '32px' }}>
              <SectionTitle tag="05 — SDKs" title="SDKs officiels" id="sdks-title" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {[
                { lang: 'Python', id: 'sdk-python', pkg: 'lumis-ai', install: 'pip install lumis-ai', v: '1.4.2', status: 'Stable' },
                { lang: 'JavaScript / TypeScript', id: 'sdk-js', pkg: '@lumis/sdk', install: 'npm i @lumis/sdk', v: '1.4.1', status: 'Stable' },
                { lang: 'Go', id: 'sdk-go', pkg: 'github.com/lumis-ai/go-sdk', install: 'go get github.com/lumis-ai/go-sdk', v: '0.9.0', status: 'Beta' },
                { lang: 'Java', id: 'sdk-java', pkg: 'ai.lumis:lumis-sdk', install: 'Maven / Gradle', v: '0.7.0', status: 'Beta' },
              ].map((sdk) => (
                <div key={sdk.id} id={sdk.id} style={{
                  background: 'var(--card)',
                  border: '1px solid rgba(255,255,255,.06)',
                  borderRadius: '10px',
                  padding: '20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700 }}>{sdk.lang}</div>
                    <span style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '100px',
                      background: sdk.status === 'Stable' ? 'rgba(40,200,64,.15)' : 'rgba(254,188,46,.15)',
                      color: sdk.status === 'Stable' ? '#28c840' : '#febc2e',
                    }}>{sdk.status}</span>
                  </div>
                  <code style={{ display: 'block', fontFamily: 'var(--fm)', fontSize: '12px', color: 'var(--y)', marginBottom: '8px' }}>
                    {sdk.pkg}
                  </code>
                  <div style={{
                    background: '#0a0c12',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontFamily: 'var(--fm)',
                    fontSize: '12px',
                    color: '#c9d1d9',
                    marginBottom: '8px',
                  }}>
                    {sdk.install}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--fog)' }}>Version {sdk.v}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,255,0,.08), rgba(212,255,0,.03))',
            border: '1px solid rgba(212,255,0,.15)',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
          }}>
            <div className="tag" style={{ justifyContent: 'center' }}>Prêt à intégrer ?</div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
              Obtenez votre clé API gratuitement
            </h3>
            <p style={{ color: 'var(--fog)', fontSize: '14px', marginBottom: '24px' }}>
              1 000 tokens offerts. Aucune carte de crédit requise.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/demo" className="btn by blg">Créer mon compte →</Link>
              <a href="mailto:api@lumis.ai" className="btn bg">Parler à un ingénieur</a>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
