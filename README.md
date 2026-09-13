# 🍦 Ice Cream Digital + 🎬 Documental Factory

Plataforma web consolidada para creación, edición y renderizado de videos verticales. El proyecto reúne en una sola aplicación dos herramientas independientes accesibles mediante pestañas: **Editor Icecream** y **Documental Factory**.

## Estructura del proyecto

```text
/
├── index.html
├── documental_factory.html
└── README.md
```

`index.html` contiene el Editor Icecream, el sistema de acceso y la navegación principal. `documental_factory.html` contiene Documental Factory. La segunda herramienta se carga únicamente cuando se abre su pestaña para evitar consumir memoria innecesariamente mientras se utiliza el editor.

---

## 🍦 Pestaña 1 — Editor Icecream

Editor diseñado para producir videos verticales de forma rápida mediante una cola de hasta **6 videos independientes**.

### Funciones principales

- Carga de video MP4.
- Carga de guion mediante archivo TXT.
- Edición de título y guion.
- Generación automática de voz en español.
- Voz principal **Alexander V** mediante Piper TTS.
- Preview vertical antes del render.
- Títulos y subtítulos integrados.
- Procesamiento independiente por slots.
- Render automático de varios videos.
- Descarga automática de los videos terminados.
- Panel de progreso durante generación de voz y render.
- Sistema de usuarios y panel de administrador.
- Render realizado principalmente en el navegador.

### Formato de salida

- Resolución vertical: **720 × 1280**
- Formato: **MP4**
- Video: H.264
- Audio integrado en el archivo final.

### Música documental integrada

Editor Icecream incorpora automáticamente una cama musical diseñada para contenido documental de curiosidad y misterio.

Configuración actual:

- Estilo: curiosidad / misterio documental.
- Ritmo aproximado: **96 BPM**.
- Volumen base: **16%**.
- Ducking automático cuando habla Alexander.
- Música durante narración: aproximadamente **6–8%**.
- En pausas puede recuperar suavemente hasta aproximadamente **19.5%**.
- Ataque aproximado: **18 ms**.
- Recuperación aproximada: **360 ms**.

La narración y la música se mezclan antes del render final para que el resultado quede incrustado directamente en el MP4.

---

## 🎬 Pestaña 2 — Documental Factory

Herramienta automatizada para convertir guiones TXT en videos documentales verticales utilizando inteligencia artificial, clips de stock, narración y render local.

### Flujo automático

```text
TXT
 ↓
Análisis del guion con IA
 ↓
División automática en escenas
 ↓
Búsqueda de clips relacionados
 ↓
Generación de voz Alexander V
 ↓
Sincronización de escenas
 ↓
Música + ducking
 ↓
Títulos y subtítulos
 ↓
Render FFmpeg
 ↓
MP4 final
```

### Archivos TXT

Cada archivo utiliza este formato:

```text
Título del video

Aquí comienza el guion completo del documental...
```

La primera línea no vacía se utiliza como título y nombre del archivo final. El resto del contenido se procesa como narración.

### Procesamiento por lotes

Documental Factory permite cargar hasta **48 archivos TXT**.

Los documentales se procesan secuencialmente para reducir problemas de memoria del navegador y mantener estable FFmpeg.wasm.

Si un documental presenta un error, la cola puede continuar con el siguiente.

### Inteligencia artificial

La aplicación utiliza **Groq** para analizar los guiones y crear las búsquedas necesarias para cada escena.

Modelo utilizado:

```text
openai/gpt-oss-20b
```

La clave API se introduce desde la aplicación y se almacena localmente en el navegador.

### Clips de video

Las escenas pueden buscar material relacionado mediante:

- Pexels
- Pixabay

La aplicación intenta evitar repeticiones y utiliza varias consultas relacionadas con cada escena para mejorar la precisión visual.

### Narración

Motor:

**Piper TTS Web**

Voz fija:

**Alexander V — Español ES (Masculino)**

Modelo:

```text
es_ES-sharvard-medium
```

La voz se genera directamente desde el navegador.

### Música y ducking

Documental Factory utiliza la misma línea sonora documental de curiosidad/misterio.

- Música base: **16%**.
- Ducking automático durante la narración.
- Aproximadamente **6–8%** mientras habla Alexander.
- Recuperación gradual durante pausas.
- Música generada/procesada dentro de la aplicación.
- No requiere subir manualmente una pista musical para el flujo normal.

### Títulos y subtítulos

El video final incorpora:

- Título superior.
- Texto blanco destacado.
- Palabras seleccionadas en amarillo.
- Fondo/sombra oscura para mejorar legibilidad.
- Subtítulos sincronizados con la narración.
- Máximo aproximado de dos líneas en el estilo documental.

### Render

El procesamiento final utiliza **FFmpeg.wasm** directamente en el navegador.

Características:

- 720 × 1280.
- 30 FPS.
- H.264.
- Audio AAC.
- Render local.
- Indicador de progreso.
- Reinicio del motor FFmpeg entre documentales para controlar el consumo de memoria.

---

## 🔑 APIs necesarias

Dependiendo de las funciones utilizadas, Documental Factory puede requerir claves personales para:

- Groq
- Pexels
- Pixabay

Las claves no deben escribirse directamente dentro del código ni publicarse en GitHub.

La aplicación utiliza un enfoque **BYOK — Bring Your Own Key**, donde cada usuario introduce sus propias claves.

> Nunca publiques claves API privadas dentro del repositorio.

---

## 🧠 Procesamiento local

Gran parte del trabajo pesado se ejecuta directamente en el navegador del usuario:

- Piper TTS.
- Mezcla de audio.
- Música.
- Ducking.
- FFmpeg.wasm.
- Render.
- Preparación del MP4.

Por esta razón, el rendimiento depende de la memoria RAM, CPU y navegador del equipo.

Durante un render largo se recomienda mantener abierta la aplicación y evitar que Windows entre en suspensión.

---

## 🌐 Despliegue

El proyecto puede alojarse como aplicación web estática.

Está preparado para funcionar con servicios como:

- GitHub
- Vercel

Para desplegarlo deben mantenerse juntos en la raíz:

```text
index.html
documental_factory.html
README.md
```

El archivo principal del sitio es:

```text
index.html
```

---

## 🔐 Editor Icecream — usuarios

Editor Icecream incluye un sistema de acceso para administrar usuarios y planes.

El sistema contempla:

- Inicio de sesión.
- Usuarios individuales.
- Estado de suscripción.
- Días restantes.
- Renovación.
- Planes.
- Panel administrativo.

La infraestructura de autenticación debe mantenerse configurada según el backend utilizado por el proyecto.

---

## ⚙️ Arquitectura de las dos pestañas

Las herramientas se mantienen separadas internamente.

```text
Ice Cream Digital
│
├── 🍦 Editor Icecream
│   ├── 6 slots
│   ├── Piper TTS
│   ├── música + ducking
│   ├── preview
│   └── render
│
└── 🎬 Documental Factory
    ├── hasta 48 TXT
    ├── Groq
    ├── Pexels / Pixabay
    ├── Alexander V
    ├── música + ducking
    └── FFmpeg.wasm
```

Documental Factory se carga cuando el usuario abre su pestaña. Esto ayuda a evitar que dos entornos pesados de TTS/FFmpeg se carguen simultáneamente sin necesidad.

---

## 📱 Objetivo del proyecto

El objetivo de **Ice Cream Digital + Documental Factory** es concentrar en una sola plataforma dos flujos de producción:

**Editor Icecream** para editar y producir videos a partir de material existente.

**Documental Factory** para automatizar la creación de documentales a partir de guiones TXT.

Ambas herramientas comparten una filosofía de trabajo: automatizar la mayor cantidad posible del proceso, mantener una salida vertical consistente y realizar el procesamiento pesado directamente en el navegador.

---

## ⚠️ Uso de contenido

El usuario es responsable de utilizar videos, imágenes, música y demás material para el cual tenga derechos, autorización o una licencia compatible con su uso.

---

## Versión consolidada

**Ice Cream Digital + Documental Factory**

- Pestaña 1: Editor Icecream
- Pestaña 2: Documental Factory
- Voz: Alexander V
- Música documental integrada
- Ducking automático
- Render en navegador
- Interfaz unificada
