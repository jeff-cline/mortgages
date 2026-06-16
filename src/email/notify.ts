import nodemailer from "nodemailer";
import type { LeadInput } from "@/src/lead/submit";
import type { Offer } from "@/src/core/offers";

function fmtMoney(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendLeadNotification(args: {
  lead: LeadInput;
  leadId: string;
  topOffer: Offer | null;
}): Promise<void> {
  const { lead, leadId, topOffer } = args;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const to = process.env.LEAD_NOTIFY_TO ?? "jeff.cline@me.com";
  const from = process.env.MAIL_FROM ?? user;

  if (!host || !user || !pass) {
    console.warn("[notify] SMTP not configured, skipping");
    return;
  }

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const loanAmount = Math.max(0, lead.propertyValue - lead.downPayment);

    const offerHtml = topOffer
      ? `<h3>Top offer</h3>
         <table cellpadding="4">
           <tr><td><strong>Lender</strong></td><td>${escapeHtml(topOffer.name)}</td></tr>
           <tr><td><strong>Rate</strong></td><td>${topOffer.rate}%</td></tr>
           <tr><td><strong>APR</strong></td><td>${topOffer.apr}%</td></tr>
           <tr><td><strong>Monthly payment</strong></td><td>${fmtMoney(topOffer.monthlyPayment)}</td></tr>
         </table>`
      : "<p>No offers generated.</p>";

    const html = `
      <h2>New mortgage lead</h2>
      <p>Lead ID: ${escapeHtml(leadId)}</p>
      <table cellpadding="4">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(lead.firstName)} ${escapeHtml(lead.lastName)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(lead.phone)}</td></tr>
        <tr><td><strong>Purpose</strong></td><td>${escapeHtml(lead.purpose)}</td></tr>
        <tr><td><strong>Property value</strong></td><td>${fmtMoney(lead.propertyValue)}</td></tr>
        <tr><td><strong>Down payment</strong></td><td>${fmtMoney(lead.downPayment)}</td></tr>
        <tr><td><strong>Loan amount</strong></td><td>${fmtMoney(loanAmount)}</td></tr>
        <tr><td><strong>Region / ZIP</strong></td><td>${escapeHtml(lead.region)} / ${escapeHtml(lead.zip)}</td></tr>
        <tr><td><strong>Credit band</strong></td><td>${escapeHtml(lead.creditBand)}</td></tr>
      </table>
      ${offerHtml}
    `;

    await transport.sendMail({
      from,
      to,
      subject: `New mortgage lead: ${lead.firstName} ${lead.lastName} (${lead.region})`,
      html,
    });
  } catch (err) {
    console.error("[notify] failed to send lead notification", err);
  }
}
