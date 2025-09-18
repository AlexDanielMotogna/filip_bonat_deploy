# ✅ Pre-Migration Checklist

## 🔍 Verificación Final Antes de Migrar

Antes de ejecutar la migración al nuevo repositorio, verifica que todos estos elementos estén correctos:

### 🔒 Seguridad - CRÍTICO

- [ ] **Archivo `.env` eliminado** - No debe existir en el directorio raíz
- [ ] **Archivo `servicesandcost.md` eliminado** - Contenía credenciales expuestas
- [ ] **Archivo `server/.env` eliminado** - No debe existir credenciales reales
- [ ] **`.env.example` limpio** - Solo contiene placeholders seguros
- [ ] **`server/.env.example` limpio** - Solo contiene placeholders seguros
- [ ] **`audit-report.md` sin credenciales** - Solo contiene placeholders XXXXXXX

### 📁 Archivos Requeridos

- [ ] **`README.md`** - Documentación principal actualizada
- [ ] **`MIGRATION-TO-NEW-REPO-GUIDE.md`** - Guía de migración completa
- [ ] **`migrate-to-new-repo.bat`** - Script de migración automatizado
- [ ] **`commit-and-push.bat`** - Script de commit y push
- [ ] **`.gitignore`** - Configuración actualizada para prevenir exposiciones
- [ ] **`vercel.json`** - Configuración de despliegue
- [ ] **`package.json`** - Dependencias del frontend
- [ ] **`server/package.json`** - Dependencias del backend

### 🗂️ Estructura de Directorios

- [ ] **`src/`** - Código fuente del frontend
- [ ] **`server/`** - Código fuente del backend
- [ ] **`api/`** - Funciones serverless de Vercel
- [ ] **`public/`** - Assets públicos
- [ ] **`reports/`** - Reportes y documentación

### 🔧 Configuración

- [ ] **`.gitignore` actualizado** - Incluye todos los archivos sensibles
- [ ] **`vercel.json` configurado** - Para despliegue correcto
- [ ] **Scripts de migración ejecutables** - Permisos correctos
- [ ] **Documentación completa** - Todas las guías necesarias

### 📝 Documentación

- [ ] **README.md** - Información del proyecto actualizada
- [ ] **README-SETUP.md** - Guía de configuración
- [ ] **VERCEL-DEPLOYMENT-GUIDE.md** - Guía de despliegue
- [ ] **audit-report.md** - Reporte de auditoría de seguridad
- [ ] **EMAIL-CONFIRMATION-IMPLEMENTATION.md** - Guía de emails

## 🚨 Verificación de Archivos Sensibles

### ❌ Archivos que NO deben existir:
```bash
# Ejecutar estos comandos para verificar:
ls -la .env 2>/dev/null && echo "❌ ENCONTRADO: .env" || echo "✅ OK: .env no existe"
ls -la server/.env 2>/dev/null && echo "❌ ENCONTRADO: server/.env" || echo "✅ OK: server/.env no existe"
ls -la servicesandcost.md 2>/dev/null && echo "❌ ENCONTRADO: servicesandcost.md" || echo "✅ OK: servicesandcost.md no existe"
```

### ✅ Archivos que DEBEN existir:
```bash
# Verificar archivos críticos:
ls -la .env.example && echo "✅ OK: .env.example existe"
ls -la server/.env.example && echo "✅ OK: server/.env.example existe"
ls -la .gitignore && echo "✅ OK: .gitignore existe"
ls -la README.md && echo "✅ OK: README.md existe"
```

## 🔍 Verificación de Contenido

### Verificar `.env.example`:
- [ ] No contiene credenciales reales
- [ ] Solo tiene placeholders como `your-api-key-here`
- [ ] Incluye comentarios explicativos

### Verificar `server/.env.example`:
- [ ] No contiene credenciales reales
- [ ] Solo tiene placeholders seguros
- [ ] Incluye instrucciones de configuración

### Verificar `audit-report.md`:
- [ ] Las credenciales están reemplazadas por `XXXXXXX`
- [ ] No contiene API keys reales
- [ ] Mantiene la información de seguridad sin exponer secretos

## 🎯 Pasos de Migración

Una vez verificado todo el checklist:

1. **Ejecutar migración**:
   ```bash
   ./migrate-to-new-repo.bat
   ```

2. **Crear repositorio en GitHub**:
   - Nombre: `filip-bonat-webapp-v2`
   - Privado inicialmente
   - Sin inicializar con archivos

3. **Commit y push**:
   ```bash
   ./commit-and-push.bat
   ```

4. **Verificar resultado**:
   - Repositorio creado exitosamente
   - Sin alertas de GitHub Push Protection
   - Todos los archivos subidos correctamente

## ⚠️ Acciones Post-Migración

Después de la migración exitosa:

1. **Regenerar credenciales**:
   - [ ] SendGrid API key
   - [ ] Cloudinary API keys
   - [ ] Contraseñas de email
   - [ ] Database credentials

2. **Configurar Vercel**:
   - [ ] Conectar nuevo repositorio
   - [ ] Configurar variables de entorno
   - [ ] Probar despliegue

3. **Verificar funcionalidad**:
   - [ ] Frontend carga correctamente
   - [ ] Backend responde
   - [ ] Emails se envían
   - [ ] Upload de archivos funciona

## 🎉 Resultado Esperado

Al completar la migración:
- ✅ Repositorio limpio sin credenciales expuestas
- ✅ Historial de Git limpio
- ✅ GitHub Push Protection no se activa
- ✅ Documentación completa y actualizada
- ✅ Scripts de automatización incluidos
- ✅ Configuración segura para producción

---

**🔒 IMPORTANTE**: No proceder con la migración hasta que todos los elementos del checklist estén verificados y marcados como completados.
