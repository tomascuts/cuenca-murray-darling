import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Circle, CircleMarker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { sitiosMeta, esquemasSIS, regionesRiego, zonasSalinas, contornoAproximado } from '../data/geo'
import { auditoria1999 } from '../data/series'
import { CLASES_EC, colorEC, fmt } from './escala'

const BASE = import.meta.env.BASE_URL

// Valor de la auditoría 1999 por nombre de río de Natural Earth.
function valoresPorRio() {
  const m = {}
  for (const r of auditoria1999.rios) {
    const claves = Array.isArray(r.clave) ? r.clave : r.clave ? [r.clave] : []
    claves.forEach((c) => (m[c] = r))
  }
  return m
}

// Capas con su muestra de color, para que el panel funcione a la vez como filtro y como leyenda.
const CAPAS = [
  { id: 'limite', nombre: 'Límite de la cuenca', muestra: 'borde' },
  { id: 'rios', nombre: 'Ríos y su salinidad', muestra: 'rio' },
  { id: 'zonas', nombre: 'Zonas con problema de salinidad', muestra: 'zona' },
  { id: 'riego', nombre: 'Regiones de riego', muestra: 'riego' },
  { id: 'sitios', nombre: 'Sitios con meta del Basin Plan', muestra: 'sitio' },
  { id: 'sis', nombre: 'Esquemas de interceptación de sales', muestra: 'sis' },
]

export default function MapaCuenca() {
  const [visibles, setVisibles] = useState({ limite: true, rios: true, riego: false, zonas: true, sitios: true, sis: true })
  const [anioIdx, setAnioIdx] = useState(0)
  const [limite, setLimite] = useState(null)
  const [limiteOficial, setLimiteOficial] = useState(false)
  const [rios, setRios] = useState(null)
  const porRio = useMemo(() => valoresPorRio(), [])

  useEffect(() => {
    fetch(`${BASE}data/rios.geojson`).then((r) => r.json()).then(setRios).catch(() => setRios(null))
    fetch(`${BASE}data/cuenca.geojson`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((g) => { setLimite(g); setLimiteOficial(true) })
      .catch(() => { setLimite(contornoAproximado); setLimiteOficial(false) })
  }, [])

  const anio = auditoria1999.anios[anioIdx]
  const estiloRio = (f) => {
    const r = porRio[f.properties.nombre]
    const ec = r ? r.v[anioIdx] : null
    const principal = ['Murray', 'Darling'].includes(f.properties.nombre)
    return { color: colorEC(ec), weight: principal ? 4 : 2.5, opacity: 0.95 }
  }
  const popupRio = (f, layer) => {
    const r = porRio[f.properties.nombre]
    const txt = r
      ? `<b>${f.properties.nombre}</b><br/>Auditoría 1999 – ${r.rio}<br/>${auditoria1999.anios
          .map((a, i) => `${a}: <b>${fmt(r.v[i])} EC</b>${i === 0 ? ' (estimado)' : ' (proyección)'}`)
          .join('<br/>')}`
      : `<b>${f.properties.nombre}</b><br/>Sin valor en la auditoría de 1999.`
    layer.bindTooltip(f.properties.nombre, { sticky: true })
    layer.bindPopup(txt)
  }

  const toggle = (id) => setVisibles((v) => ({ ...v, [id]: !v[id] }))

  return (
    <section className="vista-mapa">
      <aside className="panel">
        <h2>Capas del mapa</h2>
        <ul className="capas">
          {CAPAS.map((c) => (
            <li key={c.id} className={visibles[c.id] ? '' : 'apagada'}>
              <label>
                <input type="checkbox" checked={visibles[c.id]} onChange={() => toggle(c.id)} />
                <span className={`muestra muestra-${c.muestra}`} />
                <span>
                  {c.nombre}
                  {c.id === 'limite' && !limiteOficial && <small> (aprox.)</small>}
                  {c.id === 'sis' && <small> · tamaño = sal interceptada</small>}
                </span>
              </label>

              {c.id === 'rios' && visibles.rios && (
                <div className="subpanel">
                  <div className="selector-anios" role="group" aria-label="Año de la auditoría de salinidad">
                    {auditoria1999.anios.map((a, i) => (
                      <button key={a} className={i === anioIdx ? 'activo' : ''} onClick={() => setAnioIdx(i)}>{a}</button>
                    ))}
                  </div>
                  <div className="escala">
                    {CLASES_EC.map((k) => (
                      <span key={k.etiqueta} style={{ background: k.color }} title={`${k.etiqueta} EC`} />
                    ))}
                  </div>
                  <div className="escala-etiquetas">
                    {['300', '600', '800', '1.200'].map((v, i) => (
                      <span key={v} style={{ left: `${(i + 1) * 20}%` }}>{v}</span>
                    ))}
                  </div>
                  <div className="escala-unidad">EC (µS/cm)</div>
                  <p className="ayuda">
                    {anioIdx === 0
                      ? 'Salinidad media de 1998 (auditoría de 1999). Gris: sin dato.'
                      : `Proyección de 1999 para ${anio}, no medición. Morgan: 670 EC proyectados para 2020; 234 EC medidos en 2019-20.`}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="ayuda pie-panel">Hacé clic en un río, zona, sitio o esquema para ver sus datos.</p>
      </aside>

      <div className="contenedor-mapa">
        <MapContainer bounds={[[-38.2, 138.3], [-24.4, 152.6]]} className="mapa" scrollWheelZoom zoomSnap={0.25} zoomDelta={0.5}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {visibles.limite && limite && (
            <GeoJSON key={limiteOficial ? 'oficial' : 'aprox'} data={limite}
              style={{ color: '#1f3864', weight: 2.5, fillColor: '#1f3864', fillOpacity: 0.05, dashArray: limiteOficial ? null : '6 4' }} />
          )}
          {visibles.riego && regionesRiego.map((r) => (
            <Circle key={r.nombre} center={[r.lat, r.lon]} radius={r.radioKm * 1000}
              pathOptions={{ color: '#228b22', weight: 1, fillOpacity: 0.25 }}>
              <Popup><b>{r.nombre}</b><br />Producción principal: {r.cultivos}<br /><i>Ubicación y extensión aproximadas.</i></Popup>
            </Circle>
          ))}
          {visibles.zonas && zonasSalinas.map((z) => (
            <Circle key={z.nombre} center={[z.lat, z.lon]} radius={z.radioKm * 1000}
              pathOptions={{ color: '#c62828', weight: 1, dashArray: '4 3', fillOpacity: 0.15 }}>
              <Popup>
                <b>{z.nombre}</b><br /><i>{z.tipo}</i><br />{z.texto}<br />
                <small>Extensión aproximada.</small>
              </Popup>
            </Circle>
          ))}
          {visibles.rios && rios && (
            <GeoJSON key={`rios-${anioIdx}`} data={rios} style={estiloRio} onEachFeature={popupRio} />
          )}
          {visibles.sis && esquemasSIS.map((s) => (
            <CircleMarker key={s.nombre} center={[s.lat, s.lon]}
              radius={4 + Math.sqrt((s.t2122 || 0) / 1000)}
              pathOptions={{ color: '#4c1d95', fillColor: '#7c3aed', fillOpacity: 0.8, weight: 1 }}>
              <Tooltip>{s.nombre}</Tooltip>
              <Popup>
                <b>Esquema {s.nombre}</b> ({s.estado})<br />
                Sal desviada: 2017-18 {fmt(s.t1718)} t · 2018-19 {fmt(s.t1819)} t · 2021-22 {fmt(s.t2122)} t<br />
                Salinidad del agua subterránea bombeada (2021-22): <b>{s.ec ? `${fmt(s.ec)} EC` : 'sin dato'}</b>
                {s.ec ? ` (${fmt(s.ec / 800, 0)} veces la meta de Morgan)` : ''}<br />
                <small>Ubicación aproximada.</small>
              </Popup>
            </CircleMarker>
          ))}
          {visibles.sitios && sitiosMeta.map((s) => (
            <CircleMarker key={s.nombre} center={[s.lat, s.lon]} radius={7}
              pathOptions={{ color: '#fff', fillColor: '#111', fillOpacity: 1, weight: 2 }}>
              <Tooltip direction="right" offset={[8, 0]} className="etiqueta-sitio">{s.nombre} · meta {fmt(s.meta)} EC</Tooltip>
              <Popup>
                <b>{s.nombre}</b><br />{s.nota}<br />
                Meta del Basin Plan: no superar <b>{fmt(s.meta)} EC</b> el 95% del tiempo.<br />
                <small>Ver estado en “Estado actual”.</small>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </section>
  )
}
