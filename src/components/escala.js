// Escala de color común para valores de EC (µS/cm).
export const CLASES_EC = [
  { hasta: 300, color: '#2b83ba', etiqueta: '< 300' },
  { hasta: 600, color: '#80bf82', etiqueta: '300 – 600' },
  { hasta: 800, color: '#e6c229', etiqueta: '600 – 800' },
  { hasta: 1200, color: '#f07f2e', etiqueta: '800 – 1.200' },
  { hasta: Infinity, color: '#c62828', etiqueta: '> 1.200' },
]

export function colorEC(ec) {
  if (ec == null) return '#9aa5b1'
  return CLASES_EC.find((c) => ec < c.hasta).color
}

export const fmt = (n, dec = 0) =>
  n == null ? '—' : n.toLocaleString('es-AR', { maximumFractionDigits: dec, minimumFractionDigits: dec })
