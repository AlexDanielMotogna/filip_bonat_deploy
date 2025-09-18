# ✅ Checklist de Despliegue en Vercel - Filip Bonat WebApp

## 🚀 PASO A PASO PARA VERCEL

### PASO 1: Conectar Repositorio a Vercel

1. **Ve a Vercel**: https://vercel.com
2. **Inicia sesión** con tu cuenta de GitHub
3. **Click en "Add New..."** → **"Project"**
4. **Import Git Repository**:
   - Busca: `filip_bonat_deploy`
   - Click **"Import"**

### PASO 2: Configurar Build Settings

Vercel debería detectar automáticamente:
- ✅ **Framework Preset**: Vite
- ✅ **Build Command**: `npm run build`
- ✅ **Output Directory**: `dist`
- ✅ **Install Command**: `npm install`

Si no, configúralos manualmente.

### PASO 3: Configurar Variables de Entorno

**CRÍTICO**: En Vercel, ve a **Settings** → **Environment Variables** y agrega:

```bash
# Base de Datos (TUS NUEVAS CREDENCIALES)
DATABASE_URL=mongodb+srv://alexdanielmotogna_db_user:TU-NUEVA-PASSWORD@clusterfb.engg3bl.mongodb.net/filipbonat?retryWrites=true&w=majority&appName=ClusterFB

# Email SMTP (TUS NUEVAS CREDENCIALES)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=website@filip-bonat.at
SMTP_PASS=TU-NUEVA-PASSWORD-EMAIL
SMTP_FROM=website@filip-bonat.at

# Destinatarios de Email
RECIPIENT_EMAIL=filip.bonat@finova.at
ANFRAGE_RECIPIENT_EMAIL=filip.bonat@finova.at
SCHADEN_RECIPIENT_EMAIL=filip.bonat@finova.at

# Cloudinary (TUS NUEVAS CREDENCIALES)
CLOUDINARY_CLOUD_NAME=doaiuthjn
CLOUDINARY_API_KEY=TU-NUEVO-API-KEY
CLOUDINARY_API_SECRET=TU-NUEVO-API-SECRET
```

**⚠️ IMPORTANTE**: Reemplaza con tus credenciales reales regeneradas

### PASO 4: Deploy

1. **Click "Deploy"**
2. **Espera** el build (2-5 minutos)
3. **Vercel te dará una URL** como: `https://filip-bonat-deploy-xxx.vercel.app`

### PASO 5: Testing Inicial

Una vez desplegado, prueba:

1. **Frontend**: Abre la URL de Vercel
2. **Health Check**: `https://tu-url.vercel.app/api/health` (si existe)
3. **Navegación**: Prueba todas las páginas

### PASO 6: Testing de APIs

Prueba los endpoints principales:

```bash
# Test Anfrage API
curl -X POST https://tu-url.vercel.app/api/anfrage \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+43123456789",
    "message": "Test message",
    "category": "test",
    "subcategory": "test"
  }'

# Test Schadenmeldung API
curl -X POST https://tu-url.vercel.app/api/schadenmeldung \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "telefon": "+43123456789",
    "wiePassiert": "Test damage",
    "woPassiert": "Test location",
    "wannPassiert": "2024-01-01T10:00:00Z"
  }'
```

### PASO 7: Testing de Funcionalidades

Prueba en el navegador:

- [ ] ✅ Página principal carga
- [ ] ✅ Formulario de Anfrage funciona
- [ ] ✅ Formulario de Schadenmeldung funciona
- [ ] ✅ Calculadora de crédito funciona
- [ ] ✅ Upload de archivos funciona
- [ ] ✅ Emails se envían correctamente

---

## 🔧 Si hay problemas:

### Error de Build:
- Revisa los logs en Vercel
- Verifica que todas las dependencias estén en package.json

### Error de Variables de Entorno:
- Verifica que todas las variables estén configuradas
- Asegúrate de que no haya espacios extra

### Error de Base de Datos:
- Verifica la nueva DATABASE_URL
- Asegúrate de que MongoDB Atlas permita conexiones desde Vercel

### Error de Email:
- Verifica las nuevas credenciales SMTP
- Prueba las credenciales manualmente

---

## 🎯 Una vez que todo funcione en Vercel:

Procederemos a configurar el dominio personalizado `filip-bonat.at`

**¿Estás listo para empezar con Vercel?**
