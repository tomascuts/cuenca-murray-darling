// Etiqueta que indica si un dato es medido, modelado, una proyección o una estimación.
const ETIQUETA_TIPO = { medido: 'Medido', modelado: 'Modelado', 'proyección': 'Proyección', estimado: 'Estimación' }

export default function TipoDato({ tipo }) {
  if (!tipo) return null
  return <span className={`chip chip-${tipo.replace('ó', 'o')}`}>{ETIQUETA_TIPO[tipo]}</span>
}
