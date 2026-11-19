import TipoDato from './TipoDato'

// Último dato disponible por meta. estado: 'cumple' | 'no-cumple' | 'alerta'
const TARJETAS = [
  {
    nombre: 'Basin Salinity Target (Morgan, simulada)', meta: '< 800 EC el 95% del tiempo',
    valor: '786 EC', detalle: 'Percentil 95 simulado con las medidas de 2024; 3% del tiempo sobre 800 EC.',
    fecha: 'Condiciones 2024', estado: 'cumple', tipo: 'modelado',
  },
  {
    nombre: 'Morgan (medido)', meta: '800 EC (Basin Plan)',
    valor: '346 EC', detalle: 'Promedio 2023-24. Percentil 95: 498 EC. Pico: 549 EC. Ningún día sobre 800 EC.',
    fecha: 'Jul 2023 – jun 2024', estado: 'cumple', tipo: 'medido',
  },
  {
    nombre: 'Lock 6 (entrada a Australia del Sur)', meta: '580 EC',
    valor: 'Debajo de la meta', detalle: 'Sin valor numérico publicado para 2024-25. Máximo 2021-22: 349 EC.',
    fecha: '2024-25', estado: 'cumple', tipo: 'medido',
  },
  {
    nombre: 'Murray Bridge', meta: '830 EC',
    valor: 'Debajo de la meta', detalle: 'Sin valor numérico publicado para 2024-25. Máximo 2021-22: 377 EC.',
    fecha: '2024-25', estado: 'cumple', tipo: 'medido',
  },
  {
    nombre: 'Milang (Lower Lakes)', meta: '1.000 EC',
    valor: '> 1.200 EC', detalle: 'Superó 1.000 EC desde mediados de junio de 2025 por ingreso de agua de mar.',
    fecha: 'Junio 2025', estado: 'alerta', tipo: 'medido',
  },
  {
    nombre: 'Burtundy (río Darling)', meta: '830 EC el 95% del tiempo',
    valor: '8,5% sobre la meta', detalle: 'Pico de 1.238 EC el 6/4/2024. Única meta por sitio incumplida en 2019–2024.',
    fecha: 'Jul 2019 – jun 2024', estado: 'no-cumple', tipo: 'medido',
  },
  {
    nombre: 'Exportación de sal al mar', meta: '2 Mt por año (promedio de 3 años)',
    valor: '2,11 Mt/año', detalle: 'Promedio anualizado julio 2022 – junio 2025.',
    fecha: '2022–2025', estado: 'cumple', tipo: 'estimado',
  },
  {
    nombre: 'Sal interceptada (todos los esquemas)', meta: 'Sin meta numérica',
    valor: '359.645 t', detalle: 'Sal desviada en 2023-24 por los esquemas conjuntos (16.648 ML bombeados).',
    fecha: '2023-24', estado: 'info', tipo: 'medido',
  },
]

const TEXTO_ESTADO = { cumple: 'Cumple', 'no-cumple': 'No cumple', alerta: 'Superada recientemente', info: 'Dato' }

export default function EstadoActual() {
  return (
    <section className="vista-estado">
      <p className="intro">
        Último dato publicado para cada meta del Basin Plan y de BSM2030. Las fechas varían porque cada informe cubre
        un período distinto; para valores diarios en tiempo real ver la sección “Mejoras” del README.
      </p>
      <div className="tarjetas-estado">
        {TARJETAS.map((t) => (
          <article key={t.nombre} className={`estado estado-${t.estado}`}>
            <header>
              <h3>{t.nombre}</h3>
              <span className="badge">{TEXTO_ESTADO[t.estado]}</span>
            </header>
            <div className="valor">{t.valor}</div>
            <p className="meta">Meta: {t.meta}</p>
            <p>{t.detalle}</p>
            <p className="fecha">{t.fecha} <TipoDato tipo={t.tipo} /></p>
          </article>
        ))}
      </div>
    </section>
  )
}
