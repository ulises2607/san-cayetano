import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const data = {
    message: "This is a GET request",
  };
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  // Configurar CORS
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const formData = await req.formData();

    const name = formData.get("fullname");
    const email = formData.get("email");
    const message = `
NUEVA INSCRIPCIÓN - III CONGRESO DE TÉCNICOS EN LABORATORIO

Datos del participante:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nombre y Apellido: ${name}
Email: ${email}
Fecha de Nacimiento: ${formData.get("bornDate")}
D.N.I.: ${formData.get("dni")} 
Domicilio: ${formData.get("domicilio")}
Teléfono: ${formData.get("telefono")}
Profesión: ${formData.get("profesion")}
Estudiante: ${formData.get("estudiante")}
Tipo de Asistente: ${formData.get("tipoAsistente")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fecha de inscripción: ${new Date().toLocaleString("es-AR")}
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `III Congreso - Inscripción de ${email}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #297e93; border-bottom: 2px solid #297e93; padding-bottom: 10px;">
            III CONGRESO DE TÉCNICOS EN LABORATORIO
          </h2>
          <h3 style="color: #333;">Nueva Inscripción</h3>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #297e93; margin-top: 0;">Datos del Participante:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 5px 0; font-weight: bold;">Nombre y Apellido:</td><td style="padding: 5px 0;">${name}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold;">Email:</td><td style="padding: 5px 0;">${email}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold;">Fecha de Nacimiento:</td><td style="padding: 5px 0;">${formData.get("bornDate")}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold;">D.N.I.:</td><td style="padding: 5px 0;">${formData.get("dni")}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold;">Domicilio:</td><td style="padding: 5px 0;">${formData.get("domicilio")}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold;">Teléfono:</td><td style="padding: 5px 0;">${formData.get("telefono")}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold;">Profesión:</td><td style="padding: 5px 0;">${formData.get("profesion")}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold;">Estudiante:</td><td style="padding: 5px 0;">${formData.get("estudiante")}</td></tr>
              <tr><td style="padding: 5px 0; font-weight: bold;">Tipo de Asistente:</td><td style="padding: 5px 0;">${formData.get("tipoAsistente")}</td></tr>
            </table>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Fecha de inscripción: ${new Date().toLocaleString("es-AR")}
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error sending email", error as Error);
    return NextResponse.json(
      { message: "Email not sent", error: error },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Manejar preflight OPTIONS request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
