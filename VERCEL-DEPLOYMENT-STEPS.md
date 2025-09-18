# 🚀 Guía de Despliegue en Vercel - Filip Bonat WebApp

## 📋 Pasos para Desplegar en Vercel

### PASO 1: Preparar Variables de Entorno

**CRÍTICO**: Antes de desplegar, necesitas regenerar TODAS las credenciales expuestas:

#### 🔄 Regenerar Credenciales (OBLIGATORIO)

1. **MongoDB Atlas**:
   - Ve a MongoDB Atlas → Database Access
   - Crea un nuevo usuario o cambia la contraseña del existente
   - Copia la nueva CONNECTION STRING

2. **Email SMTP (Hostinger)**:
   - Ve a tu panel de Hostinger
   - Cambia la contraseña de `website@filip-bonat.at`
   - Anota la nueva contraseña

3. **Cloudinary**:
   - Ve a Cloudinary Dashboard → Settings → Security
   - Regenera API Key y API Secret
   - Copia las nuevas credenciales

### PASO 2: Conectar Repositorio a Vercel

1. **Ve a Vercel**: https://vercel.com
2. **Inicia sesión** con tu cuenta de GitHub
3. **Import Project**:
   - Click en "Add New..." → "Project"
   - Selecciona "Import Git Repository"
   - Busca: `filip_bonat_deploy`
   - Click "Import"

### PASO 3: Configurar Variables de Entorno en Vercel

En la página de configuración del proyecto:

1. **Ve a Settings → Environment Variables**
2. **Agrega las siguientes variables**:

```bash
# Base de Datos (USA LAS NUEVAS CREDENCIALES)
DATABASE_URL=mongodb+srv://TU-NUEVO-USUARIO:TU-NUEVA-PASSWORD@clusterfb.engg3bl.mongodb.net/filipbonat?retryWrites=true&w=majority&appName=ClusterFB

# Email SMTP (USA LA NUEVA PASSWORD)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=website@filip-bonat.at
SMTP_PASS=TU-NUEVA-PASSWORD-SMTP
SMTP_FROM=website@filip-bonat.at

# Destinatarios de Email
RECIPIENT_EMAIL=filip.bonat@finova.at
ANFRAGE_RECIPIENT_EMAIL=filip.bonat@finova.at
SCHADEN_RECIPIENT_EMAIL=filip.bonat@finova.at

# Cloudinary (USA LAS NUEVAS CREDENCIALES)
CLOUDINARY_CLOUD_NAME=TU-NUEVO-CLOUD-NAME
CLOUDINARY_API_KEY=TU-NUEVO-API-KEY
CLOUDINARY_API_SECRET=TU-NUEVO-API-SECRET
```

### PASO 4: Configurar Build Settings

En Vercel, asegúrate de que:

1. **Framework Preset**: Vite
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Install Command**: `npm install`

### PASO 5: Deploy

1. **Click "Deploy"**
2. **Espera** a que termine el build (2-5 minutos)
3. **Vercel te dará una URL** como: `https://filip-bonat-deploy-xxx.vercel.app`

### PASO 6: Testing en Vercel

Una vez desplegado, prueba:

1. **Frontend**: Abre la URL de Vercel
2. **APIs**: Prueba los endpoints:
   - `https://tu-url.vercel.app/api/anfrage`
   - `https://tu-url.vercel.app/api/schadenmeldung`
   - `https://tu-url.vercel.app/api/kredit-anfrage`

3. **Funcionalidades**:
   - ✅ Formulario de Anfrage
   - ✅ Formulario de Schadenmeldung
   - ✅ Calculadora de crédito
   - ✅ Upload de archivos
   - ✅ Envío de emails

### PASO 7: Configurar Dominio Personalizado (filip-bonat.at)

Una vez que confirmes que todo funciona en Vercel:

1. **Ve a Settings → Domains** en tu proyecto de Vercel
2. **Add Domain**: `filip-bonat.at`
3. **Vercel te dará instrucciones DNS**:
   - Tipo: `A Record`
   - Name: `@`
   - Value: `76.76.19.61` (IP de Vercel)
   
   Y también:
   - Tipo: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

4. **Configura DNS en tu proveedor de dominio**:
   - Ve al panel de control de tu dominio
   - Actualiza los registros DNS según las instrucciones de Vercel

5. **Espera propagación DNS** (puede tomar hasta 24 horas)

### PASO 8: Verificación Final

Una vez configurado el dominio:

1. **Prueba**: https://filip-bonat.at
2. **Prueba**: https://www.filip-bonat.at
3. **Verifica SSL**: Debe mostrar el candado verde
4. **Prueba todas las funcionalidades**

## 🔧 Comandos de Testing

```bash
# Test Anfrage API
curl -X POST https://filip-bonat.at/api/anfrage \
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
curl -X POST https://filip-bonat.at/api/schadenmeldung \
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

## ❌ Troubleshooting

### Error: "Build Failed"
- Verifica que todas las variables de entorno estén configuradas
- Revisa los logs de build en Vercel

### Error: "Function Timeout"
- Las funciones de Vercel tienen límite de 10 segundos
- Optimiza el código si es necesario

### Error: "Database Connection Failed"
- Verifica que la DATABASE_URL sea correcta
- Asegúrate de que MongoDB Atlas permita conexiones desde Vercel

### Error: "Email Not Sending"
- Verifica credenciales SMTP
- Comprueba que los destinatarios estén configurados

## 📊 Monitoreo

Una vez en producción:

1. **Vercel Analytics**: Ve a Analytics en tu dashboard
2. **Function Logs**: Revisa logs en Functions tab
3. **Performance**: Monitorea tiempos de respuesta

---

## 🎯 Próximos Pasos

1. **Regenerar credenciales** (CRÍTICO)
2. **Desplegar en Vercel** para testing
3. **Verificar funcionalidades**
4. **Configurar dominio personalizado**
5. **Testing final en producción**

¿Estás listo para empezar? ¡Vamos paso a paso!
