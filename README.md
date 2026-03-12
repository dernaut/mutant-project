# 🧬 ADN Scanner — Mutant Detector

Sistema de detección de mutantes basado en análisis de secuencias de ADN, desarrollado con **Angular** y desplegable con **Docker**.

---

## ¿Qué hace?

Analiza una matriz de ADN (NxN) e identifica si un humano es **mutante** o **humano normal** buscando secuencias repetidas de bases nitrogenadas en múltiples direcciones.

Un humano es **mutante** si su ADN contiene **más de una secuencia de 4 letras iguales consecutivas** en cualquiera de estas direcciones:

| Dirección | Ejemplo |
|---|---|
| Horizontal → | `CCCC` |
| Vertical ↓ | columna con `AAAA` |
| Diagonal ↘ | diagonal principal con `GGGG` |
| Diagonal ↗ | diagonal inversa con `TTTT` |

---

## Ejemplos

### 🧬 Caso Mutante — `isMutant(dna)` retorna `true`

```
A T G C G A
C A G T G C
T T T T G T   ← secuencia TTTT (horizontal)
A G A A G G
C C C C T A   ← secuencia CCCC (horizontal)
T C A C T G
```

Se encuentran **2 secuencias**: `TTTT` y `CCCC` → **MUTANTE** ✅

---

### 🧑 Caso Humano — `isMutant(dna)` retorna `false`

```
A T G C G A
C A G T G C
T T A T T T
A G A C G G
G C G T C A
T C A C T G
```

No se encuentran más de una secuencia de 4 letras iguales → **HUMANO** ❌

---

## Algoritmo

```typescript
isMutant(dna: string[]): boolean
```

### Características

- **Complejidad**: `O(N²)` — recorre cada celda de la matriz una sola vez
- **Early exit**: detiene la búsqueda inmediatamente al encontrar la segunda secuencia, sin recorrer el resto de la matriz
- **4 direcciones de búsqueda**: horizontal, vertical, diagonal ↘ y diagonal ↗
- **Validación de entrada**: solo acepta bases nitrogenadas válidas (`A`, `T`, `C`, `G`) y matriz cuadrada NxN

### Flujo del algoritmo

```
Para cada celda (r, c) de la matriz:
  Para cada dirección [dr, dc]:
    Verificar si hay 4 letras iguales consecutivas
    Si se encuentra una secuencia → contador++
    Si contador > 1 → retornar true (early exit)
Retornar false
```

---

## Estructura del proyecto

```
mutant-project/
├── src/
│   └── app/
│       ├── core/
│       │   └── mutant.service.ts        ← algoritmo principal
│       ├── components/
│       │   └── dna-scanner/
│       │       ├── dna-scanner.component.ts    ← lógica del componente
│       │       ├── dna-scanner.component.html  ← template
│       │       └── dna-scanner.component.scss  ← estilos
│       ├── models/
│       │   └── mutant.model.ts          ← interfaces TypeScript
│       └── app.component.ts
├── Dockerfile                           ← build con Node + Nginx
├── docker-compose.yml                   ← orquestación
├── nginx.conf                           ← config para Angular SPA
└── README.md
```

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Angular | Framework frontend (Standalone Components) |
| TypeScript | Lenguaje principal |
| SCSS + Bootstrap | Estilos |
| Angular Animations | Animaciones de UI |
| Docker + Nginx | Contenedorización y despliegue |

---

## Ejecución con Docker

```bash
# 1. Clonar el repositorio
git clone https://github.com/dernaut/mutant-project.git
cd mutant-project

# 2. Construir y levantar el contenedor
docker compose up --build

# 3. Abrir en el navegador
http://localhost:4200
```

---

## Ejecución local

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar servidor de desarrollo
npm start

# 3. Abrir en el navegador
http://localhost:4200
```

---

## Uso de la aplicación

1. Ingresa las filas del ADN en los campos de texto (solo caracteres `A`, `T`, `C`, `G`)
2. Puedes usar los botones **Cargar Mutante** o **Cargar Humano** para cargar datos de prueba
3. Presiona **EJECUTAR ANÁLISIS**
4. El sistema mostrará el resultado y resaltará visualmente las secuencias detectadas en la matriz

---

## Autor

Desarrollado por **Julian Giraldo Cardona** como parte del taller de Full Stack **SETI**.
