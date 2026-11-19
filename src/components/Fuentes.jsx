import { FUENTES } from '../data/fuentes'

export default function Fuentes() {
  const grupos = {}
  Object.values(FUENTES).forEach((f) => (grupos[f.tipo] ??= []).push(f))
  return (
    <section className="vista-fuentes">
      <p className="intro">
        Fuentes utilizadas, agrupadas según los tipos de fuente que pide la consigna. Cada gráfico y cada elemento del
        mapa indica cuáles usa.
      </p>
      {Object.entries(grupos).map(([tipo, lista]) => (
        <div key={tipo} className="grupo-fuentes">
          <h3>{tipo}</h3>
          <ul>
            {lista.map((f) => (
              <li key={f.cita}>
                {f.cita}{' '}
                {f.url && <a href={f.url} target="_blank" rel="noreferrer">Abrir</a>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
