import { FUENTES } from '../data/fuentes'

const ETIQUETA_TIPO = {
  medido: 'Dato medido',
  modelado: 'Resultado de modelo',
  'proyección': 'Proyección',
  estimado: 'Estimación',
}

// Pie de gráfico: tipo de dato, método, unidad y fuentes con enlace.
export function Fuente({ ids = [], tipo, metodo, unidad, periodo }) {
  const lista = [...new Set(ids)].filter((id) => FUENTES[id])
  return (
    <div className="fuente">
      <div className="fuente-meta">
        {tipo && <span className={`chip chip-${tipo.replace('ó', 'o')}`}>{ETIQUETA_TIPO[tipo] ?? tipo}</span>}
        {unidad && <span>Unidad: {unidad}</span>}
        {periodo && <span>Período: {periodo}</span>}
      </div>
      {metodo && <p className="fuente-metodo">{metodo}</p>}
      <p className="fuente-lista">
        Fuente{lista.length > 1 ? 's' : ''}:{' '}
        {lista.map((id, i) => (
          <span key={id}>
            {FUENTES[id].url ? (
              <a href={FUENTES[id].url} target="_blank" rel="noreferrer">{FUENTES[id].cita}</a>
            ) : (
              FUENTES[id].cita
            )}
            {i < lista.length - 1 ? ' · ' : ''}
          </span>
        ))}
      </p>
    </div>
  )
}
