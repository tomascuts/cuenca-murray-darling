import { useState } from 'react'
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, ComposedChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ReferenceLine, LabelList, Cell,
} from 'recharts'
import {
  morganAnual, morganVentanas, morganExcedencia, morganModelado, auditoria1999, exportacion, sisCuenca,
  sisEsquemas2122, napasSA, riesgoSecano, datosPuntuales,
} from '../data/series'
import { colorEC, fmt } from './escala'
import TipoDato from './TipoDato'

const ALTO = 300

function Tarjeta({ titulo, pregunta, tipo, children }) {
  return (
    <article className="tarjeta">
      <h3>{titulo} <TipoDato tipo={tipo} /></h3>
      {pregunta && <p className="pregunta">{pregunta}</p>}
      {children}
    </article>
  )
}

// Serie anual de Morgan con años sin dato como null, para no unir puntos lejanos.
function serieMorgan() {
  const porFin = Object.fromEntries(morganAnual.datos.map((d) => [Number(d.anio.slice(0, 4)) + 1, d]))
  const out = []
  for (let y = 2007; y <= 2024; y++) {
    const d = porFin[y]
    out.push({ fin: y, anio: d?.anio ?? `${y - 1}-${String(y).slice(2)}`, prom: d?.prom ?? null, p95: d?.p95 ?? null, max: d?.max ?? null })
  }
  return out
}

function Puntuales({ area }) {
  return (
    <div className="puntuales">
      {datosPuntuales.filter((d) => d.area === area).map((d) => (
        <div key={d.valor} className="dato">
          <strong>{d.valor}</strong>
          <span>{d.texto} <TipoDato tipo={d.tipo} /></span>
        </div>
      ))}
    </div>
  )
}

function Conversor() {
  const [ec, setEc] = useState(800)
  return (
    <div className="conversor">
      <label>
        EC (µS/cm){' '}
        <input type="number" min="0" value={ec} onChange={(e) => setEc(Number(e.target.value))} />
      </label>
      <span>≈ <b>{fmt(ec * 0.55)} mg/L</b> de sales disueltas (factor 0,55 para agua del Murray; varía entre 0,5 y 0,7 según la fuente de agua).</span>
    </div>
  )
}

export default function Evolucion() {
  const [rioSel, setRioSel] = useState(0)
  const rio = auditoria1999.rios[rioSel]
  const datosRio = auditoria1999.anios.map((a, i) => ({ anio: a, ec: rio.v[i] }))
  const datosExport = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map((fin) => ({
    fin,
    tres: exportacion.tresAnios.datos.find((d) => d.fin === fin)?.mt ?? null,
    anual: exportacion.anual.datos.find((d) => d.fin === fin)?.mt ?? null,
  }))

  return (
    <section className="vista-evolucion">
      <p className="intro">
        Evolución de la salinidad en agua superficial, agua subterránea y suelos. La etiqueta de cada gráfico indica si
        el dato es <b>medido</b>, <b>modelado</b> o una <b>proyección</b>. La salinidad del agua se expresa en EC
        (conductividad eléctrica, µS/cm). Las fuentes de cada dato están en la pestaña “Fuentes”.
      </p>

      <h2 id="superficial">1. Agua superficial</h2>
      <div className="grilla">
        <Tarjeta tipo="medido" titulo="Morgan: cuánto tiempo se superaron los 800 EC" pregunta="¿Cómo cambió el problema desde los años 70?">
          <ResponsiveContainer width="100%" height={ALTO}>
            <BarChart data={morganExcedencia.datos} margin={{ top: 20, right: 10, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="periodo" angle={-30} textAnchor="end" interval={0} fontSize={11} height={50} />
              <YAxis unit="%" fontSize={12} />
              <Tooltip formatter={(v) => [`${v}% del tiempo`, 'EC > 800']} />
              <Bar dataKey="pct" name="% del tiempo con EC > 800" fill="#c62828">
                <LabelList dataKey="pct" position="top" formatter={(v) => `${v}%`} fontSize={11} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Tarjeta>

        <Tarjeta tipo="medido" titulo="Morgan: salinidad media y percentil 95 en ventanas de 25 años" pregunta="¿Bajó la salinidad del río de forma sostenida?">
          <ResponsiveContainer width="100%" height={ALTO}>
            <BarChart data={morganVentanas.datos} margin={{ top: 20, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="periodo" fontSize={11} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v, n) => [`${fmt(v)} EC`, n]} />
              <Legend />
              <ReferenceLine y={800} stroke="#c62828" strokeDasharray="5 3" label={{ value: '800 EC', position: 'insideTopRight', fontSize: 11, fill: '#c62828' }} />
              <Bar dataKey="prom" name="Promedio" fill="#2b83ba" />
              <Bar dataKey="p95" name="Percentil 95" fill="#1f3864" />
            </BarChart>
          </ResponsiveContainer>
        </Tarjeta>

        <Tarjeta tipo="medido" titulo="Morgan: estadísticos de cada año hidrológico" pregunta="¿Cuál es el estado reciente?">
          <ResponsiveContainer width="100%" height={ALTO}>
            <LineChart data={serieMorgan()} margin={{ top: 20, right: 15, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fin" type="number" domain={[2007, 2024]} ticks={[2007, 2010, 2013, 2016, 2019, 2022, 2024]} fontSize={12}
                tickFormatter={(y) => `${y - 1}-${String(y).slice(2)}`} />
              <YAxis domain={[0, 900]} fontSize={12} />
              <Tooltip labelFormatter={(y) => `Año hidrológico ${y - 1}-${String(y).slice(2)}`} formatter={(v, n) => [`${fmt(v)} EC`, n]} />
              <Legend />
              <ReferenceLine y={800} stroke="#c62828" strokeDasharray="5 3" label={{ value: 'Meta: 800 EC (p95)', position: 'insideTopRight', fontSize: 11, fill: '#c62828' }} />
              <Line dataKey="max" name="Máximo" stroke="#f07f2e" dot={{ r: 3 }} connectNulls={false} />
              <Line dataKey="p95" name="Percentil 95" stroke="#1f3864" dot={{ r: 3 }} connectNulls={false} />
              <Line dataKey="prom" name="Promedio" stroke="#2b83ba" dot={{ r: 3 }} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="ayuda">Los años sin punto no tienen un valor publicado en las fuentes consultadas (por ejemplo, 2007-08 a 2014-15).</p>
        </Tarjeta>

        <Tarjeta tipo="modelado" titulo="Efecto de la gestión con el clima fijo (modelo)" pregunta="¿Cuánto se debe a las medidas y no a años húmedos?">
          <ResponsiveContainer width="100%" height={ALTO}>
            <BarChart data={morganModelado.datos} margin={{ top: 20, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="condicion" tickFormatter={(c) => `Medidas de ${c}`} fontSize={12} />
              <YAxis domain={[0, 1200]} fontSize={12} />
              <Tooltip formatter={(v, n) => [`${fmt(v)} EC`, n]} labelFormatter={(c) => `Desarrollo y medidas de ${c}, clima 1975–2000`} />
              <ReferenceLine y={800} stroke="#c62828" strokeDasharray="5 3" label={{ value: 'Meta 800 EC', position: 'insideBottomLeft', fontSize: 11, fill: '#c62828' }} />
              <Bar dataKey="p95" name="Percentil 95 simulado" fill="#7c3aed">
                <LabelList dataKey="p95" position="top" formatter={(v) => `${fmt(v)} EC`} fontSize={11} />
                <LabelList dataKey="pct" position="center" formatter={(v) => `${v}% del tiempo > 800`} fontSize={11} fill="#fff" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="ayuda">Con el mismo clima, pasar de las condiciones de 1988 a las de 2024 baja el percentil 95 de 1.058 a 786 EC: ese es el efecto atribuible a la gestión.</p>
        </Tarjeta>

        <Tarjeta tipo="proyección" titulo="Auditoría de 1999: valor de 1998 y proyección sin nuevas medidas" pregunta="¿Qué se temía en 1999 para cada río?">
          <select value={rioSel} onChange={(e) => setRioSel(Number(e.target.value))}>
            {auditoria1999.rios.map((r, i) => <option key={r.rio} value={i}>{r.rio}</option>)}
          </select>
          <ResponsiveContainer width="100%" height={ALTO - 30}>
            <BarChart data={datosRio} margin={{ top: 20, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="anio" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v) => [`${fmt(v)} EC`, 'Salinidad media']} />
              <ReferenceLine y={800} stroke="#c62828" strokeDasharray="5 3" />
              <Bar dataKey="ec" name="EC">
                {datosRio.map((d) => <Cell key={d.anio} fill={colorEC(d.ec)} />)}
                <LabelList dataKey="ec" position="top" formatter={(v) => fmt(v)} fontSize={11} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {rioSel === 0 && <p className="aviso">Contraste: para 2020 se proyectaban 670 EC en Morgan; el promedio medido en 2019-20 fue 234 EC.</p>}
        </Tarjeta>

        <Tarjeta tipo="estimado" titulo="Sal exportada al mar frente al objetivo de 2 Mt por año" pregunta="¿Sale suficiente sal de la cuenca?">
          <ResponsiveContainer width="100%" height={ALTO}>
            <ComposedChart data={datosExport} margin={{ top: 20, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="fin" fontSize={12} tickFormatter={(y) => `${y - 1}-${String(y).slice(2)}`} />
              <YAxis unit=" Mt" fontSize={12} />
              <Tooltip formatter={(v, n) => [`${fmt(v, 2)} Mt/año`, n]} labelFormatter={(y) => `Año que termina en junio de ${y}`} />
              <Legend />
              <ReferenceLine y={2} stroke="#059669" strokeDasharray="5 3" label={{ value: 'Objetivo 2 Mt', position: 'insideTopLeft', fontSize: 11, fill: '#059669' }} />
              <Bar dataKey="tres" name="Promedio de 3 años (barreras)" fill="#2b83ba" />
              <Scatter dataKey="anual" name="Estimación anual (modelo MDBA)" fill="#f07f2e" />
            </ComposedChart>
          </ResponsiveContainer>
          <p className="ayuda">Antes de estos datos: entre 1996 y 2011 la exportación no alcanzó los 2 Mt anuales y fue casi nula en lo peor de la Sequía del Milenio.</p>
        </Tarjeta>
      </div>

      <h2 id="subterranea">2. Agua subterránea</h2>
      <div className="grilla">
        <Tarjeta tipo="medido" titulo="Sal interceptada por año (todos los esquemas conjuntos)" pregunta="¿Cuánta sal subterránea se evita que llegue al río?">
          <ResponsiveContainer width="100%" height={ALTO}>
            <BarChart data={sisCuenca.datos} margin={{ top: 20, right: 10, left: 10, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="anio" angle={-35} textAnchor="end" interval={0} fontSize={11} height={50} />
              <YAxis tickFormatter={(v) => `${v / 1000}k`} fontSize={12} />
              <Tooltip formatter={(v) => [v == null ? 'sin dato publicado' : `${fmt(v)} t`, 'Sal desviada']} />
              <Bar dataKey="t" name="Toneladas" fill="#7c3aed" />
            </BarChart>
          </ResponsiveContainer>
          <p className="ayuda">Los años sin barra no tienen el total de la cuenca en los informes consultados.</p>
        </Tarjeta>

        <Tarjeta tipo="medido" titulo="Salinidad del agua subterránea bombeada por cada esquema (2021-22)" pregunta="¿Qué tan salina es el agua de las napas junto al río?">
          <ResponsiveContainer width="100%" height={ALTO + 40}>
            <BarChart data={sisEsquemas2122.datos} layout="vertical" margin={{ top: 10, right: 40, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => `${v / 1000}k`} fontSize={12} />
              <YAxis type="category" dataKey="esquema" width={110} fontSize={11} />
              <Tooltip formatter={(v) => [`${fmt(v)} EC (${fmt(v / 800)} veces 800 EC)`, 'Salinidad media']} />
              <Bar dataKey="ec" fill="#4c1d95">
                <LabelList dataKey="ec" position="right" formatter={(v) => fmt(v)} fontSize={10} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="ayuda">El agua interceptada tiene entre 5.300 y 80.800 EC: de 7 a 100 veces el límite de 800 EC fijado para Morgan.</p>
        </Tarjeta>

        <Tarjeta tipo="medido" titulo="Tendencia de las napas en Australia del Sur" pregunta="¿Siguen subiendo las napas?">
          <ResponsiveContainer width="100%" height={ALTO}>
            <BarChart data={napasSA.datos} margin={{ top: 20, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="periodo" fontSize={12} />
              <YAxis unit="%" fontSize={12} domain={[0, 101]} ticks={[0, 25, 50, 75, 100]} allowDataOverflow />
              <Tooltip formatter={(v, n) => [`${v}% de los pozos`, n]} />
              <Legend />
              <Bar dataKey="sube" stackId="a" name="Napa en ascenso" fill="#c62828" />
              <Bar dataKey="estable" stackId="a" name="Estable" fill="#9aa5b1" />
              <Bar dataKey="baja" stackId="a" name="Napa en descenso" fill="#2b83ba" />
            </BarChart>
          </ResponsiveContainer>
          <p className="ayuda">El descenso en 2000–2008 coincide con la Sequía del Milenio y con mejoras en el riego; los datos no permiten separar ambos efectos.</p>
        </Tarjeta>

        <Tarjeta titulo="Datos clave sobre napas">
          <Puntuales area="napas" />
        </Tarjeta>
      </div>

      <h2 id="suelos">3. Suelos</h2>
      <div className="grilla">
        <Tarjeta tipo="proyección" titulo="Tierras agrícolas en zonas de alto riesgo de salinidad de secano (Australia)" pregunta="¿Cuánta tierra podría salinizarse?">
          <ResponsiveContainer width="100%" height={ALTO}>
            <BarChart data={riesgoSecano.datos} margin={{ top: 20, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="anio" fontSize={12} />
              <YAxis unit=" Mha" fontSize={12} />
              <Tooltip formatter={(v) => [`${fmt(v, 2)} millones de ha`, 'Superficie en riesgo']} />
              <Bar dataKey="mha" fill="#a16207">
                {riesgoSecano.datos.map((d, i) => <Cell key={d.anio} fill={i === 0 ? '#a16207' : '#d6a85b'} />)}
                <LabelList dataKey="mha" position="top" formatter={(v) => fmt(v, 2)} fontSize={11} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="aviso">Dato nacional: incluye la cuenca pero no se limita a ella. 2020 y 2050 son proyecciones de 2000.</p>
        </Tarjeta>

        <Tarjeta titulo="Datos clave sobre suelos">
          <Puntuales area="suelos" />
          <p className="ayuda">No se encontró una serie pública y continua de superficie salinizada dentro de la cuenca; por eso se muestran datos puntuales y no una curva.</p>
        </Tarjeta>

        <Tarjeta titulo="Costos y conversión de unidades">
          <Puntuales area="costos" />
          <Conversor />
        </Tarjeta>
      </div>
    </section>
  )
}
