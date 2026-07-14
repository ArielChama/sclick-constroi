import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, contact, message, project_type } = body;

    await resend.emails.send({
      from: "Site SClick <onboarding@resend.dev>",
      to: "geral@sclickconstroi.pt",
      subject: "Novo Pedido de Orçamento",
      html: `
        <h2>Novo pedido recebido</h2>

        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Contacto:</strong> ${contact}</p>
        <p><strong>Tipo de Projeto:</strong> ${project_type}</p>

        <hr>

        <p>${message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}