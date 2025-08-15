import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Headers CORS - Permitir todos los orígenes para testing
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
  "Access-Control-Allow-Credentials": "false",
};

export async function GET() {
  return NextResponse.json(
    { 
      message: "API de Inscripciones - III Congreso de Técnicos en Laboratorio",
      version: "1.0.0",
      status: "active"
    }, 
    { headers: corsHeaders }
  );
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extraer datos del formulario
    const nombreCompleto = formData.get("fullname");
    const emailParticipante = formData.get("Email");
    const documentoIdentidad = formData.get("D.N.I.");
    const domicilioCompleto = formData.get("Domicilio");
    const numeroTelefono = formData.get("Telefono");
    const profesionOcupacion = formData.get("Profesion");
    const esEstudiante = formData.get("Estudiante");
    const categoriaAsistente = formData.get("Tipo de Asistente");
    const fechaNacimiento = formData.get("bornDate");

    // Validar que tenemos los datos básicos
    if (!nombreCompleto || !emailParticipante) {
      return NextResponse.json(
        {
          message: "Faltan datos requeridos",
          error: "Missing required fields",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const message = `
NUEVA INSCRIPCIÓN - III CONGRESO DE TÉCNICOS EN LABORATORIO

Datos del participante:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre y Apellido: ${nombreCompleto}
Email: ${emailParticipante}
Fecha de Nacimiento: ${fechaNacimiento || "No especificado"}
D.N.I.: ${documentoIdentidad || "No especificado"}
Domicilio: ${domicilioCompleto || "No especificado"}
Teléfono: ${numeroTelefono || "No especificado"}
Profesión: ${profesionOcupacion || "No especificado"}
Estudiante: ${esEstudiante || "No especificado"}
Tipo de Asistente: ${categoriaAsistente || "No especificado"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fecha de inscripción: ${new Date().toLocaleString("es-AR")}
    `;

    console.log("📧 Procesando nueva inscripción:", { 
      nombre: nombreCompleto, 
      email: emailParticipante 
    });

    // Configuración mejorada del transporter según mejores prácticas de Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465, // Puerto seguro para SSL/TLS
      secure: true, // true para puerto 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Para evitar problemas con certificados self-signed
        minVersion: "TLSv1.2", // Versión mínima de TLS según mejores prácticas
      },
      // Configuraciones adicionales para mejorar compatibilidad
      connectionTimeout: 60000, // 60 segundos
      greetingTimeout: 30000, // 30 segundos  
      socketTimeout: 60000, // 60 segundos
    });

    // Configuración del email según mejores prácticas
    const mailOptions = {
      from: {
        name: 'III Congreso de Técnicos en Laboratorio',
        address: process.env.EMAIL_USER || 'tecnico@institutosancayetanosalta.com'
      },
      to: process.env.EMAIL_USER || 'tecnico@institutosancayetanosalta.com',
      subject: `🔬 Nueva Inscripción: ${nombreCompleto} - ${emailParticipante}`,
      text: message, // Versión texto plano (fallback)
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background-color: #297e93; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🔬 III CONGRESO DE TÉCNICOS EN LABORATORIO</h1>
          </div>
          
          <div style="padding: 20px; background-color: #f8f9fa;">
            <h2 style="color: #297e93; margin-top: 0;">📝 Nueva Inscripción Recibida</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6;">
              <h3 style="color: #495057; margin-top: 0; border-bottom: 2px solid #e9ecef; padding-bottom: 10px;">
                👤 Datos del Participante
              </h3>
              
              <div style="display: grid; gap: 10px;">
                <p style="margin: 8px 0;"><strong>Nombre Completo:</strong> ${nombreCompleto || 'No especificado'}</p>
                <p style="margin: 8px 0;"><strong>📧 Email:</strong> ${emailParticipante || 'No especificado'}</p>
                <p style="margin: 8px 0;"><strong>🆔 DNI:</strong> ${documentoIdentidad || 'No especificado'}</p>
                <p style="margin: 8px 0;"><strong>🏠 Domicilio:</strong> ${domicilioCompleto || 'No especificado'}</p>
                <p style="margin: 8px 0;"><strong>📞 Teléfono:</strong> ${numeroTelefono || 'No especificado'}</p>
                <p style="margin: 8px 0;"><strong>💼 Profesión:</strong> ${profesionOcupacion || 'No especificado'}</p>
                <p style="margin: 8px 0;"><strong>🎓 Es Estudiante:</strong> ${esEstudiante || 'No especificado'}</p>
                <p style="margin: 8px 0;"><strong>👨‍⚕️ Tipo de Asistente:</strong> ${categoriaAsistente || 'No especificado'}</p>
                <p style="margin: 8px 0;"><strong>🎂 Fecha de Nacimiento:</strong> ${fechaNacimiento || 'No especificado'}</p>
              </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 4px;">
              <p style="margin: 0; color: #0c5460; font-size: 14px;">
                <strong>📅 Fecha de inscripción:</strong> ${new Date().toLocaleString("es-AR", {
                  timeZone: "America/Argentina/Buenos_Aires",
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          <div style="background-color: #6c757d; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">Instituto San Cayetano - Salta, Argentina</p>
            <p style="margin: 5px 0 0 0;">Este email fue generado automáticamente por el sistema de inscripciones</p>
          </div>
        </div>
      `,
      // Configuraciones adicionales para mejorar deliverability
      priority: 'normal' as const,
      headers: {
        'X-Mailer': 'Nodemailer',
        'X-Priority': '3',
      },
    };

    // Verificar conexión del transporter antes de enviar
    try {
      await transporter.verify();
      console.log("✅ Conexión SMTP verificada correctamente");
    } catch (verifyError) {
      console.error("❌ Error al verificar conexión SMTP:", verifyError);
      // Continuar con el envío de todas formas, algunos servidores no soportan verify()
    }

    await transporter.sendMail(mailOptions);
    console.log("✅ Email enviado exitosamente");

    return NextResponse.json(
      { 
        message: "Email enviado correctamente", 
        success: true,
        participante: {
          nombre: nombreCompleto,
          email: emailParticipante
        }
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        message: "Error al enviar email",
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}
