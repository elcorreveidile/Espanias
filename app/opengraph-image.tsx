import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Espanias — España en la era de las IAs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1C1917',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top flag stripe */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '100%', height: 10, background: '#BF2638', display: 'flex' }} />
          <div style={{ width: '100%', height: 6, background: '#D4AC0D', opacity: 0.7, display: 'flex' }} />
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 96px',
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 20,
              color: '#78716C',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: 36,
              display: 'flex',
            }}
          >
            España + IAs
          </div>

          {/* Wordmark */}
          <div
            style={{
              display: 'flex',
              fontSize: 128,
              fontWeight: 900,
              lineHeight: 0.88,
              marginBottom: 44,
            }}
          >
            <span style={{ color: '#F9F7F4' }}>Espa</span>
            <span style={{ color: '#BF2638' }}>n</span>
            <span style={{ color: '#6D28D9' }}>ias</span>
          </div>

          {/* Tagline */}
          <div style={{ display: 'flex', fontSize: 30, color: '#78716C', fontWeight: 400 }}>
            La España en la era de las inteligencias artificiales
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px 96px',
            borderTop: '1px solid #2A2520',
          }}
        >
          <div style={{ display: 'flex', fontSize: 24, color: '#78716C' }}>
            espanias.com
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, background: '#BF2638', display: 'flex' }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: '#D4AC0D', display: 'flex' }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, background: '#6D28D9', display: 'flex' }} />
          </div>
        </div>

        {/* Bottom flag stripe */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '100%', height: 6, background: '#D4AC0D', opacity: 0.7, display: 'flex' }} />
          <div style={{ width: '100%', height: 10, background: '#BF2638', display: 'flex' }} />
        </div>
      </div>
    ),
    size
  )
}
