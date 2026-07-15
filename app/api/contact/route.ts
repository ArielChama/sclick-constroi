import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

// Email de destino — para onde as mensagens do formulário são enviadas
const TO_EMAIL = "geral@sclickconstroi.pt"

// Remetente: tem de ser um endereço de um domínio verificado no Resend.
// Antes de verificar o domínio sclickconstroi.pt no Resend, isto vai falhar —
// ver instruções na resposta abaixo.
const FROM_EMAIL = "Formulário Sclick <formulario@sclickconstroi.pt>"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = (body?.name ?? "").toString().trim()
    const contact = (body?.contact ?? "").toString().trim()
    const project_type = (body?.project_type ?? "").toString().trim()
    const message = (body?.message ?? "").toString().trim()

    if (!name || !contact) {
      return NextResponse.json(
        { error: "Nome e contacto são obrigatórios." },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY não está definida nas variáveis de ambiente.")
      return NextResponse.json(
        { error: "Configuração de email em falta no servidor." },
        { status: 500 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: contact,
      subject: `Novo pedido de análise — ${name}`,
      text:
        `Novo pedido recebido através do site:\n\n` +
        `Nome: ${name}\n` +
        `Contacto: ${contact}\n` +
        `Tipo de projecto: ${project_type || "Não especificado"}\n\n` +
        `Descrição adicional:\n${message || "-"}`,
      html:
        `<h2>Novo pedido de análise</h2>` +
        `<p><strong>Nome:</strong> ${escapeHtml(name)}</p>` +
        `<p><strong>Contacto:</strong> ${escapeHtml(contact)}</p>` +
        `<p><strong>Tipo de projecto:</strong> ${escapeHtml(project_type || "Não especificado")}</p>` +
        `<p><strong>Descrição adicional:</strong><br/>${escapeHtml(message || "-").replace(/\n/g, "<br/>")}</p>`,
    })

    if (error) {
      console.error("Erro do Resend:", error)
      return NextResponse.json(
        { error: "Não foi possível enviar o email. Tenta novamente mais tarde." },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error("Erro inesperado ao processar o formulário:", err)
    return NextResponse.json(
      { error: "Erro inesperado no servidor." },
      { status: 500 }
    )
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}