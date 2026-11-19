# Plan: visor web de la cuenca Murray-Darling

Objetivo: app React estática, publicable en GitHub Pages, que muestre (1) la geografía de la cuenca y (2) la evolución de la salinidad, con la fuente de cada dato a la vista. Cubre los puntos 1 y 3 del Eje 1 del TPO.

## Stack
- Vite + React (JavaScript), sin backend.
- react-leaflet para el mapa (teselas de OpenStreetMap).
- Recharts para los gráficos.
- Datos en `public/data/` como GeoJSON y JSON, cargados con fetch.
- `vite.config.js` con `base: './'` y script `npm run deploy` con el paquete `gh-pages`.

## Estructura
```
src/
  App.jsx               navegación por pestañas
  components/
    MapaCuenca.jsx      mapa con capas activables
    Evolucion.jsx       gráficos de series
    LineaTiempo.jsx     hitos 1960 -> hoy
    EstadoActual.jsx    tarjetas meta vs. último valor
    Fuente.jsx          pie "Fuente, año, período, método"
  data/hitos.js
public/data/
  cuenca.geojson  rios.geojson  regiones_riego.geojson
  zonas_salinas.geojson  sitios.geojson
  series/*.json         una serie por archivo, con metadatos
```

## Vista 1: Mapa
Capas activables, cada una con leyenda y fuente:
1. Límite de la cuenca (MDBA / Geoscience Australia).
2. Ríos principales: Murray, Darling, Murrumbidgee, Lachlan, Goulburn (Natural Earth).
3. Regiones de riego: Riverina, Sunraysia/Mallee, Riverland, Goulburn-Murray.
4. Zonas con problema de salinidad: Mallee, Riverland, Kerang-Barr Creek, Lower Lakes.
5. Sitios de medición con su meta: Lock 6 (580 EC), Morgan (800), Murray Bridge (830), Milang (1.000), Burtundy (830). Al hacer clic, abre la serie del sitio.
6. Esquemas de interceptación de sales.

Las capas 3 y 4 no tienen un GeoJSON oficial simple: se dibujan como polígonos aproximados y se rotulan "delimitación aproximada".

## Vista 2: Evolución
Tres bloques separados, como pide la consigna:
- Agua superficial: EC en Morgan a lo largo de los años, con la línea de meta de 800 EC y bandas para la Sequía del Milenio y los tres períodos de estrategia (1988, 2001, 2015). Selector de sitio.
- Agua subterránea: sal interceptada por año y niveles freáticos, si se consiguen series.
- Suelos: superficie afectada por salinidad de tierras secas (auditorías de 1999-2000 y posteriores). Suele haber pocos puntos: mostrarlos como tales, sin interpolar.
- Exportación de sal por la desembocadura frente al objetivo de 2 Mt/año.

Reglas de datos:
- Cada serie guarda `fuente`, `url`, `periodo`, `unidad`, `metodo` y `tipo` (medido, modelado o estimado).
- No mezclar EC con mg/L sin conversión explícita.
- Si una serie no se consigue, la vista dice "sin datos disponibles". No se inventan valores.

## Vista 3: Línea de tiempo
Hitos: años 60 (Morgan supera 800 EC), 1988, 2001, Sequía del Milenio, 2007 Water Act, 2010 (primera vez que se cumple la meta), 2012 Basin Plan, 2015 BSM2030, 2019 Comisión Real, 2026 revisión del plan. Al elegir un hito se resalta ese tramo en el gráfico.

## Vista 4: Estado actual
Tarjetas por sitio: meta, último valor disponible, fecha del dato y si cumple.

## Origen de los datos (orden de intento)
1. EC diaria: MDBA River Murray Data (CSV), BoM Water Data Online, WaterConnect SA. Agregar a promedio anual y percentil 95 con un script en `scripts/`.
2. Sal interceptada y exportada: informes BSM2030 de MDBA y de los estados.
3. Geografía: Natural Earth (ríos) y datos abiertos de MDBA (límite).
Riesgo: el entorno de trabajo puede no tener acceso a esos sitios. En ese caso se dejan los scripts de descarga listos para correr en la PC y se cargan a mano solo los valores publicados en los informes ya citados en el TPO.

## Mejoras propuestas
1. Control deslizante de año que anima mapa y gráficos a la vez.
2. Comparador de dos sitios o dos períodos.
3. Conversor EC a mg/L con el factor 0,55 del Murray, explicado.
4. Capa de clima: caudal o lluvia anual junto a la EC, para ver el efecto de las sequías.
5. Datos en vivo: consulta a la API de BoM desde el navegador, si lo permite.
6. Exportar gráficos como PNG con título, fuente y período, listos para el informe.
7. Pestaña con las metas y organismos del Eje 4 y, más adelante, la propuesta del Eje 6.

## Orden de ejecución
1. Crear el proyecto Vite y la navegación.
2. Conseguir y validar datos (lo más incierto: hacerlo antes de pulir la interfaz).
3. Mapa, luego gráficos, luego línea de tiempo y estado actual.
4. `npm run build`, revisión visual, README con pasos para GitHub Pages.
5. Mejoras 1, 3 y 6 si queda margen.
