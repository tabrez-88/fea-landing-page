import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.MAILTRAP_HOST;
  const port = Number(process.env.MAILTRAP_PORT);
  const user = process.env.MAILTRAP_USER;
  const pass = process.env.MAILTRAP_PASS;

  if (!host || !port || !user || !pass) {
    throw new Error("Mailtrap SMTP credentials are not configured");
  }

  return nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
  });
}

function getNotificationEmail() {
  return process.env.NOTIFICATION_EMAIL || "contact@funkyland.io";
}

function getSenderEmail() {
  return process.env.SENDER_EMAIL || "noreply@funkyland.io";
}

// ── Creator Submission Notification ─────────────────────────────────

export async function sendCreatorNotification(data: {
  name: string;
  email: string;
  companyStudio?: string;
  projectTitle: string;
  primaryAssetType: string;
  engagementType: string;
  briefDescription: string;
  stage: string;
  capitalProfile?: string;
  websiteOrDeck?: string;
}) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `FEA Submissions <${getSenderEmail()}>`,
    to: getNotificationEmail(),
    subject: `New Creator Submission: ${data.projectTitle}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #111; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 400;">
            New <strong>Creator</strong> Submission
          </h1>
        </div>
        <div style="border: 1px solid #e5e5e5; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin: 0 0 16px;">
            Project Overview
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px;">Project Title</td>
              <td style="padding: 8px 0; font-weight: 500;">${escapeHtml(data.projectTitle)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Asset Type</td>
              <td style="padding: 8px 0;">${escapeHtml(data.primaryAssetType)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Engagement Type</td>
              <td style="padding: 8px 0;">${escapeHtml(data.engagementType)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Stage</td>
              <td style="padding: 8px 0;">${escapeHtml(data.stage)}</td>
            </tr>
            ${data.capitalProfile ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Capital Profile</td>
              <td style="padding: 8px 0;">${escapeHtml(data.capitalProfile)}</td>
            </tr>` : ""}
          </table>

          <div style="margin: 16px 0; padding: 12px; background: #f9f9f9; border-radius: 6px;">
            <p style="margin: 0 0 4px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">Brief Description</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.5;">${escapeHtml(data.briefDescription)}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin: 0 0 16px;">
            Contact Information
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px;">Name</td>
              <td style="padding: 8px 0; font-weight: 500;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${escapeHtml(data.email)}" style="color: #0066cc;">${escapeHtml(data.email)}</a>
              </td>
            </tr>
            ${data.companyStudio ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Company / Studio</td>
              <td style="padding: 8px 0;">${escapeHtml(data.companyStudio)}</td>
            </tr>` : ""}
            ${data.websiteOrDeck ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Website / Deck</td>
              <td style="padding: 8px 0;">
                <a href="${escapeHtml(data.websiteOrDeck)}" style="color: #0066cc;">${escapeHtml(data.websiteOrDeck)}</a>
              </td>
            </tr>` : ""}
          </table>

          <p style="margin: 24px 0 0; font-size: 12px; color: #999;">
            This submission was received via the FEA website.
          </p>
        </div>
      </div>
    `,
  });
}

// ── Partner Submission Notification ─────────────────────────────────

export async function sendPartnerNotification(data: {
  name: string;
  email: string;
  organizationName: string;
  yourRole: string;
  partnerCategory: string;
  areaOfFocus?: string;
  message: string;
  website?: string;
}) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `FEA Submissions <${getSenderEmail()}>`,
    to: getNotificationEmail(),
    subject: `New Partner Inquiry: ${data.organizationName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #111; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 20px; font-weight: 400;">
            New <strong>Partner</strong> Inquiry
          </h1>
        </div>
        <div style="border: 1px solid #e5e5e5; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin: 0 0 16px;">
            Organization Details
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px;">Organization</td>
              <td style="padding: 8px 0; font-weight: 500;">${escapeHtml(data.organizationName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Role</td>
              <td style="padding: 8px 0;">${escapeHtml(data.yourRole)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Category</td>
              <td style="padding: 8px 0;">${escapeHtml(data.partnerCategory)}</td>
            </tr>
            ${data.areaOfFocus ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Area of Focus</td>
              <td style="padding: 8px 0;">${escapeHtml(data.areaOfFocus)}</td>
            </tr>` : ""}
          </table>

          <div style="margin: 16px 0; padding: 12px; background: #f9f9f9; border-radius: 6px;">
            <p style="margin: 0 0 4px; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.5;">${escapeHtml(data.message)}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />

          <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin: 0 0 16px;">
            Contact Information
          </h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px;">Name</td>
              <td style="padding: 8px 0; font-weight: 500;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${escapeHtml(data.email)}" style="color: #0066cc;">${escapeHtml(data.email)}</a>
              </td>
            </tr>
            ${data.website ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Website</td>
              <td style="padding: 8px 0;">
                <a href="${escapeHtml(data.website)}" style="color: #0066cc;">${escapeHtml(data.website)}</a>
              </td>
            </tr>` : ""}
          </table>

          <p style="margin: 24px 0 0; font-size: 12px; color: #999;">
            This inquiry was received via the FEA website.
          </p>
        </div>
      </div>
    `,
  });
}

// ── Utilities ────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
