import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, LabelList, Cell,
} from 'recharts'
import MapaCuenca from '../MapaCuenca'
import { morganExcedencia, morganModelado, sisEsquemas2122 } from '../../data/series'
import { sitiosMeta } from '../../data/geo'
import { fmt } from '../escala'

export const EJES = {
  0: { nombre: '', color: '#1f3864' },
  1: { nombre: 'Caracterización del caso', color: '#2563eb' },
  2: { nombre: 'Actores sociales, económicos e institucionales', color: '#d97706' },
  4: { nombre: 'Marco legal y gestión de la cuenca', color: '#059669' },
  5: { nombre: 'Aplicaciones de la Ingeniería Informática', color: '#7c3aed' },
  6: { nombre: 'Propuesta tecnológica', color: '#db2777' },
}

const ROJO = '#c62828'

// ---------- Piezas reutilizables ----------

function Dato({ valor, texto, color }) {
  return (
    <div className="dato-grande" style={color ? { '--c': color } : undefined}>
      <strong>{valor}</strong>
      <span>{texto}</span>
    </div>
  )
}

function Flujo({ pasos, numerado = true }) {
  return (
    <ol className={`flujo ${numerado ? '' : 'sin-numero'}`}>
      {pasos.map((p, i) => (
        <li key={p.titulo}>
          {numerado && <span className="flujo-num">{i + 1}</span>}
          <strong>{p.titulo}</strong>
          {p.texto && <span>{p.texto}</span>}
        </li>
      ))}
    </ol>
  )
}

function Estado({ icono, tono, titulo, valor, detalle }) {
  return (
    <div className={`estado-fila tono-${tono}`}>
      <span className="estado-icono">{icono}</span>
      <div>
        <strong>{titulo}</strong>
        <span className="estado-valor">{valor}</span>
        <small>{detalle}</small>
      </div>
    </div>
  )
}

const ejeX = { fontSize: '0.75em', fill: '#334155' }
const ejeY = { fontSize: '0.72em', fill: '#64748b' }

// ---------- Diapositivas ----------

export const DIAPOSITIVAS = [
  {
    eje: 0, tipo: 'portada', titulo: 'Portada',
    notas: [
      'Presentar al grupo y el caso: salinización del agua y los suelos en la cuenca Murray-Darling (Australia).',
      'Recorrido: el caso y su evolución, los actores, la gestión, la tecnología aplicada y nuestra propuesta.',
      'Aclarar que la app que se muestra es nuestra: reúne datos de organismos australianos y la usamos durante la exposición.',
    ],
    Contenido: () => (
      <div className="portada">
        <svg className="portada-rio" viewBox="0 0 800 200" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 150 C 120 60, 200 190, 320 120 S 520 40, 620 110 S 760 150, 800 70" fill="none" stroke="#80bf82" strokeWidth="10" strokeLinecap="round" opacity=".9" />
          <path d="M0 150 C 120 60, 200 190, 320 120 S 520 40, 620 110 S 760 150, 800 70" fill="none" stroke="#e6c229" strokeWidth="3" strokeDasharray="2 22" strokeLinecap="round" />
        </svg>
        <p className="portada-pre">Tecnología y Medio Ambiente · Trabajo práctico integrador</p>
        <h1>Salinización en la cuenca Murray-Darling</h1>
        <p className="portada-sub">Cómo la sal llegó al río, quién la paga, cómo se gestiona y qué puede aportar la Ingeniería Informática</p>
        <div className="portada-ejes">
          {[1, 2, 4, 5, 6].map((e) => <span key={e} style={{ '--c': EJES[e].color }}>Eje {e} · {EJES[e].nombre}</span>)}
        </div>
      </div>
    ),
  },

  {
    eje: 1, titulo: 'La cuenca en números', bajada: 'El sistema fluvial más importante de Australia y su principal región agrícola',
    notas: [
      '1,06 millones de km², cerca del 14% de Australia: más de un tercio de la superficie de Argentina.',
      'Cuatro estados y el territorio de la capital comparten el mismo sistema de ríos: por eso la gestión tiene que ser coordinada.',
      'La producción (cereales, lácteos, vid, cítricos) depende del riego, y el riego es parte del problema.',
      'Dato clave: cerca del 70% de la sal del Murray viene de dos regiones del sur, las Riverine Plains y el Mallee.',
    ],
    Contenido: () => (
      <div className="dos-columnas centrada">
        <div className="grilla-datos">
          <Dato valor="1,06 M km²" texto="de superficie, cerca del 14% de Australia" />
          <Dato valor="4 + 1" texto="estados (Qld, NSW, Vic, SA) y el Territorio de la Capital" />
          <Dato valor="~70 %" texto="de la sal del Murray proviene de las Riverine Plains y el Mallee" color={ROJO} />
          <Dato valor="800 EC" texto="límite de salinidad en Morgan, donde se toma agua para Adelaida" color={ROJO} />
        </div>
        <div className="caja">
          <h3>Ríos principales</h3>
          <p><b>Murray</b>: nace en los Alpes de Victoria y desemboca en el océano Austral, en Australia del Sur.</p>
          <p><b>Darling</b>: nace en Queensland y aporta desde el norte.</p>
          <p className="chips">
            {['Murrumbidgee', 'Lachlan', 'Macquarie', 'Barwon', 'Warrego', 'Balonne', 'Goulburn'].map((r) => <span key={r}>{r}</span>)}
          </p>
          <h3>Producción</h3>
          <p className="chips">
            {['Cereales', 'Lácteos', 'Viñedos', 'Cítricos', 'Horticultura', 'Algodón', 'Arroz'].map((r) => <span key={r}>{r}</span>)}
          </p>
        </div>
      </div>
    ),
  },

  {
    eje: 1, tipo: 'mapa', titulo: 'Delimitación geográfica y zonas afectadas',
    notas: [
      'Mostrar el límite de la cuenca y los ríos. El color indica la salinidad de cada río (auditoría de 1999).',
      'Activar "Zonas con problema de salinidad": Mallee, Riverine Plains, Riverland y Lower Lakes, todas en el sur.',
      'Activar "Regiones de riego" para mostrar que coinciden con las zonas salinas.',
      'Los puntos violeta son los esquemas que bombean agua salada antes de que llegue al río (se retoman en el eje 5).',
      'Opcional: cambiar el año a 2050 o 2100 para mostrar lo que se temía en 1999 sin nuevas medidas.',
    ],
    Contenido: () => <div className="diap-mapa"><MapaCuenca /></div>,
  },

  {
    eje: 1, titulo: 'Cómo llega la sal al río', bajada: 'Salinización secundaria: la actividad humana acelera un proceso natural',
    notas: [
      'La sal ya estaba en el subsuelo: Australia es antigua, llana y semiárida, y la sal se acumuló durante miles de años.',
      'Lo que cambió fue el agua: al reemplazar árboles de raíz profunda por cultivos y riego, entra más agua al subsuelo.',
      'La napa sube, disuelve la sal y la arrastra hacia la superficie y los ríos.',
      'Remarcar el desfase: el efecto tarda décadas. La sal que llega hoy viene de decisiones de hace 50 años.',
    ],
    Contenido: () => (
      <>
        <Flujo pasos={[
          { titulo: 'Desmonte', texto: 'Se elimina vegetación nativa de raíz profunda' },
          { titulo: 'Más infiltración', texto: 'Cultivos y riego dejan pasar más agua al subsuelo' },
          { titulo: 'Sube la napa', texto: 'El agua subterránea disuelve sales acumuladas' },
          { titulo: 'La sal migra', texto: 'Por la napa, la escorrentía y filtraciones' },
          { titulo: 'Llega al río', texto: 'Aumenta la salinidad aguas abajo' },
        ]} />
        <div className="factores">
          {[
            ['Productivos', 'desmonte, riego y drenajes salinos'],
            ['Hidrológicos', 'extracción de agua, embalses y barreras'],
            ['Climáticos', 'sequías, calor y evaporación'],
            ['Territoriales', 'relieve llano y clima semiárido'],
          ].map(([t, x]) => <div key={t}><strong>{t}</strong><span>{x}</span></div>)}
        </div>
        <p className="remate">Los efectos tardan <b>décadas</b> en aparecer: la sal que llega hoy viene de decisiones del pasado.</p>
      </>
    ),
  },

  {
    eje: 1, titulo: 'Evolución: de problema crónico a meta cumplida', bajada: 'Porcentaje del tiempo en que la salinidad en Morgan superó 800 EC',
    notas: [
      'Entre 1975 y 1985, Morgan superó el límite de 800 EC el 40% del tiempo. Es el punto donde se toma agua para Adelaida.',
      'Desde 1988 hay estrategias conjuntas: interceptación de sales, zonificación del riego y créditos y débitos.',
      'En las últimas ventanas de 25 años, ningún día superó 800 EC.',
      'Contraste: en 1999 se proyectaban 670 EC para 2020 si no se hacía nada; el promedio medido en 2019-20 fue 234 EC.',
      'Ojo: parte de la mejora también depende de que haya agua para diluir (años húmedos).',
    ],
    Contenido: () => (
      <div className="dos-columnas grafico-y-datos">
        <div className="grafico">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={morganExcedencia.datos} margin={{ top: 28, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="periodo" tick={ejeX} interval={0} angle={-20} textAnchor="end" height={60} />
              <YAxis unit="%" tick={ejeY} />
              <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                {morganExcedencia.datos.map((d) => <Cell key={d.periodo} fill={d.pct >= 20 ? ROJO : d.pct > 0 ? '#f07f2e' : '#059669'} />)}
                <LabelList dataKey="pct" position="top" formatter={(v) => `${v}%`} style={{ fontSize: '0.85em', fontWeight: 700 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="columna-datos">
          <Dato valor="40 % → 0 %" texto="del tiempo sobre 800 EC en Morgan (1975–1985 frente a 1999–2024)" color="#059669" />
          <Dato valor="670 vs. 234 EC" texto="proyección de 1999 para 2020 sin medidas, frente al promedio medido en 2019-20" />
          <Dato valor="Casi nula" texto="la sal exportada al mar en lo peor de la Sequía del Milenio" color={ROJO} />
        </div>
      </div>
    ),
  },

  {
    eje: 2, titulo: 'Río arriba se gana, río abajo se paga', bajada: 'Quien genera la sal no es quien sufre sus efectos',
    notas: [
      'Río arriba (Nueva Gales del Sur, Victoria, Queensland): los productores obtienen el beneficio del riego, pero sus drenajes cargan sal al río.',
      'Río abajo (Australia del Sur): Adelaida, SA Water, los regantes del Riverland y los humedales reciben el agua más salada y pagan los costos.',
      'En el medio, los gobiernos y la MDBA regulan; pueblos originarios y ambientalistas reclaman caudales para los ecosistemas; los científicos aportan los datos.',
      'Segundo conflicto: producción contra ambiente. Recortar riego para diluir la sal protege el río pero afecta la rentabilidad agrícola.',
    ],
    Contenido: () => (
      <div className="actores">
        <div className="actor-regula">
          <strong>Gobiernos federal y estatales · MDBA</strong>
          <span>Legislan, fijan límites de extracción y controlan la salinidad</span>
        </div>
        <div className="actores-rio">
          <div className="actor-lado arriba">
            <span className="lado-etiqueta">Río arriba · NSW, Victoria, Queensland</span>
            <strong>Productores y empresas de riego</strong>
            <span className="ganan">Beneficio: riego, producción y empleo</span>
            <span>Desmonte y drenajes movilizan la sal</span>
          </div>
          <div className="rio-flecha">
            <span>SAL</span>
            <svg viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 30 C 60 5, 120 55, 180 30 S 260 10, 285 30" fill="none" stroke="#2b83ba" strokeWidth="14" strokeLinecap="round" />
              <path d="M270 12 L298 30 L270 48 Z" fill="#2b83ba" />
            </svg>
          </div>
          <div className="actor-lado abajo">
            <span className="lado-etiqueta">Río abajo · Australia del Sur</span>
            <strong>Adelaida, SA Water, regantes y humedales</strong>
            <span className="pagan">Costo: agua más salada, potabilización y cañerías</span>
            <span>Daño en cultivos, humedales y pesca</span>
          </div>
        </div>
        <div className="actores-otros">
          <div><strong>Pueblos originarios y ambientalistas</strong><span>MLDRIN y NBAN reclaman caudales culturales y la protección de humedales</span></div>
          <div><strong>Instituciones científicas y tecnológicas</strong><span>CSIRO, universidades y empresas aportan sensores, modelos y monitoreo satelital</span></div>
        </div>
      </div>
    ),
  },

  {
    eje: 2, titulo: 'Cómo se resuelve el conflicto', bajada: 'Tres mecanismos que reparten responsabilidades entre estados',
    notas: [
      'Regulación federal: la Water Act 2007 y el Basin Plan 2012 obligan a todos los estados a respetar límites de extracción.',
      'Créditos y débitos: si un estado suma sal al río (un riego nuevo), anota un débito y debe compensarlo con obras que la reduzcan. El que contamina, paga.',
      'Meta en Morgan: menos de 800 EC el 95% del tiempo, más consejos asesores donde negocian productores y pueblos originarios.',
    ],
    Contenido: () => (
      <div className="tres-columnas">
        <div className="tarjeta-diap">
          <span className="tarjeta-num">1</span>
          <h3>Regulación federal</h3>
          <p><b>Water Act 2007</b> y <b>Basin Plan 2012</b>: límites de extracción basados en evidencia científica, obligatorios para todos los estados.</p>
        </div>
        <div className="tarjeta-diap destacada">
          <span className="tarjeta-num">2</span>
          <h3>Créditos y débitos de salinidad</h3>
          <div className="balanza">
            <div className="debito"><b>Débito</b><span>Nuevo riego: +EC al río</span></div>
            <span className="igual">=</span>
            <div className="credito"><b>Crédito</b><span>Interceptación o reforestación: −EC</span></div>
          </div>
          <p>Quien genera el impacto financia su compensación (estrategia BSM2030).</p>
        </div>
        <div className="tarjeta-diap">
          <span className="tarjeta-num">3</span>
          <h3>Meta común y participación</h3>
          <p>Morgan por debajo de <b>800 EC el 95% del tiempo</b>, y consejos asesores donde productores y pueblos originarios negocian antes de escalar conflictos.</p>
        </div>
      </div>
    ),
  },

  {
    eje: 4, titulo: 'Marco legal: tres instrumentos y metas medibles', bajada: 'Topes de salinidad del Basin Plan, ordenados río abajo',
    notas: [
      'La Water Act 2007 crea la MDBA y ordena el Basin Plan. El Basin Plan 2012 fija los objetivos y, en su capítulo 9, las metas de salinidad.',
      'BSM2030 (2015) es la estrategia con la que los gobiernos gestionan esas metas: interceptación, créditos y débitos, metas de fin de valle.',
      'Los topes crecen río abajo porque el agua suma sal en su recorrido. Morgan importa porque ahí se toma agua para Adelaida.',
      'También hay que sacar sal al mar: 2 millones de toneladas por año en promedio de 3 años, para que no se acumule.',
    ],
    Contenido: () => {
      const murray = sitiosMeta.filter((s) => !s.nombre.startsWith('Burtundy'))
      return (
        <div className="dos-columnas grafico-y-datos">
          <div>
            <Flujo numerado={false} pasos={[
              { titulo: '2007 · Water Act', texto: 'Crea la MDBA y ordena un plan para toda la cuenca' },
              { titulo: '2012 · Basin Plan', texto: 'Objetivos y metas de salinidad (cap. 9)' },
              { titulo: '2015 · BSM2030', texto: 'Estrategia conjunta para gestionarlas' },
            ]} />
            <div className="grafico grafico-bajo">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={murray} margin={{ top: 26, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="nombre" tick={ejeX} interval={0} tickFormatter={(n) => n.replace(' (Lower Lakes)', '')} />
                  <YAxis tick={ejeY} domain={[0, 1100]} />
                  <Bar dataKey="meta" fill="#059669" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="meta" position="top" formatter={(v) => `${fmt(v)} EC`} style={{ fontSize: '0.85em', fontWeight: 700 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="columna-datos">
            <Dato valor="95 %" texto="del tiempo debe cumplirse cada tope; se evalúa sobre los últimos 5 años" color="#059669" />
            <Dato valor="2 Mt/año" texto="de sal a exportar al mar, en promedio de 3 años" color="#059669" />
            <Dato valor="< 800 EC" texto="en Morgan el 95% de los días, simulado con el clima de 1975–2000: mide el efecto de la gestión" color="#059669" />
          </div>
        </div>
      )
    },
  },

  {
    eje: 4, titulo: '¿Funciona la gestión?', bajada: 'Percentil 95 simulado en Morgan con el mismo clima y las medidas de cada año · línea roja: meta de 800 EC',
    notas: [
      'El modelo repite siempre el clima de 1975–2000 y solo cambia las obras y medidas: así se aísla el efecto de la gestión.',
      'Con las medidas de 1988, Morgan superaba 800 EC el 28% del tiempo; con las de 2024, el 3%. El percentil 95 bajó de 1.058 a 786 EC.',
      'Pero no todo está resuelto: Burtundy, en el río Darling, no cumplió su meta entre 2019 y 2024, y Milang superó 1.200 EC en junio de 2025.',
      'Las estrategias: interceptación de sales, riego eficiente con zonificación, revegetación (con pocos resultados) y caudales de dilución.',
    ],
    Contenido: () => (
      <div className="dos-columnas grafico-y-datos">
        <div className="grafico">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={morganModelado.datos} margin={{ top: 28, right: 10, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="condicion" tick={ejeX} tickFormatter={(c) => `Medidas ${c}`} />
              <YAxis tick={ejeY} domain={[0, 1200]} />
              <ReferenceLine y={800} stroke={ROJO} strokeDasharray="6 4" strokeWidth={2} />
              <Bar dataKey="p95" radius={[4, 4, 0, 0]}>
                {morganModelado.datos.map((d) => <Cell key={d.condicion} fill={d.p95 > 800 ? ROJO : '#059669'} />)}
                <LabelList dataKey="p95" position="top" formatter={(v) => `${fmt(v)} EC`} style={{ fontSize: '0.85em', fontWeight: 700 }} />
                <LabelList dataKey="pct" position="center" formatter={(v) => `${v}% > 800`} style={{ fontSize: '0.8em', fill: '#fff', fontWeight: 600 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="columna-datos">
          <Estado icono="✓" tono="ok" titulo="Morgan (medido)" valor="346 EC" detalle="promedio 2023-24, ningún día sobre 800" />
          <Estado icono="✓" tono="ok" titulo="Exportación de sal" valor="2,11 Mt/año" detalle="promedio 2022–2025, sobre el objetivo de 2" />
          <Estado icono="✕" tono="mal" titulo="Burtundy (río Darling)" valor="8,5% sobre 830 EC" detalle="2019–2024, pico de 1.238 EC" />
          <Estado icono="!" tono="alerta" titulo="Milang (Lower Lakes)" valor="> 1.200 EC" detalle="desde junio de 2025, por ingreso de agua de mar" />
        </div>
      </div>
    ),
  },

  {
    eje: 4, titulo: 'Quién hace qué y por qué cuesta coordinar',
    notas: [
      'Las funciones están repartidas: la MDBA planifica y modela, los estados ejecutan y miden, y organismos independientes auditan.',
      'La gran dificultad es la de aguas arriba y aguas abajo: una externalidad entre estados.',
      'Desfase: la sal de desmontes y riegos pasados sigue llegando. Y como las metas y los créditos se calculan con modelos, todos los estados tienen que aceptar los mismos modelos.',
      'Confianza: en 2019 la Comisión Real de Australia del Sur concluyó que la MDBA actuó ilegalmente; en 2023 la Productivity Commission pidió más rendición de cuentas.',
    ],
    Contenido: () => (
      <>
        <div className="funciones">
          {[
            ['Planificación', 'Consejo Ministerial · MDBA'],
            ['Monitoreo', 'MDBA · Estados · Bureau of Meteorology'],
            ['Control', 'Basin Officials Committee · Panel asesor de salinidad · Inspector-General'],
            ['Evaluación', 'Grupo de auditoría independiente · Productivity Commission'],
          ].map(([f, o]) => <div key={f}><strong>{f}</strong><span>{o}</span></div>)}
        </div>
        <div className="dificultades">
          {[
            ['↔', 'Externalidad', 'El desmonte y el riego río arriba salinizan el agua de río abajo.'],
            ['⏳', 'Desfase temporal', 'La sal movilizada hace décadas sigue llegando hoy.'],
            ['∑', 'Modelos compartidos', 'Metas y créditos se calculan con modelos que todos deben aceptar.'],
            ['☀', 'Clima', 'Se proyecta una cuenca más cálida y con sequías más frecuentes hacia 2050.'],
          ].map(([i, t, x]) => <div key={t}><span className="dif-icono">{i}</span><strong>{t}</strong><span>{x}</span></div>)}
        </div>
      </>
    ),
  },

  {
    eje: 5, titulo: 'Medir directo o detectar indirecto', bajada: 'Dos tecnologías complementarias para seguir la salinidad',
    notas: [
      'Sensores: sondas que miden conductividad, temperatura y nivel; compensan la medición a 25 °C y transmiten por telemetría. Son la base para verificar la meta de Morgan.',
      'Con sus datos se decide cuándo liberar agua de los embalses para diluir un pico de sal antes de que llegue a las tomas.',
      'Satélites (Landsat, Sentinel-2) con SIG: índices como NDVI o NDSI detectan síntomas en superficie, como vegetación estresada o costras de sal.',
      'Con eso se zonifica el riego en áreas de alto y bajo impacto. No miden la sal en profundidad: hay que validar con muestras de campo.',
    ],
    Contenido: () => (
      <div className="comparacion">
        <div className="comp-col">
          <span className="comp-tag">Medición directa</span>
          <h3>Sensores IoT y SCADA</h3>
          <dl>
            <dt>Mide</dt><dd>Conductividad eléctrica, temperatura y nivel, en tiempo real</dd>
            <dt>Decide</dt><dd>Cuándo liberar caudales de dilución desde los embalses</dd>
            <dt>Límite</dt><dd>Es puntual; corrosión y algas obligan a calibrar seguido</dd>
          </dl>
          <p className="comp-lema">“Ver el árbol”</p>
        </div>
        <div className="comp-vs">vs.</div>
        <div className="comp-col">
          <span className="comp-tag">Detección indirecta</span>
          <h3>Satélites y SIG</h3>
          <dl>
            <dt>Mide</dt><dd>Síntomas en superficie con índices NDVI y NDSI (Landsat, Sentinel-2)</dd>
            <dt>Decide</dt><dd>Zonas de riego de alto y bajo impacto salino</dd>
            <dt>Límite</dt><dd>Nubes y falsos positivos: hay que validar con muestras de campo</dd>
          </dl>
          <p className="comp-lema">“Ver el bosque”</p>
        </div>
      </div>
    ),
  },

  {
    eje: 5, titulo: 'La informática detrás de la interceptación de sales', bajada: 'Pozos que bombean agua subterránea salada antes de que llegue al río',
    notas: [
      'Hacia 2020 había 15 esquemas con unos 300 pozos que desvían alrededor de 400.000 toneladas de sal por año.',
      'Tres usos de la informática: modelos de agua subterránea (como MODFLOW) para decidir dónde perforar; SCADA para operar las bombas; balance de masa para calcular los créditos de cada estado.',
      'El gráfico muestra lo salada que es el agua que se bombea: entre 5.300 y 80.800 EC, hasta 100 veces el límite de Morgan.',
    ],
    Contenido: () => (
      <div className="dos-columnas grafico-y-datos">
        <div>
          <Flujo pasos={[
            { titulo: 'Dónde ubicarlo', texto: 'Modelos de agua subterránea (MODFLOW) simulan el bombeo' },
            { titulo: 'Cómo operarlo', texto: 'SCADA enciende o apaga bombas según la napa' },
            { titulo: 'Cuánto rinde', texto: 'Balance de masa: toneladas evitadas = créditos' },
          ]} />
          <div className="grilla-datos tres">
            <Dato valor="15" texto="esquemas conjuntos" color="#7c3aed" />
            <Dato valor="~300" texto="pozos" color="#7c3aed" />
            <Dato valor="400.000 t" texto="de sal desviadas por año (aprox.)" color="#7c3aed" />
          </div>
        </div>
        <div className="grafico">
          <p className="grafico-titulo">Salinidad del agua bombeada por esquema, 2021-22 (EC)</p>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={sisEsquemas2122.datos} layout="vertical" margin={{ top: 0, right: 60, left: 10, bottom: 0 }}>
              <XAxis type="number" hide domain={[0, 90000]} />
              <YAxis type="category" dataKey="esquema" width={150} tick={ejeX} interval={0} />
              <Tooltip formatter={(v) => [`${fmt(v)} EC`, 'Salinidad']} />
              <ReferenceLine x={800} stroke={ROJO} strokeWidth={2} />
              <Bar dataKey="ec" fill="#7c3aed" radius={[0, 4, 4, 0]}>
                <LabelList dataKey="ec" position="right" formatter={(v) => fmt(v)} style={{ fontSize: '0.75em' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    ),
  },

  {
    eje: 6, tipo: 'destacada', titulo: 'MDB-SalinityWatch', bajada: 'Plataforma integrada de monitoreo y alerta temprana de salinidad',
    notas: [
      'Problema: los datos están dispersos entre estados y organismos; no se cruza en tiempo real lo que pasa con el riego río arriba con la calidad del agua días después río abajo.',
      'Entradas: estaciones telemétricas (EC, caudal, napas), imágenes satelitales, clima y registros de riego.',
      'Procesamiento: un pipeline ETL estandariza unidades y marca datos faltantes; un motor geoespacial cruza capas; un modelo de machine learning estima el riesgo a 7, 15 y 30 días.',
      'Salidas: mapas de riesgo, alertas y reportes de balance salino. Cada usuario la usa distinto.',
    ],
    Contenido: () => (
      <>
        <div className="arquitectura">
          <div className="arq-col">
            <h3>Entradas</h3>
            <ul>
              <li>Estaciones telemétricas: EC, caudal y napas</li>
              <li>Imágenes satelitales Sentinel-2 y Landsat</li>
              <li>Clima y registros de riego</li>
            </ul>
          </div>
          <div className="arq-flecha">→</div>
          <div className="arq-col central">
            <h3>Procesamiento</h3>
            <ul>
              <li>ETL: limpia y estandariza unidades</li>
              <li>Motor geoespacial: cruza suelo y napas</li>
              <li>Machine learning: riesgo a 7, 15 y 30 días</li>
            </ul>
          </div>
          <div className="arq-flecha">→</div>
          <div className="arq-col">
            <h3>Salidas</h3>
            <ul>
              <li><span className="semaforo"><i style={{ background: '#059669' }} /><i style={{ background: '#e6c229' }} /><i style={{ background: ROJO }} /></span>Mapas de riesgo</li>
              <li>Alertas automáticas</li>
              <li>Reportes de balance salino</li>
            </ul>
          </div>
        </div>
        <div className="usuarios">
          {[
            ['Productores', 'cuándo y cuánto regar'],
            ['MDBA y organismos', 'metas, interceptación y caudales'],
            ['SA Water', 'aviso anticipado de picos de sal'],
            ['Investigadores', 'series históricas estandarizadas'],
          ].map(([u, x]) => <div key={u}><strong>{u}</strong><span>{x}</span></div>)}
        </div>
      </>
    ),
  },

  {
    eje: 6, tipo: 'destacada', titulo: 'Tecnologías, evaluación y límites',
    notas: [
      'Tecnologías: MQTT y APIs REST para recibir datos, Python para procesar y predecir, PostgreSQL con PostGIS, Google Earth Engine para los índices satelitales, y React con Leaflet para la visualización.',
      'Esta misma app es un prototipo de la capa de visualización: mapa, series históricas y estado de las metas.',
      'Indicadores: error de la predicción a 15 días, cobertura y latencia de los datos, adopción por usuarios e impacto en los picos de Morgan.',
      'Límites: no reemplaza los muestreos de campo ni elimina sal; depende de que los estados compartan datos y de que la información se use para decidir.',
    ],
    Contenido: () => (
      <div className="dos-columnas centrada">
        <div>
          <h3 className="subtitulo">Tecnologías</h3>
          <div className="stack">
            {[
              ['Ingesta', 'MQTT · APIs REST'],
              ['Procesamiento', 'Python · Pandas · GeoPandas · scikit-learn'],
              ['Datos', 'PostgreSQL + PostGIS'],
              ['Satélites', 'Google Earth Engine'],
              ['Visualización', 'React · Leaflet · Grafana'],
            ].map(([c, t]) => <div key={c}><span>{c}</span><strong>{t}</strong></div>)}
          </div>
          <p className="prototipo">Esta app es un prototipo de la capa de visualización de la propuesta.</p>
        </div>
        <div>
          <h3 className="subtitulo">Cómo sabremos si funciona</h3>
          <div className="indicadores">
            {[
              ['Precisión', 'Error (RMSE) entre la EC predicha y la medida a 15 días'],
              ['Datos', '% de estaciones activas y latencia de las alertas'],
              ['Adopción', 'Hectáreas gestionadas con la plataforma y % de alertas atendidas'],
              ['Impacto', 'Reducción de los picos de EC en Morgan'],
            ].map(([t, x]) => <div key={t}><strong>{t}</strong><span>{x}</span></div>)}
          </div>
          <p className="remate pequeño">No reemplaza las muestras de campo ni elimina sal: indica <b>dónde medir</b> y <b>cuándo actuar</b>.</p>
        </div>
      </div>
    ),
  },

  {
    eje: 0, tipo: 'portada cierre', titulo: 'Conclusiones',
    notas: [
      'Retomar las tres ideas y abrir a preguntas.',
      'Si preguntan por datos, volver a la app: pestañas Evolución y Estado actual.',
    ],
    Contenido: () => (
      <div className="portada">
        <h1>Conclusiones</h1>
        <ol className="conclusiones">
          <li><b>La gestión coordinada funcionó en el río:</b> con el mismo clima, Morgan pasó de 1.058 a 786 EC, pero la sal heredada, las sequías y los incumplimientos en el Darling y los Lower Lakes mantienen el riesgo.</li>
          <li><b>Es un problema de coordinación:</b> quien genera la sal no la sufre, y los créditos y débitos hacen que cada estado se haga cargo de su parte.</li>
          <li><b>La informática integra y anticipa:</b> sensores, satélites y modelos dan la evidencia, y MDB-SalinityWatch la convierte en alertas para decidir a tiempo.</li>
        </ol>
        <p className="preguntas">¿Preguntas?</p>
      </div>
    ),
  },
]
