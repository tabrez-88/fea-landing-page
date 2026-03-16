import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error("Google Sheets credentials are not configured");
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: key,
    },
    scopes: SCOPES,
  });
}

function getSheets() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

function getSpreadsheetId() {
  const id = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!id) {
    throw new Error("GOOGLE_SHEETS_SPREADSHEET_ID is not configured");
  }
  return id;
}

function formatDate(date: Date): string {
  return date.toISOString().replace("T", " ").substring(0, 19);
}

// ── Creator Submissions ─────────────────────────────────────────────
// Sheet tab: "Creator Submissions"
// Headers: Date | Name | Email | Company/Studio | Project Title |
//          Asset Type | Engagement Type | Brief Description |
//          Stage | Capital Profile | Website/Deck | Status

export async function appendCreatorSubmission(data: {
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
  const sheets = getSheets();

  const row = [
    formatDate(new Date()),
    data.name,
    data.email,
    data.companyStudio || "",
    data.projectTitle,
    data.primaryAssetType,
    data.engagementType,
    data.briefDescription,
    data.stage,
    data.capitalProfile || "",
    data.websiteOrDeck || "",
    "New", // default status
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: getSpreadsheetId(),
    range: "Creator Submissions!A:L",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

// ── Partner Submissions ─────────────────────────────────────────────
// Sheet tab: "Partner Submissions"
// Headers: Date | Name | Email | Organization | Role |
//          Partner Category | Area of Focus | Message |
//          Website | Status

export async function appendPartnerSubmission(data: {
  name: string;
  email: string;
  organizationName: string;
  yourRole: string;
  partnerCategory: string;
  areaOfFocus?: string;
  message: string;
  website?: string;
}) {
  const sheets = getSheets();

  const row = [
    formatDate(new Date()),
    data.name,
    data.email,
    data.organizationName,
    data.yourRole,
    data.partnerCategory,
    data.areaOfFocus || "",
    data.message,
    data.website || "",
    "New", // default status
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: getSpreadsheetId(),
    range: "Partner Submissions!A:J",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}
