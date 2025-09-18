# 🔄 Guía para Regenerar Credenciales - CRÍTICO ANTES DE DESPLEGAR

## 🚨 IMPORTANTE
Estas credenciales fueron expuestas públicamente en GitHub y DEBEN ser regeneradas antes del despliegue.

---

## 1. 🍃 MongoDB Atlas - Regenerar Credenciales de Base de Datos

### Pasos:
1. **Ve a MongoDB Atlas**: https://cloud.mongodb.com
2. **Inicia sesión** con tu cuenta
3. **Selecciona tu proyecto** (ClusterFB)
4. **Ve a Database Access** (en el menú lateral izquierdo)
5. **Encuentra el usuario**: `alexdanielmotogna_db_user`
6. **Click en "Edit"** (ícono de lápiz)
7. **Click en "Edit Password"**
8. **Genera una nueva contraseña segura** (guárdala)
9. **Click "Update User"**

### Nueva Connection String:
```
mongodb+srv://alexdanielmotogna_db_user:TU-NUEVA-PASSWORD@clusterfb.engg3bl.mongodb.net/filipbonat?retryWrites=true&w=majority&appName=ClusterFB
```

**⚠️ Reemplaza `TU-NUEVA-PASSWORD` con la contraseña que acabas de generar**

---

## 2. 📧 Hostinger - Cambiar Contraseña de Email

### Pasos:
1. **Ve a Hostinger**: https://hpanel.hostinger.com
2. **Inicia sesión** con tu cuenta
3. **Ve a Email** → **Email Accounts**
4. **Encuentra**: `website@filip-bonat.at`
5. **Click en "Manage"** o el ícono de configuración
6. **Click en "Change Password"**
7. **Genera una contraseña segura** (guárdala)
8. **Confirma el cambio**

### Nueva configuración SMTP:
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=website@filip-bonat.at
SMTP_PASS=TU-NUEVA-PASSWORD-EMAIL
SMTP_FROM=website@filip-bonat.at
```

**⚠️ Reemplaza `TU-NUEVA-PASSWORD-EMAIL` con la nueva contraseña**

---

## 3. ☁️ Cloudinary - Regenerar API Keys

### Pasos:
1. **Ve a Cloudinary**: https://cloudinary.com/console
2. **Inicia sesión** con tu cuenta
3. **Ve a Settings** (ícono de engranaje)
4. **Click en "Security"** en el menú lateral
5. **En la sección "API Keys"**:
   - **Click en "Generate New API Key"**
   - **Se generará un nuevo API Key y API Secret**
6. **Copia ambos valores** (guárdalos)

### Nuevas credenciales Cloudinary:
```
CLOUDINARY_CLOUD_NAME=doaiuthjn  # Este puede quedarse igual
CLOUDINARY_API_KEY=TU-NUEVO-API-KEY
CLOUDINARY_API_SECRET=TU-NUEVO-API-SECRET
```

**⚠️ Reemplaza con los nuevos valores generados**

---

## 4. 📝 Template de Variables de Entorno para Vercel

Una vez que hayas regenerado todas las credenciales, usa este template:

```bash
# Base de Datos - NUEVA CREDENCIAL
DATABASE_URL=mongodb+srv://alexdanielmotogna_db_user:TU-NUEVA-PASSWORD@clusterfb.engg3bl.mongodb.net/filipbonat?retryWrites=true&w=majority&appName=ClusterFB

# Email SMTP - NUEVA CREDENCIAL
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

# Cloudinary - NUEVAS CREDENCIALES
CLOUDINARY_CLOUD_NAME=doaiuthjn
CLOUDINARY_API_KEY=TU-NUEVO-API-KEY
CLOUDINARY_API_SECRET=TU-NUEVO-API-SECRET
```

---

## 5. ✅ Checklist de Verificación

Antes de proceder con Vercel, confirma que tienes:

- [ ] ✅ Nueva contraseña de MongoDB Atlas
- [ ] ✅ Nueva contraseña de email Hostinger
- [ ] ✅ Nuevo API Key de Cloudinary
- [ ] ✅ Nuevo API Secret de Cloudinary
- [ ] ✅ Todas las credenciales anotadas de forma segura

---

## 6. 🔒 Consejos de Seguridad

### Para las contraseñas, usa:
- **Mínimo 16 caracteres**
- **Combinación de mayúsculas, minúsculas, números y símbolos**
- **No uses palabras del diccionario**
- **Usa un generador de contraseñas seguras**

### Ejemplos de contraseñas seguras:
```
K9#mX8$vL2@nQ5!w
P7&jR3*uF9#eT6@s
M4$kN8!vB2@xC7#q
```

---

## 🎯 Próximo Paso

Una vez que hayas regenerado TODAS las credenciales:

1. **Anota todas las nuevas credenciales de forma segura**
2. **Confirma que tienes acceso con las nuevas credenciales**
3. **Procederemos con el despliegue en Vercel**

**¿Estás listo para regenerar las credenciales?**
