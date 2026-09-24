import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio").max(100),
  email: z.string().email("Email inválido").max(200),
  mensaje: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
});

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY no configurada" },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { nombre, email, mensaje } = parsed.data;
    const toEmail = process.env.CONTACT_EMAIL || "hola@josht.xyz";

    const { error } = await resend.emails.send({
      from: "josht.xyz <hola@josht.xyz>",
      to: [toEmail],
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #C2410C; margin: 0 0 24px;">Nuevo mensaje desde josht.xyz</h2>
          <p style="margin: 8px 0;"><strong>Nombre:</strong> ${nombre}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #C2410C;">${email}</a></p>
          <hr style="border: none; border-top: 1px solid #E5DDD0; margin: 24px 0;" />
          <p style="margin: 8px 0;"><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.6;">${mensaje}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact endpoint error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
