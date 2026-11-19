// Descarga el límite oficial de la cuenca (MDBA, Water Act 2007) desde data.gov.au
// y lo guarda simplificado en public/data/cuenca.geojson. Requiere Node 18+.
// Uso: npm run datos
import { writeFile } from 'node:fs/promises'

const URL =
  'https://data.gov.au/geoserver/murray-darling-basin-boundary/wfs?request=GetFeature&typeName=ckan_4ede9aed_5620_47db_a72b_0b3aa0a3ced0&outputFormat=json'

// Simplificación simple: redondea a 3 decimales (~100 m) y elimina vértices repetidos.
const simplificarAnillo = (anillo) => {
  const out = []
  for (const [x, y] of anillo) {
    const p = [Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000]
    const u = out[out.length - 1]
    if (!u || u[0] !== p[0] || u[1] !== p[1]) out.push(p)
  }
  return out
}
const simplificar = (g) => {
  if (g.type === 'Polygon') return { ...g, coordinates: g.coordinates.map(simplificarAnillo) }
  if (g.type === 'MultiPolygon') return { ...g, coordinates: g.coordinates.map((p) => p.map(simplificarAnillo)) }
  return g
}

console.log('Descargando límite oficial de la cuenca desde data.gov.au…')
const res = await fetch(URL)
if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
const geo = await res.json()
geo.features = geo.features.map((f) => ({ ...f, geometry: simplificar(f.geometry) }))
delete geo.crs
await writeFile(new URL('../public/data/cuenca.geojson', import.meta.url), JSON.stringify(geo))
console.log(`Listo: public/data/cuenca.geojson (${geo.features.length} polígono/s).`)
