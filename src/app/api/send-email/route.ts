import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuración para Edge Runtime (más rápido)
export const runtime = 'nodejs';
export const maxDuration = 25; // Reducido a 25 segundos

export async function GET() {
  return NextResponse.json({
    message: "API de Inscripciones - Congreso Lab",
    status: "active"
  });
}

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    // Timeout global para toda la función
    const globalTimeout = setTimeout(() => {
      throw new Error('Function timeout - exceeding 20 seconds');
    }, 20000); // 20 segundos máximo total

    const formData = await req.formData();

    const datos = {
      nombre: formData.get("fullname")?.toString() || "",
      email: formData.get("Email")?.toString() || "",
      dni: formData.get("D.N.I.")?.toString() || "",
      telefono: formData.get("Telefono")?.toString() || "",
      profesion: formData.get("Profesion")?.toString() || "",
      tipo: formData.get("Tipo de Asistente")?.toString() || "",
    };

    if (!datos.nombre || !datos.email) {
      clearTimeout(globalTimeout);
      return NextResponse.json(
        { message: "Datos requeridos faltantes", success: false },
        { status: 400 }
      );
    }

    // Configuración mínima de nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Timeouts muy agresivos
      connectionTimeout: 5000,  // 5 segundos
      greetingTimeout: 3000,    // 3 segundos
      socketTimeout: 5000,      // 5 segundos
      pool: false,
      maxConnections: 1,
    } as any);

    // Email súper simple
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Inscripción: ${datos.nombre}`,
      text: `Nueva inscripción:
Nombre: ${datos.nombre}
Email: ${datos.email}
DNI: ${datos.dni}
Teléfono: ${datos.telefono}
Profesión: ${datos.profesion}
Tipo: ${datos.tipo}
Fecha: ${new Date().toLocaleString("es-AR")}`
    };

    // Envío con timeout muy corto
    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email timeout')), 8000) // 8 segundos máximo para email
      )
    ]);

    clearTimeout(globalTimeout);
    
    return NextResponse.json({
      message: "Email enviado correctamente", 
      success: true,
      participante: { nombre: datos.nombre, email: datos.email },
      time: Date.now() - startTime
    });

  } catch (error) {
    console.error("Error:", error);
    
    return NextResponse.json({
      message: "Error al procesar inscripción",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      time: Date.now() - startTime
    }, { status: 500 });
  }
}
