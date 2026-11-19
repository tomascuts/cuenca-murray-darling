# Cuenca Murray-Darling: salinización del agua y los suelos

Visor web del TPO de Tecnología y Medio Ambiente (Grupo 1). Muestra la geografía de la cuenca y la evolución de la
salinidad del agua superficial, del agua subterránea y de los suelos, con la fuente, el período y el método de cada dato.

## Vistas

| Vista | Qué muestra |
|---|---|
| Mapa de la cuenca | Límite, ríos coloreados por salinidad (auditoría 1999, con selector 1998 / 2020 / 2050 / 2100), regiones de riego, zonas con problema de salinidad, sitios con meta del Basin Plan y esquemas de interceptación de sales. |
| Evolución | Agua superficial (Morgan medido y modelado, proyecciones de 1999, exportación de sal), agua subterránea (sal interceptada, salinidad del agua bombeada, tendencia de napas) y suelos (superficie en riesgo y datos puntuales). Incluye un conversor de EC a mg/L. |
| Línea de tiempo | Hitos desde los años 60 hasta la revisión del Basin Plan de 2026, filtrables por tipo. |
| Estado actual | Último dato publicado frente a cada meta, con indicación de si se cumple. |
| Fuentes | Todas las fuentes, agrupadas por tipo según la consigna. |

Cada dato está marcado como **medido**, **modelado**, **proyección** o **estimación**. No se inventan valores: los años
sin dato publicado quedan vacíos.

## Modo presentación

El botón **▶ Presentar** (o la dirección `#presentacion`) abre 15 diapositivas a pantalla completa para la exposición
oral, con el mapa interactivo y los gráficos de la app integrados. Cubre los ejes 1, 2, 4, 5 y 6 del informe.

| Tecla | Acción |
|---|---|
| → · Espacio · AvPág | Siguiente diapositiva |
| ← · RePág | Anterior |
| Inicio · Fin | Primera · última |
| F | Pantalla completa |
| N | Mostrar u ocultar las notas para exponer |
| Esc | Volver a la app |

Para ir directo a una diapositiva: `#presentacion?d=5`. En la diapositiva del mapa, las flechas mueven el mapa
mientras el cursor está sobre él; para avanzar, usar los botones de abajo o hacer clic fuera del mapa.

Las diapositivas y sus notas están en `src/components/presentacion/diapositivas.jsx`: cada una es un objeto con su eje,
título, notas y contenido, así que se pueden editar o agregar (por ejemplo, las del eje 3).

## Requisitos

- Node.js 18 o superior (recomendado 22): https://nodejs.org

## Uso local

```bash
npm install
npm run dev        # abre http://localhost:5173
```

### Límite oficial de la cuenca (recomendado)

Por defecto el mapa dibuja un **contorno aproximado** de la cuenca. Para usar el límite oficial de la MDBA
(Water Act 2007, publicado en data.gov.au), ejecutar una vez con conexión a internet:

```bash
npm run datos
```

Esto crea `public/data/cuenca.geojson`. El mapa lo detecta solo y cambia el rótulo a "(oficial)". Conviene subir ese
archivo al repositorio para que también se vea en GitHub Pages.

## Publicar en GitHub Pages

**Opción A, automática (recomendada):**

1. Crear un repositorio en GitHub y subir esta carpeta (sin `node_modules` ni `dist`, que ya están en `.gitignore`):
   ```bash
   git init
   git add .
   git commit -m "Visor cuenca Murray-Darling"
   git branch -M main
   git remote add origin https://github.com/<usuario>/<repositorio>.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Cada `push` a `main` publica la app con el workflow `.github/workflows/deploy.yml`. Queda en
   `https://<usuario>.github.io/<repositorio>/`.

**Opción B, manual:** `npm run deploy` compila y sube `dist` a la rama `gh-pages`. En ese caso elegir
**Settings → Pages → Source: Deploy from a branch → gh-pages**.

La app usa rutas relativas (`base: './'` en `vite.config.js`), así que funciona con cualquier nombre de repositorio.

## Estructura

```
public/data/        rios.geojson (Natural Earth) y cuenca.geojson (si se descarga)
scripts/            descargar_limite.mjs
src/data/           fuentes.js, series.js, geo.js, hitos.js  ← todos los datos y sus fuentes
src/components/     MapaCuenca, Evolucion, LineaTiempo, EstadoActual, Fuentes, Fuente
```

Para agregar o corregir un dato, editar `src/data/series.js` (series) o `src/data/geo.js` (mapa) e indicar la clave de
la fuente definida en `src/data/fuentes.js`.

## Limitaciones conocidas

- Regiones de riego, zonas salinas y ubicación de sitios y esquemas son **aproximadas** (elaboración propia sobre la
  base de las fuentes citadas).
- La serie anual medida en Morgan tiene huecos: solo se cargaron los años con valor publicado en los informes
  consultados (2006-07, 2015-16 y 2017-18 a 2023-24).
- No hay una serie pública y continua de superficie salinizada dentro de la cuenca; para suelos se muestran datos
  puntuales y una proyección nacional (marcada como tal).
- La exportación de sal mezcla dos métodos publicados (promedio de 3 años por las barreras y estimación anual por
  modelo); se grafican como series separadas.

## Mejoras propuestas

1. **Series diarias reales:** descargar la EC diaria de Morgan, Lock 6 y Murray Bridge desde Water Data SA
   (estaciones A4260554, A4260510 y A4261162) o desde la API de Water Data Online del Bureau of Meteorology, y
   calcular promedio, percentil 95 y días sobre la meta para cada año desde 1975.
2. **Control deslizante de año** que anime a la vez el mapa y los gráficos.
3. **Caudal o lluvia junto a la EC**, para separar el efecto de las sequías del efecto de las medidas.
4. **Capa oficial de valles y zonas** (CEWO MDB valleys, zonas de calidad de agua de la MDBA) en lugar de los círculos
   aproximados.
5. **Datos de napas por pozo** (red Basin-wide Core Salinity Monitoring) para mapear profundidad y salinidad del agua
   subterránea.
6. **Imágenes satelitales** (índices de vegetación de Sentinel-2 o Landsat) como indicador indirecto de suelos
   afectados, distinguido explícitamente de la medición directa (Eje 5).
7. **Exportar gráficos como PNG** con título, fuente y período, listos para el informe.
8. **Pestaña de marco legal** con las metas y organismos del Eje 4 y la propuesta tecnológica del Eje 6.
