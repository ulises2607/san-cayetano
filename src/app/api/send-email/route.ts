import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configuración mínima para Vercel
export const runtime = "nodejs";
export const maxDuration = 15; // 15 segundos máximo

export async function GET() {
  return NextResponse.json({
    message: "API de Inscripciones - Congreso Lab",
    status: "active",
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("fullname");
    const email = formData.get("Email");

    // Mensaje simple como antes
    const message = `
NUEVA INSCRIPCIÓN - III CONGRESO DE TÉCNICOS EN LABORATORIO

Nombre y Apellido: ${name}
Email: ${email}
Fecha de Nacimiento: ${formData.get("bornDate")}
D.N.I.: ${formData.get("D.N.I.")}
Domicilio: ${formData.get("Domicilio")}
Teléfono: ${formData.get("Telefono")}
Profesión: ${formData.get("Profesion")}
Estudiante: ${formData.get("Estudiante")}
Tipo de Asistente: ${formData.get("Tipo de Asistente")}

Fecha de inscripción: ${new Date().toLocaleString("es-AR")}
    `;

    // Configuración simple como antes
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // 'mail.institutosancayetanosalta.com'
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // ¡OJO! Esto desactiva la verificación de seguridad del certificado.
        // Úsalo solo si la Solución 1 no es posible.
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Inscripción de ${email}`,
      text: message, // Solo texto, sin HTML
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Email sent",
      success: true,
      participante: { name, email },
    });
  } catch (error) {
    console.error("Error sending email", error);
    return NextResponse.json(
      {
        message: "Email not sent",
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      },
      { status: 500 }
    );
  }
}
