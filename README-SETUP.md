# Filip Bonat WebApp - Setup Instructions

## 🚀 Cómo ejecutar el proyecto después de la refactorización

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- MongoDB Atlas (ya configurado en .env)

### 📋 Pasos para ejecutar:

#### 1. Instalar dependencias

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

#### 2. Configurar variables de entorno

**Frontend (.env en la raíz):**
```
VITE_API_URL=http://localhost:5000
```

**Backend (server/.env):**
```
DATABASE_URL=mongodb+srv://...
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@your-domain.com
SMTP_PASS=your-email-password
SMTP_FROM=your-email@your-domain.com
ANFRAGE_RECIPIENT_EMAIL=recipient@your-domain.com
SCHADEN_RECIPIENT_EMAIL=recipient@your-domain.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### 3. Ejecutar el proyecto

**OPCIÓN A - Scripts automáticos (Recomendado):**

**Windows:**
```bash
# Doble clic en el archivo o ejecutar en terminal:
start-server.bat
```

**Linux/Mac:**
```bash
# Dar permisos y ejecutar:
chmod +x start-server.sh
./start-server.sh
```

**OPCIÓN B - Manual:**

**Terminal 1 - Backend:**
```bash
cd server
npm install  # Solo la primera vez
npm run dev
```
Deberías ver:
```
✅ Server läuft auf http://localhost:5000
📋 Available routes:
   POST /api/anfrage
   POST /api/schadenmeldung
   GET  /health
```

**Terminal 2 - Frontend:**
```bash
npm install  # Solo la primera vez
npm run dev
```

#### 4. Verificar que todo funciona

1. **Health Check del servidor:**
   - Abre: http://localhost:5000/health
   - Deberías ver: `{"success":true,"message":"Server is running","timestamp":"..."}`

2. **Frontend:**
   - Abre: http://localhost:3000 (o el puerto que indique Vite)
   - Abre la consola del navegador para ver los logs de debugging

### 🔍 Debugging

Los logs están configurados para mostrar información detallada:

**Frontend (Consola del navegador):**
```
🔄 SchadenMeldung form submission started
✅ Form validation passed
📁 Processing files: 0 files
📤 Submitting data to API
🌐 Making API call to: http://localhost:5000/api/schadenmeldung
📦 Request payload: {...}
📡 Response status: 200 OK
📥 Response data: {...}
✅ API call successful
```

**Backend (Terminal del servidor):**
```
📝 POST /api/schadenmeldung - 2025-09-13T17:18:00.000Z
```

### ❌ Solución de problemas

#### Error: `ERR_CONNECTION_REFUSED`
- **Causa:** El servidor backend no está ejecutándose
- **Solución:** Ejecutar `cd server && npm run dev`

#### Error: `process is not defined`
- **Causa:** Variables de entorno mal configuradas
- **Solución:** Verificar que existe `.env` en la raíz con `VITE_API_URL=http://localhost:5000`

#### Error: `404 Not Found`
- **Causa:** Rutas no registradas correctamente
- **Solución:** Verificar que el servidor muestre las rutas disponibles al iniciar

### 📊 Endpoints disponibles

- `GET /health` - Health check del servidor
- `POST /api/anfrage` - Envío de formulario de anfrage
- `POST /api/schadenmeldung` - Envío de formulario de schadenmeldung

### 🔧 Scripts útiles

**Verificar servidor:**
```bash
curl http://localhost:5000/health
```

**Test de endpoints:**
```bash
# Test anfrage
curl -X POST http://localhost:5000/api/anfrage \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"123456789","message":"Test message","unterlagen":"","category":"test","subcategory":"test","uploadedFiles":[]}'

# Test schadenmeldung
curl -X POST http://localhost:5000/api/schadenmeldung \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","telefon":"123456789","wiePassiert":"Test","woPassiert":"Test","wannPassiert":"2025-01-01T10:00:00.000Z","uploadedFiles":[]}'
```

### 🎯 Funcionalidades implementadas

- ✅ Rate limiting (5 req/15min para anfrage, 3 req/15min para schadenmeldung)
- ✅ Validación robusta de inputs
- ✅ Sanitización XSS
- ✅ Manejo unificado de archivos
- ✅ Servicios de email centralizados
- ✅ Logging detallado para debugging
- ✅ Hooks personalizados para React
- ✅ Configuración centralizada de APIs

### 📝 Notas importantes

1. **Ambos servidores deben estar ejecutándose** para que la aplicación funcione
2. **Los logs en la consola** te ayudarán a identificar cualquier problema
3. **El health check** es útil para verificar que el backend está funcionando
4. **Las variables de entorno** son críticas para el funcionamiento correcto
