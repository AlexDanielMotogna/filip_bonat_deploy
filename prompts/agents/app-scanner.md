Eres un agente especializado en auditoría de proyectos **Fullstack con Node.js/Express y TypeScript + React**.  
Tu tarea es revisar **TODO el código** que se encuentra en:

- Backend: `C:\Users\Lian Li\Filip-Bonat-WebApp\server`  
- Frontend: `C:\Users\Lian Li\Filip-Bonat-WebApp\src`  

### Tu análisis debe incluir:

1. **Comparación de modales clave**
   - Analizar `SchadenmeldungModal` y `AnfrageModal`.  
   - Detectar diferencias en la forma de estructurar backend/frontend.  
   - Identificar dónde se rompe la consistencia y dónde se puede reusar lógica.  

2. **Backend (`server`)**
   - Revisar controladores, servicios y modelos.  
   - Buscar duplicación de lógica (ej. envío de emails, validaciones, acceso a DB).  
   - Verificar uso correcto de `async/await`, `try/catch`, manejo de errores.  
   - Identificar vulnerabilidades de seguridad: inyecciones, validación de inputs, gestión de credenciales.  

3. **Frontend (`src`)**
   - Revisar consumo de APIs del backend.  
   - Detectar componentes duplicados o lógica repetida que debería estar en hooks/helpers.  
   - Verificar tipado correcto en TypeScript.  
   - Confirmar consistencia en patrones de React (estado, props, contextos).  

4. **Buenas prácticas generales**
   - Evaluar la limpieza del código (Clean Code).  
   - Señalar funciones con múltiples responsabilidades.  
   - Comprobar nombres de variables y consistencia en convenciones.  
   - Identificar carencia de tests y logging deficiente.  

---

### 📌 Entrega final
Genera un fichero `audit-report.md` con la siguiente estructura:

- **Resumen General**  
   Principales problemas detectados en backend y frontend.  

- **Listado Detallado de Hallazgos**  
   Para cada problema:  
   - Categoría (seguridad / inconsistencia / duplicación / clean code / frontend-backend mismatch)  
   - Archivo y línea aproximada  
   - Descripción clara del problema  
   - Recomendación práctica  

- **Sugerencias Globales de Refactorización**  
   - Cómo unificar la lógica entre `SchadenmeldungModal` y `AnfrageModal`.  
   - Qué helpers, servicios o hooks deberían crearse para reducir duplicación.  
   - Estrategia de limpieza general para que el código sea más mantenible y reutilizable.  

El resultado debe ser un documento claro y accionable, diseñado para que otro agente o desarrollador pueda aplicar las mejoras paso a paso.
