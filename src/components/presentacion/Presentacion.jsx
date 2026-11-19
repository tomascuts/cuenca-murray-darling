import { useCallback, useEffect, useState } from 'react'
import { DIAPOSITIVAS, EJES } from './diapositivas'
import './presentacion.css'

// Modo presentación: una diapositiva por pantalla, navegable con teclado.
// ← → / Espacio / AvPág RePág: avanzar y retroceder · Inicio / Fin · F: pantalla completa · N: notas · Esc: salir
export default function Presentacion({ onSalir }) {
  const inicial = Number(new URLSearchParams(window.location.hash.split('?')[1]).get('d')) || 1
  const [idx, setIdx] = useState(Math.min(Math.max(inicial, 1), DIAPOSITIVAS.length) - 1)
  const [notas, setNotas] = useState(false)
  const total = DIAPOSITIVAS.length
  const d = DIAPOSITIVAS[idx]
  const eje = EJES[d.eje]

  const ir = useCallback((i) => {
    const n = Math.min(Math.max(i, 0), total - 1)
    setIdx(n)
    window.history.replaceState(null, '', `#presentacion?d=${n + 1}`)
  }, [total])

  const pantallaCompleta = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }

  useEffect(() => {
    const onKey = (e) => {
      // No interferir cuando se usa el mapa, un selector o un campo de texto.
      if (e.target.closest?.('.leaflet-container, input, select, textarea')) return
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); ir(idx + 1) }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); ir(idx - 1) }
      else if (e.key === 'Home') ir(0)
      else if (e.key === 'End') ir(total - 1)
      else if (e.key.toLowerCase() === 'f') pantallaCompleta()
      else if (e.key.toLowerCase() === 'n') setNotas((v) => !v)
      else if (e.key === 'Escape' && !document.fullscreenElement) onSalir()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, ir, total, onSalir])

  const { Contenido } = d

  return (
    <div className="presentacion" style={{ '--eje': eje.color }}>
      <div className="progreso"><span style={{ width: `${((idx + 1) / total) * 100}%` }} /></div>

      <section className={`diapositiva ${d.tipo ?? ''}`} key={idx}>
        {!d.tipo?.includes('portada') && (
          <header className="diap-cabecera">
            {d.eje > 0 && <span className="diap-eje">Eje {d.eje} · {eje.nombre}</span>}
            <h1>{d.titulo}</h1>
            {d.bajada && <p className="diap-bajada">{d.bajada}</p>}
          </header>
        )}
        <div className="diap-cuerpo">
          <Contenido />
        </div>
      </section>

      {notas && (
        <aside className="notas">
          <strong>Notas para exponer</strong>
          <ul>{d.notas.map((n) => <li key={n}>{n}</li>)}</ul>
        </aside>
      )}

      <nav className="controles">
        <button onClick={onSalir} title="Salir (Esc)">✕ Salir</button>
        <div className="indice">
          {DIAPOSITIVAS.map((x, i) => (
            <button key={i} className={i === idx ? 'activo' : ''} style={{ '--c': EJES[x.eje].color }}
              onClick={() => ir(i)} title={`${i + 1}. ${x.titulo}`} />
          ))}
        </div>
        <button onClick={() => ir(idx - 1)} disabled={idx === 0} title="Anterior (←)">‹</button>
        <span className="contador">{idx + 1} / {total}</span>
        <button onClick={() => ir(idx + 1)} disabled={idx === total - 1} title="Siguiente (→)">›</button>
        <button onClick={() => setNotas((v) => !v)} className={notas ? 'activo' : ''} title="Notas (N)">Notas</button>
        <button onClick={pantallaCompleta} title="Pantalla completa (F)">⛶</button>
      </nav>
    </div>
  )
}
