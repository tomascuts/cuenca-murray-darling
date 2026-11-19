// Capas geográficas puntuales y aproximadas. Las coordenadas de sitios y esquemas
// son aproximadas (localidad más cercana); las regiones se dibujan como círculos ilustrativos.

// Sitios con meta de salinidad del Basin Plan (secc. 9.14): no superar el valor el 95% del tiempo.
export const sitiosMeta = [
  { nombre: 'Lock 6', lat: -34.0, lon: 140.87, meta: 580, nota: 'Entrada del Murray a Australia del Sur.' },
  { nombre: 'Morgan', lat: -34.03, lon: 139.67, meta: 800, nota: 'Toma de agua para Adelaida. Sitio de la Basin Salinity Target de BSM2030.' },
  { nombre: 'Murray Bridge', lat: -35.12, lon: 139.27, meta: 830, nota: 'Tramo inferior del Murray.' },
  { nombre: 'Milang (Lower Lakes)', lat: -35.41, lon: 138.97, meta: 1000, nota: 'Lago Alexandrina, junto a la desembocadura.' },
  { nombre: 'Burtundy (río Darling)', lat: -32.8, lon: 142.3, meta: 830, nota: 'Darling aguas abajo de los lagos Menindee.' },
]

// Esquemas de interceptación de sales (SIS) conjuntos.
// t1718 / t1819 / t2122: toneladas desviadas; ec: salinidad del agua bombeada en 2021-22.
export const esquemasSIS = [
  { nombre: 'Pyramid Creek', estado: 'Vic', lat: -35.73, lon: 143.92, t1718: 21369, t1819: 12684, t2122: 26745, ec: 43000 },
  { nombre: 'Barr Creek', estado: 'Vic', lat: -35.68, lon: 144.1, t1718: 29641, t1819: 8034, t2122: 4055, ec: 5298 },
  { nombre: 'Mildura–Merbein', estado: 'Vic', lat: -34.18, lon: 142.07, t1718: 45118, t1819: 66630, t2122: 77672, ec: 80799 },
  { nombre: 'Mallee Cliffs', estado: 'NSW', lat: -34.25, lon: 142.6, t1718: 57714, t1819: 64847, t2122: 30949, ec: 53596 },
  { nombre: 'Buronga', estado: 'NSW', lat: -34.17, lon: 142.2, t1718: 49901, t1819: 56493, t2122: 50858, ec: 42802 },
  { nombre: 'Upper Darling', estado: 'NSW', lat: -33.9, lon: 142.4, t1718: 35550, t1819: 42888, t2122: 1940, ec: 47520 },
  { nombre: 'Rufus River', estado: 'NSW', lat: -34.05, lon: 141.3, t1718: 0, t1819: 147, t2122: 0, ec: null },
  { nombre: 'Pike', estado: 'SA', lat: -34.2, lon: 140.75, t1718: 8668, t1819: 18449, t2122: 16299, ec: 51905 },
  { nombre: 'Murtho', estado: 'SA', lat: -34.05, lon: 140.83, t1718: 42621, t1819: 36069, t2122: 25493, ec: 38750 },
  { nombre: 'Bookpurnong', estado: 'SA', lat: -34.35, lon: 140.62, t1718: 23238, t1819: 17490, t2122: 13218, ec: 31804 },
  { nombre: 'Loxton', estado: 'SA', lat: -34.45, lon: 140.57, t1718: 21775, t1819: 22763, t2122: 7569, ec: 21608 },
  { nombre: 'Woolpunda', estado: 'SA', lat: -34.12, lon: 140.1, t1718: 91859, t1819: 73829, t2122: 76959, ec: 30592 },
  { nombre: 'Waikerie', estado: 'SA', lat: -34.18, lon: 139.98, t1718: 57130, t1819: 53877, t2122: 43052, ec: 28820 },
]

// Principales regiones de riego (ubicación y extensión aproximadas).
export const regionesRiego = [
  { nombre: 'Riverland (SA)', lat: -34.25, lon: 140.5, radioKm: 55, cultivos: 'vid, cítricos, frutales' },
  { nombre: 'Sunraysia / Mallee (Vic–NSW)', lat: -34.3, lon: 142.4, radioKm: 60, cultivos: 'vid, cítricos, almendros' },
  { nombre: 'Goulburn–Murray (Vic)', lat: -36.1, lon: 144.9, radioKm: 85, cultivos: 'lechería, frutales, pasturas regadas' },
  { nombre: 'Murray Irrigation – Deniliquin (NSW)', lat: -35.5, lon: 145.0, radioKm: 65, cultivos: 'arroz, cereales, pasturas' },
  { nombre: 'Murrumbidgee – Griffith/Leeton (NSW)', lat: -34.4, lon: 146.2, radioKm: 55, cultivos: 'arroz, vid, cítricos, algodón' },
  { nombre: 'Coleambally (NSW)', lat: -34.8, lon: 145.9, radioKm: 30, cultivos: 'arroz, cereales' },
  { nombre: 'Lachlan (NSW)', lat: -33.45, lon: 146.0, radioKm: 60, cultivos: 'algodón, cereales' },
  { nombre: 'Macquarie – Warren/Narromine (NSW)', lat: -31.85, lon: 147.8, radioKm: 55, cultivos: 'algodón' },
  { nombre: 'Namoi – Narrabri (NSW)', lat: -30.3, lon: 149.8, radioKm: 55, cultivos: 'algodón, cereales' },
  { nombre: 'Gwydir – Moree (NSW)', lat: -29.5, lon: 149.85, radioKm: 50, cultivos: 'algodón' },
  { nombre: 'Border Rivers – Goondiwindi (Qld–NSW)', lat: -28.55, lon: 150.3, radioKm: 45, cultivos: 'algodón' },
  { nombre: 'Condamine–Balonne – St George (Qld)', lat: -28.1, lon: 148.6, radioKm: 60, cultivos: 'algodón' },
  { nombre: 'Lower Murray (SA)', lat: -35.1, lon: 139.3, radioKm: 25, cultivos: 'pasturas regadas, lechería' },
]

// Zonas donde la salinidad del agua o de los suelos es un problema relevante (extensión aproximada).
export const zonasSalinas = [
  {
    nombre: 'Mallee (Vic, NSW y SA)', lat: -34.9, lon: 141.8, radioKm: 130, tipo: 'agua subterránea y río',
    texto: 'Junto con las Riverine Plains aporta cerca del 70% de la sal que llega al Murray. Se espera que los mayores aumentos futuros de salinidad provengan del bajo Mallee.',
    fuentes: ['hart2020'],
  },
  {
    nombre: 'Riverine Plains (NSW y Vic)', lat: -35.5, lon: 145.2, radioKm: 150, tipo: 'napas y suelos regados',
    texto: 'El riego elevó las napas hasta 25 m bajo algunas zonas. Hacia 1987 había unas 96.000 ha de tierras regadas afectadas en el sur de la cuenca.',
    fuentes: ['hart2020', 'goss2002'],
  },
  {
    nombre: 'Riverland (SA)', lat: -34.25, lon: 140.45, radioKm: 55, tipo: 'agua subterránea y río',
    texto: 'Siete esquemas de interceptación. El agua subterránea bombeada tiene entre 21.600 y 51.900 EC (2021-22). Los domos de napa bajo el riego llegaron a unos 570 GL hacia 2000.',
    fuentes: ['mdba2022', 'dwlbc2009'],
  },
  {
    nombre: 'Kerang – Avoca – Barr Creek (Vic)', lat: -35.75, lon: 143.85, radioKm: 55, tipo: 'río y drenaje',
    texto: 'El río Avoca tenía 1.440 EC en 1998 y la auditoría de 1999 proyectaba 2.990 EC para 2100. Operan los esquemas Pyramid Creek y Barr Creek.',
    fuentes: ['goss2002', 'mdba2022'],
  },
  {
    nombre: 'Lachlan – Bogan – Macquarie (NSW)', lat: -32.6, lon: 147.4, radioKm: 150, tipo: 'salinidad de secano y ríos',
    texto: 'La auditoría de 1999 proyectaba fuertes aumentos: Bogan de 730 a 2.320 EC, Macquarie de 620 a 2.110 EC y Lachlan de 530 a 1.460 EC (1998 → 2100).',
    fuentes: ['goss2002'],
  },
  {
    nombre: 'Namoi (NSW)', lat: -30.9, lon: 150.0, radioKm: 80, tipo: 'salinidad de secano y río',
    texto: 'Proyección de la auditoría de 1999: de 680 EC en 1998 a 1.550 EC en 2100.',
    fuentes: ['goss2002'],
  },
  {
    nombre: 'Condamine–Balonne y Warrego (Qld)', lat: -27.6, lon: 148.4, radioKm: 140, tipo: 'proyección de ríos',
    texto: 'La auditoría de 1999 proyectaba pasar de 210 EC a más de 1.000 EC hacia 2020.',
    fuentes: ['goss2002'],
  },
  {
    nombre: 'Bajo Darling (Burtundy)', lat: -32.8, lon: 142.3, radioKm: 55, tipo: 'río',
    texto: 'Entre 2019 y 2024 no cumplió su meta de 830 EC: la superó el 8,5% del tiempo, con un pico de 1.238 EC el 6/4/2024.',
    fuentes: ['mdba2024'],
  },
  {
    nombre: 'Lower Lakes y Coorong (SA)', lat: -35.55, lon: 139.15, radioKm: 40, tipo: 'lagos terminales',
    texto: 'En Milang la salinidad superó 1.000 EC desde mediados de junio de 2025 y pasó de 1.200 EC por ingreso de agua de mar. Entre 2017 y 2020 los caudales ambientales evitaron que se acumularan unos 5,5 millones de t de sal en el Coorong.',
    fuentes: ['dew2025', 'dew2021'],
  },
]

// Contorno APROXIMADO de la cuenca, usado solo si no está el GeoJSON oficial en public/data/cuenca.geojson.
export const contornoAproximado = {
  type: 'Feature',
  properties: { nombre: 'Cuenca Murray-Darling (contorno aproximado)' },
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [138.89, -35.56], [138.95, -35.2], [139.05, -34.75], [139.1, -34.3], [139.25, -33.8], [139.6, -33.2],
      [140.2, -32.6], [141.0, -32.1], [141.6, -31.4], [142.0, -30.4], [142.6, -29.4], [143.2, -28.3],
      [143.6, -27.0], [144.2, -25.9], [145.3, -25.2], [146.6, -24.8], [147.6, -24.9], [148.4, -25.4],
      [149.4, -26.0], [150.4, -26.3], [151.2, -26.8], [151.9, -27.6], [152.2, -28.4], [152.0, -29.2],
      [151.8, -30.1], [151.5, -31.0], [150.8, -31.8], [150.3, -32.5], [149.9, -33.3], [149.9, -34.1],
      [149.5, -35.0], [149.2, -35.7], [148.8, -36.6], [148.0, -37.1], [147.0, -37.2], [146.0, -37.3],
      [145.2, -37.5], [144.3, -37.65], [143.4, -37.7], [142.5, -37.4], [141.8, -37.1], [141.1, -36.7],
      [140.7, -36.2], [140.2, -35.8], [139.6, -35.7], [138.89, -35.56],
    ]],
  },
}

// URL oficial del límite (WFS de data.gov.au). Se usa en el script de descarga.
export const URL_LIMITE_OFICIAL =
  'https://data.gov.au/geoserver/murray-darling-basin-boundary/wfs?request=GetFeature&typeName=ckan_4ede9aed_5620_47db_a72b_0b3aa0a3ced0&outputFormat=json'
