import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2026-09-24' })

// 1. Categoría
let categoryId
const existing = await client.fetch(`*[_type == "category" && title == "Devlog"][0]._id`)
if (existing) {
  categoryId = existing
  console.log('✓ Categoría Devlog ya existía')
} else {
  const cat = await client.create({
    _type: 'category',
    title: 'Devlog',
    slug: { current: 'devlog' },
    description: 'Bitácora del proceso',
  })
  categoryId = cat._id
  console.log('✓ Categoría Devlog creada')
}

// Helper para crear bloques de texto
const block = (style, text) => ({
  _type: 'block',
  _key: Math.random().toString(36).slice(2),
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks: [] }],
})

// Helper para blockquote
const quote = (text) => block('blockquote', text)

// 2. Post
const post = await client.create({
  _type: 'post',
  title: 'Conecté mi portafolio a APIs reales: GitHub, Hackatime y Sanity',
  slug: { current: 'conecte-portafolio-apis-reales' },
  excerpt:
    'Bitácora de cómo reemplacé todos los placeholders de mi portafolio con datos reales desde cero, incluyendo los errores que cometí en el camino.',
  publishedAt: new Date().toISOString(),
  categories: [{ _type: 'reference', _ref: categoryId, _key: 'cat1' }],
  body: [
    block('normal', 'Durante las últimas semanas estuve construyendo mi portafolio personal en Next.js 16. Al principio todo era maquetación pura: los proyectos mostraban "Proyecto 01, Proyecto 02, Proyecto 03", las horas de código decían "000h", y el blog era un array hardcodeado con tres posts de prueba. Un esqueleto precioso, pero vacío.'),
    block('normal', 'Esta semana decidí conectarlo todo a APIs reales. Este post es la bitácora completa del proceso, incluyendo los errores que me costaron más tiempo del que me gustaría admitir.'),

    block('h2', 'GitHub API: la primera integración'),
    block('normal', 'Lo primero que quise resolver era que la Home mostrara mis proyectos reales en lugar de placeholders. Después de investigar un poco descubrí algo importante: la API REST de GitHub no expone los repositorios "pinned" (los que eliges manualmente en tu perfil). Solo devuelve todos los públicos.'),
    block('normal', 'Para obtener los pinned reales hay que usar la API GraphQL, que sí permite consultar los pinnedItems de un usuario. Así que terminé con una arquitectura híbrida:'),
    quote('GraphQL → para los repos destacados en la Home.\nREST → para el listado completo en /proyectos.\nAmbas con caché de 24 horas vía next: { revalidate: 86400 }.'),

    block('h2', 'Hackatime: las horas que realmente programo'),
    block('normal', 'Hackatime es un fork abierto de WakaTime que usa Hack Club para trackear horas de código. Registra tus editors y te da estadísticas reales: cuántas horas programaste, qué lenguajes usas más, racha de días activos.'),
    block('normal', 'La API devuelve un JSON muy limpio. Un ejemplo real de mi cuenta, con el rango del año completo:'),
    quote('total_seconds: 45725 → 12h 42m\nTypeScript: 43.29%\nOther: 38.81%\nXML: 18.6%'),
    block('normal', 'Solo necesité configurar el API key en .env.local y hacer un fetch con la fecha de inicio del año. Los datos se muestran en /sobre-mi con barras de progreso por lenguaje.'),

    block('h2', 'Sanity: el blog que ya no es un array'),
    block('normal', 'Esta fue la parte más larga. Mi blog originalmente era un archivo posts.ts con tres posts hardcodeados. Funcionaba, pero cada vez que quería publicar algo tenía que editar código, commitear y esperar el deploy.'),
    block('normal', 'Sanity es un CMS headless que se embebe dentro de tu propia app de Next.js. Escribes posts desde /studio, se guardan en sus servidores, y tu blog los lee vía queries GROQ.'),
    block('normal', 'Un detalle que casi me vuelve loco: al embeber el Studio en Next.js, el CORS por defecto solo permite localhost:3333 (el puerto del Studio independiente), no el 3000 de tu app. Hay que añadirlo explícitamente:'),
    quote('npx sanity cors add http://localhost:3000 --credentials'),
    block('normal', 'Ese flag --credentials es crítico. Sin él, el Studio puede cargar pero el login se queda en un bucle infinito porque el navegador no envía las cookies de sesión.'),

    block('h2', 'Lo que aprendí'),
    block('normal', 'Tres lecciones que me llevo de esta integración:'),
    block('normal', '1. La API REST de GitHub no sirve para repos pinned. Hay que usar GraphQL. Perdí una hora intentando resolverlo con REST antes de leer la documentación oficial.'),
    block('normal', '2. La caché no es opcional. Si cada visita hace un fetch a la API, revientas el rate limit en un día. Con revalidate: 86400 consumes 3 requests al día en vez de 3000.'),
    block('normal', '3. Los errores de CORS son silenciosos y confusos. El login de Sanity no daba ningún mensaje de error claro — solo un bucle infinito. La solución estaba en un flag de configuración que no aparece en el tutorial básico.'),

    block('h2', 'Lo que viene'),
    block('normal', 'Todavía queda trabajo: conectar este blog a Dev.to para publicar automáticamente, añadir un formulario de contacto con Resend, y eventualmente soporte bilingüe (español/inglés) con next-intl.'),
    block('normal', 'Pero por ahora, el portafolio ya no es un esqueleto. Muestra proyectos reales, cuenta las horas que programo de verdad, y tiene un blog que puedo actualizar sin tocar una sola línea de código.'),
    block('normal', 'Eso se siente bien.'),
  ],
})

console.log('✓ Post creado:', post._id)
console.log('  Slug:', post.slug.current)
