import { lazy, Suspense, useState } from 'react'
import LineaTiempo from './components/LineaTiempo'
import EstadoActual from './components/EstadoActual'
import Fuentes from './components/Fuentes'

// Mapa (Leaflet) y gráficos (Recharts) se cargan bajo demanda para aligerar la carga inicial.
const MapaCuenca = lazy(() => import('./components/MapaCuenca'))
const Evolucion = lazy(() => import('./components/Evolucion'))
const Presentacion = lazy(() => import('./components/presentacion/Presentacion'))

const VISTAS = [
  { id: 'mapa', nombre: 'Mapa de la cuenca', Componente: MapaCuenca },
  { id: 'evolucion', nombre: 'Evolución', Componente: Evolucion },
  { id: 'tiempo', nombre: 'Línea de tiempo', Componente: LineaTiempo },
  { id: 'estado', nombre: 'Estado actual', Componente: EstadoActual },
  { id: 'fuentes', nombre: 'Fuentes', Componente: Fuentes },
]

export default function App() {
  const hash = window.location.hash.split('?')[0]
  const inicial = hash === '#presentacion' ? 'presentacion' : VISTAS.find((v) => `#${v.id}` === hash)?.id ?? 'mapa'
  const [vista, setVista] = useState(inicial)

  const ir = (id) => {
    setVista(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  // El modo presentación ocupa toda la pantalla, sin la cabecera de la app.
  if (vista === 'presentacion') {
    return (
      <Suspense fallback={<p className="intro">Cargando presentación…</p>}>
        <Presentacion onSalir={() => ir('mapa')} />
      </Suspense>
    )
  }

  const { Componente } = VISTAS.find((v) => v.id === vista)

  return (
    <div className={`app app-${vista}`}>
      <header className="cabecera">
        <div>
          <h1>Cuenca Murray-Darling: salinización del agua y los suelos</h1>
        </div>
        <nav>
          {VISTAS.map((v) => (
            <button key={v.id} className={v.id === vista ? 'activo' : ''} onClick={() => ir(v.id)}>
              {v.nombre}
            </button>
          ))}
          <button className="boton-presentar" onClick={() => ir('presentacion')}>▶ Presentar</button>
        </nav>
      </header>
      <main className={`main-${vista}`}>
        <Suspense fallback={<p className="intro">Cargando…</p>}>
          <Componente />
        </Suspense>
      </main>
      {vista === 'fuentes' && <footer>
        Datos de organismos públicos, de gestión de cuencas e instituciones científicas de Australia (ver “Fuentes”).
        Ubicaciones de regiones, zonas y esquemas: aproximadas.
      </footer>}
    </div>
  )
}
