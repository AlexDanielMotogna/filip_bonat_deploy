# 🚀 Guía de Deployment en Vercel - Filip Bonat WebApp

## ✅ Configuración Completada

### 📁 Archivos Creados/Modificados:
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `api/anfrage.js` - API de anfrage como Vercel Function
- ✅ `api/schadenmeldung.js` - API de schadenmeldung como Vercel Function  
- ✅ `api/kredit-anfrage.js` - API de kredit-anfrage como Vercel Function
- ✅ `src/config/api.ts` - URLs actualizadas para producción
- ✅ `package.json` - Dependencias agregadas (cloudinary, pdf-lib, prisma)
- ✅ `.env.example` - Template de variables de entorno

## 🔧 Pasos para Deployment

### 1. **Conectar con GitHub (si no está conectado)**
```bash
# Asegúrate de que todos los cambios estén committeados
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 2. **Configurar Variables de Entorno en Vercel**

Ve a tu proyecto en Vercel Dashboard → Settings → Environment Variables y agrega:

#### **Base de Datos:**
```
DATABASE_URL=mongodb+srv://alexdanielmotogna_db_user:mogcAxThURVqt40z@clusterfb.engg3bl.mongodb.net/filipbonat?retryWrites=true&w=majority&appName=ClusterFB
```

#### **Email (SMTP):**
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=website@filip-bonat.at
SMTP_PASS=BlackBorne2593@
SMTP_FROM=website@filip-bonat.at
```

#### **Destinatarios de Email:**
```
RECIPIENT_EMAIL=filip.bonat@finova.at
ANFRAGE_RECIPIENT_EMAIL=filip.bonat@finova.at
SCHADEN_RECIPIENT_EMAIL=filip.bonat@finova.at
```

#### **Cloudinary:**
```
CLOUDINARY_CLOUD_NAME=doaiuthjn
CLOUDINARY_API_KEY=815762748345462
CLOUDINARY_API_SECRET=eGLvREtJvjLupf0VUYWOyQ4Q_9Q
```

### 3. **Deploy Automático**
Una vez configuradas las variables de entorno, Vercel hará deploy automáticamente desde GitHub.

### 4. **Verificar URLs**
Tu aplicación estará disponible en:
- **Frontend:** `https://filip-bonat-lllx.vercel.app`
- **APIs:** 
  - `https://filip-bonat-lllx.vercel.app/api/anfrage`
  - `https://filip-bonat-lllx.vercel.app/api/schadenmeldung`
  - `https://filip-bonat-lllx.vercel.app/api/kredit-anfrage`

## 🧪 Testing de APIs

### Test Anfrage API:
```bash
curl -X POST https://filip-bonat-lllx.vercel.app/api/anfrage \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+43123456789",
    "message": "Test message",
    "category": "test",
    "subcategory": "test"
  }'
```

### Test Schadenmeldung API:
```bash
curl -X POST https://filip-bonat-lllx.vercel.app/api/schadenmeldung \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "telefon": "+43123456789",
    "wiePassiert": "Test damage description",
    "woPassiert": "Test location",
    "wannPassiert": "2024-01-01T10:00:00Z"
  }'
```

### Test Kredit-Anfrage API:
```bash
curl -X POST https://filip-bonat-lllx.vercel.app/api/kredit-anfrage \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+43123456789",
    "kreditDetails": {
      "kreditbetrag": 10000,
      "laufzeit": 24,
      "zinssatz": 3.5,
      "kreditkosten": 1.2,
      "monatlicheRate": 450,
      "gesamtrueckzahlung": 10800,
      "zinsen": 800
    }
  }'
```

## 🔍 Verificación de Funcionalidades

### ✅ Checklist de Testing:
- [ ] **Frontend carga correctamente**
- [ ] **Formulario de Anfrage funciona**
- [ ] **Formulario de Schadenmeldung funciona**
- [ ] **Calculadora de crédito funciona**
- [ ] **Subida de archivos funciona**
- [ ] **Conversión de imágenes a PDF funciona**
- [ ] **Emails se envían correctamente**
- [ ] **Base de datos guarda registros**

## 🚨 Troubleshooting

### Problemas Comunes:

#### **1. Error 500 en APIs**
- Verificar que todas las variables de entorno están configuradas
- Revisar logs en Vercel Dashboard → Functions → View Function Logs

#### **2. Emails no se envían**
- Verificar credenciales SMTP
- Comprobar que los destinatarios están configurados

#### **3. Base de datos no conecta**
- Verificar DATABASE_URL
- Comprobar que MongoDB Atlas permite conexiones desde Vercel

#### **4. Archivos no se suben**
- Verificar credenciales de Cloudinary
- Comprobar límites de tamaño (25MB)

## 📊 Monitoreo

### Logs de Vercel:
1. Ve a Vercel Dashboard
2. Selecciona tu proyecto
3. Ve a "Functions" tab
4. Click en cualquier función para ver logs

### Métricas:
- **Response Time:** < 5 segundos
- **Success Rate:** > 99%
- **Error Rate:** < 1%

## 🔄 Actualizaciones Futuras

Para actualizar la aplicación:
1. Hacer cambios en el código
2. Commit y push a GitHub
3. Vercel hace deploy automáticamente
4. Verificar que todo funciona

## 🎯 Próximos Pasos

1. **Configurar dominio personalizado** (opcional)
2. **Configurar SSL** (automático en Vercel)
3. **Configurar analytics** (opcional)
4. **Configurar monitoring** (opcional)

---

## 📞 Soporte

Si tienes problemas:
1. Revisar logs en Vercel Dashboard
2. Verificar variables de entorno
3. Probar APIs individualmente
4. Contactar soporte si es necesario

**¡Tu aplicación está lista para producción! 🎉**
