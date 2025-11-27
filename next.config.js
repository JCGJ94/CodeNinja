/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compilador optimizado
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimización de imágenes AGRESIVA
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Minificación SWC
  swcMinify: true,

  // Experimental - CLAVE PARA PERFORMANCE
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react', 'react-dom'],
  },

  // Headers para caching AGRESIVO
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
    ]
  },

  // Compresión
  compress: true,

  // Sin source maps en producción
  productionBrowserSourceMaps: false,

  // Optimización de build
  poweredByHeader: false,
  
  // Reducir tamaño de bundle
  modularizeImports: {
    '@/components': {
      transform: '@/components/{{member}}',
    },
  },
}

module.exports = nextConfig