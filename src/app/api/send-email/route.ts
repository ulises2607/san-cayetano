import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const maxDuration = 20; // 20 segundos máx - más agresivo

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    const formData = await req.formData();

    // Extraer todos los datos una sola vez (nombres correctos del formulario)
    const datos = {
      nombre: formData.get("fullname")?.toString() || "",
      email: formData.get("Email")?.toString() || "",
      fechaNacimiento: formData.get("bornDate")?.toString() || "",
      dni: formData.get("D.N.I.")?.toString() || "",
      domicilio: formData.get("Domicilio")?.toString() || "",
      telefono: formData.get("Telefono")?.toString() || "",
      profesion: formData.get("Profesion")?.toString() || "",
      estudiante: formData.get("Estudiante")?.toString() || "",
      tipoAsistente: formData.get("Tipo de Asistente")?.toString() || "",
      fechaInscripcion: new Date().toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
      }),
    };

    // Validación mínima
    if (!datos.nombre || !datos.email) {
      return NextResponse.json(
        { success: false, message: "Datos requeridos faltantes" },
        { status: 400 }
      );
    }

    // Configuración del transporter optimizada
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465, // SSL/TLS seguro
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { 
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
      },
      // Timeouts agresivos para Vercel
      connectionTimeout: 8000,
      greetingTimeout: 5000,
      socketTimeout: 8000,
    } as any);

    // HTML del email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Inscripción: ${datos.nombre}`,
      html: `
        <h2>Datos de inscripción</h2>
        <p><b>Nombre y Apellido:</b> ${datos.nombre}</p>
        <p><b>Email:</b> ${datos.email}</p>
        <p><b>Fecha de Nacimiento:</b> ${datos.fechaNacimiento}</p>
        <p><b>D.N.I.:</b> ${datos.dni}</p>
        <p><b>Domicilio:</b> ${datos.domicilio}</p>
        <p><b>Teléfono:</b> ${datos.telefono}</p>
        <p><b>Profesión:</b> ${datos.profesion}</p>
        <p><b>Estudiante:</b> ${datos.estudiante}</p>
        <p><b>Tipo de Asistente:</b> ${datos.tipoAsistente}</p>
        <hr>
        <p><b>Fecha de inscripción:</b> ${datos.fechaInscripcion}</p>
      `,
    };

    // Enviar con timeout controlado más agresivo
    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout - 10 seconds exceeded")), 10000)
      ),
    ]);

    const endTime = Date.now();
    console.log(`✅ Email enviado en ${endTime - startTime}ms`);

    return NextResponse.json({
      success: true,
      message: "Email enviado correctamente",
      participante: {
        nombre: datos.nombre,
        email: datos.email
      },
      processingTime: endTime - startTime,
    });
  } catch (err) {
    const endTime = Date.now();
    console.error("❌ Error en envío de email:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Error al procesar la solicitud",
        error: err instanceof Error ? err.message : String(err),
        processingTime: endTime - startTime,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API de Inscripciones",
    version: "2.0.0",
    status: "active",
  });
}
