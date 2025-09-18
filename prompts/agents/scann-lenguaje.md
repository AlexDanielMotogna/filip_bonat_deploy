Quiero que actúes como un asistente especializado en internacionalización (i18n) para proyectos React.

1. Escanea TODO el código de la aplicación (componentes, páginas, layouts).
2. Identifica todos los textos hardcodeados que estén visibles al usuario (ejemplo: títulos, botones, párrafos, placeholders, labels, etc.).
3. Verifica si esos textos ya están envueltos en la función `t("...")` de i18next.
   - Si ya tienen `t("...")`, ignóralos.
   - Si NO lo tienen, proponme la clave que deberían tener. Ejemplo:
     Texto: "KREDITRECHNER"
     Clave: "navbar.kreditrechner"
4. En el archivo "i18n.js" verifica si estan todas las traducciones de todos los textos de todos los ficheros para los siguientes idiomas
   - Alemán (de)
   - Inglés (en)
   - Español (es)
   - Polaco (pl)
   - Croata (hr)
   - Húngaro (hu)
   - Rumano (ro)
   - Eslovaco (sk)
   - Esloveno (sl)

6. Genera un **reporte de cambios** en formato Markdown con:
   - El archivo donde encontraste cada texto
   - El texto original
   - La clave propuesta para `t("...")`
   - La línea aproximada donde está

7. Finalmente, entrega:
   - Los JSONs traducidos por idioma
   - El reporte Markdown
   - El listado de snippets de código donde debo reemplazar el texto plano por `t("clave")`.
