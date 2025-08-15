# 🔬 API de Inscripciones - III Congreso de Técnicos en Laboratorio

## Endpoint de Inscripción

**URL:** `https://tu-dominio.com/api/send-email`
**Método:** `POST`
**Content-Type:** `multipart/form-data`

### Campos del Formulario

| Campo | Nombre | Tipo | Requerido | Descripción |
|-------|--------|------|-----------|-------------|
| Nombre Completo | `fullname` | string | ✅ Sí | Nombre y apellido del participante |
| Email | `Email` | email | ✅ Sí | Correo electrónico del participante |
| DNI | `D.N.I.` | string | No | Documento Nacional de Identidad |
| Fecha de Nacimiento | `bornDate` | date | No | Fecha en formato YYYY-MM-DD |
| Domicilio | `Domicilio` | string | No | Dirección completa |
| Teléfono | `Telefono` | string | No | Número de teléfono |
| Profesión | `Profesion` | string | No | Profesión u ocupación |
| Es Estudiante | `Estudiante` | string | No | Sí/No - Indica si es estudiante |
| Tipo de Asistente | `Tipo de Asistente` | string | No | Categoría del asistente |

### Ejemplo de Uso (JavaScript)

```javascript
const formData = new FormData();
formData.append('fullname', 'Juan Pérez');
formData.append('Email', 'juan@email.com');
formData.append('D.N.I.', '12345678');
formData.append('bornDate', '1990-01-15');
formData.append('Domicilio', 'Av. San Martín 123');
formData.append('Telefono', '3871234567');
formData.append('Profesion', 'Técnico en Laboratorio');
formData.append('Estudiante', 'No');
formData.append('Tipo de Asistente', 'Profesional');

fetch('https://tu-dominio.com/api/send-email', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        console.log('Inscripción enviada correctamente');
    }
});
```

### Respuestas

#### Éxito (200)
```json
{
  "message": "Email enviado correctamente",
  "success": true,
  "participante": {
    "nombre": "Juan Pérez",
    "email": "juan@email.com"
  }
}
```

#### Error de Validación (400)
```json
{
  "message": "Faltan datos requeridos",
  "error": "Missing required fields"
}
```

#### Error del Servidor (500)
```json
{
  "message": "Error al enviar email",
  "error": "Detalle del error",
  "success": false
}
```

### Configuración CORS

El endpoint está configurado para aceptar requests desde:
- `https://institutosancayetanosalta.com`

### Variables de Entorno Requeridas

```bash
EMAIL_HOST=mail.institutosancayetanosalta.com
EMAIL_USER=tecnico@institutosancayetanosalta.com
EMAIL_PASS=tu_contraseña
```

### Funcionalidades

- ✅ Validación de datos requeridos
- ✅ Envío de email HTML con formato profesional  
- ✅ Verificación de conexión SMTP
- ✅ Logs de auditoría
- ✅ Manejo de errores robusto
- ✅ CORS configurado para dominio específico
- ✅ Respuestas JSON estructuradas
