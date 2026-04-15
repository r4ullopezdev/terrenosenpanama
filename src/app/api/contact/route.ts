import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
  lang: "es" | "en";
}

export async function POST(req: NextRequest) {
  let body: ContactBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, phone, message, lang } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const subject =
    lang === "en"
      ? `New inquiry from ${escapeHtml(name)} — Villa Real`
      : `Nueva consulta de ${escapeHtml(name)} — Villa Real`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b;">
      <h2 style="color: #0f4c35; margin-bottom: 24px;">
        ${lang === "en" ? "New Inquiry — Villa Real" : "Nueva Consulta — Proyecto Villa Real"}
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: 600; width: 120px; color: #64748b;">
            ${lang === "en" ? "Name" : "Nombre"}:
          </td>
          <td style="padding: 8px 0;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        ${phone ? `
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #64748b;">
            ${lang === "en" ? "Phone" : "Teléfono"}:
          </td>
          <td style="padding: 8px 0;">${escapeHtml(phone)}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #64748b; vertical-align: top;">
            ${lang === "en" ? "Message" : "Mensaje"}:
          </td>
          <td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(message)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: 600; color: #64748b;">Idioma / Lang:</td>
          <td style="padding: 8px 0;">${lang.toUpperCase()}</td>
        </tr>
      </table>
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
      <p style="color: #94a3b8; font-size: 12px;">
        Enviado desde terrenosenpanama.com
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Villa Real <onboarding@resend.dev>",
      to: "info@terrenosenpanama.com",
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
