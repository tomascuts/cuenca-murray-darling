import { useState } from 'react'
import { hitos, CATEGORIAS } from '../data/hitos'

export default function LineaTiempo() {
  const [activas, setActivas] = useState(Object.keys(CATEGORIAS))
  const toggle = (c) => setActivas((a) => (a.includes(c) ? a.filter((x) => x !== c) : [...a, c]))
  const lista = [...hitos].sort((a, b) => a.orden - b.orden).filter((h) => activas.includes(h.categoria))

  return (
    <section className="vista-tiempo">
      <p className="intro">
        Cómo evolucionó el problema y la respuesta de los gobiernos desde los años 60 hasta hoy. Filtrá por tipo de hito.
      </p>
      <div className="filtros">
        {Object.entries(CATEGORIAS).map(([id, c]) => (
          <button key={id} className={activas.includes(id) ? 'activo' : ''} style={{ '--c': c.color }} onClick={() => toggle(id)}>
            {c.nombre}
          </button>
        ))}
      </div>
      <ol className="linea">
        {lista.map((h) => (
          <li key={h.titulo} style={{ '--c': CATEGORIAS[h.categoria].color }}>
            <div className="anio">{h.anio}</div>
            <div className="contenido">
              <span className="cat">{CATEGORIAS[h.categoria].nombre}</span>
              <h3>{h.titulo}</h3>
              <p>{h.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
