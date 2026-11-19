// Series de datos con su procedencia. Valores tal como figuran en cada informe.
// EC = conductividad eléctrica en µS/cm (unidades EC). No se mezclan EC y mg/L.

// --- AGUA SUPERFICIAL -------------------------------------------------------

// EC medida en Morgan (estación A4260554), estadísticos de cada año hidrológico (jul–jun).
export const morganAnual = {
  tipo: 'medido',
  unidad: 'EC (µS/cm)',
  metodo: 'Registro continuo de EC; promedio, percentil 95 y máximo del año hidrológico.',
  fuentes: ['schrobback2008', 'dew2016', 'dew2019', 'mdba2020', 'dew2021', 'mdba2022', 'mdba2024'],
  datos: [
    { anio: '2006-07', prom: 377, p95: 452, max: null, fuente: 'schrobback2008' },
    { anio: '2015-16', prom: 268, p95: 344, max: 378, fuente: 'dew2016' },
    { anio: '2017-18', prom: 359, p95: 439, max: 465, fuente: 'dew2019' },
    { anio: '2018-19', prom: 263, p95: 370, max: 462, fuente: 'mdba2020' },
    { anio: '2019-20', prom: 234, p95: 318, max: 335, fuente: 'dew2021' },
    { anio: '2020-21', prom: 226, p95: 287, max: 323, fuente: 'dew2021' },
    { anio: '2021-22', prom: 239, p95: 332, max: 370, fuente: 'mdba2022' },
    { anio: '2023-24', prom: 346, p95: 498, max: 549, fuente: 'mdba2024' },
  ],
}

// Ventanas de 25 años de EC medida en Morgan.
export const morganVentanas = {
  tipo: 'medido',
  unidad: 'EC (µS/cm)',
  metodo: 'Estadísticos de la serie diaria medida para cada ventana de 25 años.',
  fuentes: ['mdba2024', 'schrobback2008', 'mdba2020', 'mdba2022'],
  datos: [
    { periodo: '1975–2000', prom: 632, p95: 1063, pico: 1441, pct: 23, fuente: 'mdba2024' },
    { periodo: '1982–2007', prom: 553, p95: 937, pico: null, pct: 11, fuente: 'schrobback2008' },
    { periodo: '1994–2019', prom: 436, p95: 720, pico: 1087, pct: 2, fuente: 'mdba2020' },
    { periodo: '1997–2022', prom: 392, p95: 669, pico: 826, pct: 0, fuente: 'mdba2022' },
    { periodo: '1999–2024', prom: 374, p95: 627, pico: 826, pct: 0, fuente: 'mdba2024' },
  ],
}

// Porcentaje del tiempo en que Morgan superó 800 EC (medido), según distintas ventanas.
export const morganExcedencia = {
  tipo: 'medido',
  unidad: '% del tiempo con EC > 800',
  metodo: 'Proporción de días con EC media diaria mayor a 800 EC. Las ventanas no son homogéneas: se rotulan tal como las informa cada fuente.',
  fuentes: ['paul2018', 'goss2002', 'mdba2024', 'schrobback2008', 'mdba2020', 'mdba2022'],
  datos: [
    { periodo: '1975–1985', pct: 40, fuente: 'paul2018' },
    { periodo: 'Antes de 1987', pct: 42, fuente: 'goss2002' },
    { periodo: '1992–1998', pct: 8, fuente: 'goss2002' },
    { periodo: '1975–2000', pct: 23, fuente: 'mdba2024' },
    { periodo: '1982–2007', pct: 11, fuente: 'schrobback2008' },
    { periodo: '1994–2019', pct: 2, fuente: 'mdba2020' },
    { periodo: '1997–2022', pct: 0, fuente: 'mdba2022' },
    { periodo: '1999–2024', pct: 0, fuente: 'mdba2024' },
  ],
}

// Salinidad simulada en Morgan con el clima fijo de 1975–2000 y distintos niveles de gestión.
export const morganModelado = {
  tipo: 'modelado',
  unidad: 'EC (µS/cm)',
  metodo: 'Modelo del río que repite la hidrología 1975–2000 con el desarrollo y las medidas de cada año: aísla el efecto de la gestión del clima.',
  fuentes: ['mdba2020', 'mdba2022', 'mdba2024'],
  datos: [
    { condicion: '1988', prom: 665, p95: 1058, pct: 28, fuente: 'mdba2024' },
    { condicion: '2019', prom: 490, p95: 778, pct: 4, fuente: 'mdba2020' },
    { condicion: '2022', prom: 507, p95: 797, pct: 5, fuente: 'mdba2022' },
    { condicion: '2024', prom: 501, p95: 786, pct: 3, fuente: 'mdba2024' },
  ],
}

// Proyecciones de la Salinity Audit de 1999 (salinidad media en el punto más aguas abajo de cada río).
export const auditoria1999 = {
  tipo: 'proyección',
  unidad: 'EC (µS/cm)',
  metodo: 'Proyección "sin nuevas medidas" de la auditoría de salinidad de 1999. Valor en el punto de medición más aguas abajo de cada río, salvo que se indique el sitio.',
  fuentes: ['goss2002'],
  anios: ['1998', '2020', '2050', '2100'],
  rios: [
    { rio: 'Murray en Morgan (SA)', clave: 'Murray', v: [570, 670, 790, 900] },
    { rio: 'Murray en Merbein (NSW)', clave: null, v: [360, 400, 450, 510] },
    { rio: 'Murray en Torrumbarry (Vic)', clave: null, v: [110, 110, 140, 140] },
    { rio: 'Murrumbidgee', clave: 'Murrumbidgee', v: [250, 320, 350, 400] },
    { rio: 'Avoca', clave: null, v: [1440, 1470, 2220, 2990] },
    { rio: 'Loddon', clave: 'Loddon', v: [870, 880, 900, 970] },
    { rio: 'Campaspe', clave: null, v: [600, 600, 610, 610] },
    { rio: 'Goulburn-Broken', clave: 'Goulburn', v: [130, 140, 230, 230] },
    { rio: 'Ovens', clave: null, v: [70, 70, 75, 80] },
    { rio: 'Kiewa', clave: null, v: [45, 45, 45, 45] },
    { rio: 'Darling en Menindee', clave: 'Darling', v: [360, 430, 490, 530] },
    { rio: 'Lachlan', clave: 'Lachlan', v: [530, 780, 1150, 1460] },
    { rio: 'Bogan', clave: 'Bogan', v: [730, 1500, 1950, 2320] },
    { rio: 'Macquarie', clave: 'Macquarie', v: [620, 1290, 1730, 2110] },
    { rio: 'Castlereagh', clave: 'Castlereagh', v: [640, 760, 1100, 1230] },
    { rio: 'Namoi', clave: 'Namoi', v: [680, 1050, 1280, 1550] },
    { rio: 'Gwydir', clave: 'Gwydir', v: [560, 600, 700, 740] },
    { rio: 'Macintyre', clave: 'Macintyre', v: [450, 450, 450, 450] },
    { rio: 'Condamine-Balonne', clave: ['Condamine', 'Balonne'], v: [210, 1040, 1040, 1040] },
    { rio: 'Warrego', clave: 'Warrego', v: [210, 1270, 1270, 1270] },
  ],
}

// --- EXPORTACIÓN DE SAL AL MAR ---------------------------------------------

export const exportacion = {
  unidad: 'millones de toneladas por año',
  objetivo: 2,
  fuentes: ['mdba2020', 'dew2021', 'mdba2022', 'mdba2024', 'dew2025', 'dew2019'],
  // Promedio anualizado de 3 años sobre las barreras (método del Basin Plan, secc. 9.09).
  tresAnios: {
    tipo: 'estimado',
    metodo: 'Exportación por las barreras de los Lower Lakes, anualizada en ventanas de 3 años.',
    datos: [
      { periodo: '2016–19', fin: 2019, mt: 0.94, fuente: 'mdba2020' },
      { periodo: '2018–21', fin: 2021, mt: 0.47, fuente: 'dew2021' },
      { periodo: '2019–22', fin: 2022, mt: 0.98, fuente: 'mdba2022' },
      { periodo: '2021–24', fin: 2024, mt: 2.63, fuente: 'mdba2024' },
      { periodo: '2022–25', fin: 2025, mt: 2.11, fuente: 'dew2025' },
    ],
  },
  // Exportación anual de la cuenca estimada con modelo por la MDBA.
  anual: {
    tipo: 'modelado',
    metodo: 'Exportación anual de sal de la cuenca estimada por modelo (MDBA).',
    datos: [
      { anio: '2016-17', fin: 2017, mt: 1.94, fuente: 'dew2019' },
      { anio: '2017-18', fin: 2018, mt: 0.51, fuente: 'dew2019' },
      { anio: '2018-19', fin: 2019, mt: 0.36, fuente: 'dew2019' },
      { anio: '2019-20', fin: 2020, mt: 0.43, fuente: 'dew2021' },
      { anio: '2021-22', fin: 2022, mt: 1.89, fuente: 'mdba2022' },
    ],
  },
}

// --- AGUA SUBTERRÁNEA --------------------------------------------------------

// Sal interceptada por todos los SIS conjuntos de la cuenca.
export const sisCuenca = {
  tipo: 'medido',
  unidad: 'toneladas de sal por año',
  metodo: 'Sal desviada por los esquemas de interceptación conjuntos (volumen bombeado × salinidad).',
  fuentes: ['mdba2020', 'mdba2022', 'mdba2024'],
  datos: [
    { anio: '2009-10', t: 490000, fuente: 'mdba2020' },
    { anio: '2010-11', t: 324164, fuente: 'mdba2020' },
    { anio: '2011-12', t: 362508, fuente: 'mdba2020' },
    { anio: '2012-13', t: 322686, fuente: 'mdba2020' },
    { anio: '2013-14', t: 397739, fuente: 'mdba2020' },
    { anio: '2014-15', t: 432454, fuente: 'mdba2020' },
    { anio: '2015-16', t: 524728, fuente: 'mdba2020' },
    { anio: '2016-17', t: 395388, fuente: 'mdba2020' },
    { anio: '2017-18', t: 484586, fuente: 'mdba2020' },
    { anio: '2018-19', t: 474201, fuente: 'mdba2020' },
    { anio: '2019-20', t: null },
    { anio: '2020-21', t: null },
    { anio: '2021-22', t: 374810, fuente: 'mdba2022' },
    { anio: '2022-23', t: null },
    { anio: '2023-24', t: 359645, fuente: 'mdba2024' },
  ],
}

// Salinidad del agua subterránea bombeada por cada SIS en 2021-22 (indicador directo de napas salinas).
export const sisEsquemas2122 = {
  tipo: 'medido',
  unidad: 'EC promedio del agua bombeada',
  metodo: 'Salinidad media del agua subterránea extraída por cada esquema en 2021-22.',
  fuentes: ['mdba2022'],
  datos: [
    { esquema: 'Mildura–Merbein', ec: 80799, t: 77672 },
    { esquema: 'Mallee Cliffs', ec: 53596, t: 30949 },
    { esquema: 'Pike (etapa 1)', ec: 51905, t: 16299 },
    { esquema: 'Upper Darling', ec: 47520, t: 1940 },
    { esquema: 'Pyramid Creek', ec: 43000, t: 26745 },
    { esquema: 'Buronga', ec: 42802, t: 50858 },
    { esquema: 'Murtho', ec: 38750, t: 25493 },
    { esquema: 'Bookpurnong', ec: 31804, t: 13218 },
    { esquema: 'Woolpunda', ec: 30592, t: 76959 },
    { esquema: 'Waikerie', ec: 28820, t: 43052 },
    { esquema: 'Loxton', ec: 21608, t: 7569 },
    { esquema: 'Barr Creek', ec: 5298, t: 4055 },
  ],
}

// Tendencia de los pozos de observación de napas en la cuenca del Murray de Australia del Sur y el Sudeste.
export const napasSA = {
  tipo: 'medido',
  unidad: '% de pozos',
  metodo: 'Proporción de pozos de observación con profundidad al agua subterránea en descenso, estable o en ascenso (la napa sube cuando la profundidad disminuye).',
  fuentes: ['dwlbc2009'],
  datos: [
    { periodo: '1986–1990', sube: 50, estable: 50, baja: 0 },
    { periodo: '1990–2000', sube: 20, estable: 62, baja: 18 },
    { periodo: '2000–2008', sube: 9, estable: 32, baja: 60 },
  ],
}

// --- SUELOS ------------------------------------------------------------------

// Tierras agrícolas en zonas de alto riesgo de salinidad de secano (dato NACIONAL, no solo de la cuenca).
export const riesgoSecano = {
  tipo: 'proyección',
  unidad: 'millones de hectáreas (Australia)',
  metodo: 'National Land and Water Resources Audit (2000), citado en Goss (2002). Alcance nacional: incluye la cuenca pero no se limita a ella.',
  fuentes: ['goss2002'],
  datos: [
    { anio: '2000', mha: 4.65 },
    { anio: '2020', mha: 6.371 },
    { anio: '2050', mha: 13.66 },
  ],
}

// Datos puntuales sobre suelos y napas (no forman series continuas).
export const datosPuntuales = [
  { valor: '96.000 ha', texto: 'de tierras regadas del sur de la cuenca afectadas por salinidad hacia 1987.', fuente: 'goss2002', tipo: 'medido', area: 'suelos' },
  { valor: '559.000 ha', texto: 'de 1,5 millones de ha regadas tenían la napa a menos de 2 m; sin cambios se proyectaban 869.000 ha para 2015.', fuente: 'goss2002', tipo: 'proyección', area: 'napas' },
  { valor: '3 a 5 millones de ha', texto: 'de tierras salinizadas proyectadas en 100 años sin intervención (estrategia BSMS).', fuente: 'hart2020', tipo: 'proyección', area: 'suelos' },
  { valor: 'hasta 25 m', texto: 'de ascenso de napas bajo algunas zonas regadas de las Riverine Plains y la cuenca del Murray occidental.', fuente: 'hart2020', tipo: 'medido', area: 'napas' },
  { valor: '> 10¹¹ t', texto: 'de sal almacenada en el agua subterránea de la cuenca del Murray (y cerca de la mitad en la del Darling).', fuente: 'hart2020', tipo: 'estimado', area: 'napas' },
  { valor: '570 GL', texto: 'máximo de agua acumulada en los “domos” de napa bajo el riego del Riverland, alcanzado hacia 2000.', fuente: 'dwlbc2009', tipo: 'estimado', area: 'napas' },
  { valor: '~70 %', texto: 'de la carga de sal del Murray proviene de las Riverine Plains y del Mallee.', fuente: 'hart2020', tipo: 'estimado', area: 'napas' },
  { valor: 'AU$ 46 M/año', texto: 'de costo de la salinidad para los usuarios del Murray; cada EC adicional suma unos AU$ 140.000 por año.', fuente: 'goss2002', tipo: 'estimado', area: 'costos' },
  { valor: 'AU$ 5–6 M/año', texto: 'cuesta operar los esquemas de interceptación de sales.', fuente: 'hart2020', tipo: 'estimado', area: 'costos' },
]
