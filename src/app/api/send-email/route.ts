import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuración de runtime para Vercel (aumentar timeout)
export const runtime = 'nodejs';
export const maxDuration = 30; // 30 segundos máximo

export async function GET() {
  return NextResponse.json({
    message: "API de Inscripciones - III Congreso de Técnicos en Laboratorio",
    version: "2.0.0",
    status: "active"
  });
}

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    console.log("🚀 Iniciando procesamiento de inscripción...");
    
    const formData = await req.formData();

    // Extraer datos del formulario de forma más eficiente
    const datos = {
      nombreCompleto: formData.get("fullname")?.toString() || "",
      emailParticipante: formData.get("Email")?.toString() || "",
      documentoIdentidad: formData.get("D.N.I.")?.toString() || "",
      domicilioCompleto: formData.get("Domicilio")?.toString() || "",
      numeroTelefono: formData.get("Telefono")?.toString() || "",
      profesionOcupacion: formData.get("Profesion")?.toString() || "",
      esEstudiante: formData.get("Estudiante")?.toString() || "",
      categoriaAsistente: formData.get("Tipo de Asistente")?.toString() || "",
      fechaNacimiento: formData.get("bornDate")?.toString() || "",
    };

    // Validación rápida
    if (!datos.nombreCompleto || !datos.emailParticipante) {
      return NextResponse.json(
        {
          message: "Faltan datos requeridos",
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    console.log("📧 Procesando inscripción:", { 
      nombre: datos.nombreCompleto, 
      email: datos.emailParticipante 
    });

    // Configuración optimizada del transporter para Vercel
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Timeouts reducidos para evitar timeout de Vercel
      connectionTimeout: 10000, // 10 segundos
      greetingTimeout: 5000,    // 5 segundos  
      socketTimeout: 10000,     // 10 segundos
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
      // Configuraciones adicionales para mejor performance
      pool: false, // Desabilitar pool para funciones serverless
      maxConnections: 1,
      maxMessages: 1,
    });

    // Crear contenido del email de forma más eficiente
    const fechaInscripcion = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
    });

    const mailOptions = {
      from: {
        name: 'III Congreso Técnicos Lab',
        address: process.env.EMAIL_USER || 'tecnico@institutosancayetanosalta.com'
      },
      to: process.env.EMAIL_USER || 'tecnico@institutosancayetanosalta.com',
      subject: `🔬 Inscripción: ${datos.nombreCompleto}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #297e93; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">🔬 Nueva Inscripción</h1>
            <p style="margin: 5px 0 0 0;">III Congreso de Técnicos en Laboratorio</p>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa;">
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #297e93; margin-top: 0;">👤 Datos del Participante</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Nombre:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${datos.nombreCompleto}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${datos.emailParticipante}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>DNI:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${datos.documentoIdentidad}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Teléfono:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${datos.numeroTelefono}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Profesión:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${datos.profesionOcupacion}</td></tr>
                <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tipo:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${datos.categoriaAsistente}</td></tr>
              </table>
              
              <p style="margin: 15px 0 0 0; color: #666; font-size: 14px;">
                📅 Inscripción: ${fechaInscripcion}
              </p>
            </div>
          </div>
        </div>
      `,
      priority: 'high' as const,
    };

    // Enviar email con timeout Promise.race para evitar colgarse
    const emailPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email timeout')), 15000) // 15 segundos max
    );

    await Promise.race([emailPromise, timeoutPromise]);
    
    const endTime = Date.now();
    console.log(`✅ Email enviado exitosamente en ${endTime - startTime}ms`);

    return NextResponse.json({
      message: "Email enviado correctamente", 
      success: true,
      participante: {
        nombre: datos.nombreCompleto,
        email: datos.emailParticipante
      },
      processingTime: endTime - startTime
    });

  } catch (error) {
    const endTime = Date.now();
    console.error(`❌ Error después de ${endTime - startTime}ms:`, error);
    
    return NextResponse.json(
      {
        message: "Error al enviar email",
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
        processingTime: endTime - startTime
      },
      { status: 500 }
    );
  }
}
