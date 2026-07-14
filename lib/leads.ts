import { promises as fs } from "fs";
import path from "path";
import type { TrialLead } from "./types";

const filePath = path.join(process.cwd(), "data", "leads.json");

async function ensureStore() {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf8");
  }
}

async function getLeads(): Promise<TrialLead[]> {
  await ensureStore();
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as TrialLead[];
  return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addLead(input: Omit<TrialLead, "id" | "status" | "createdAt">) {
  const leads = await getLeads();
  const lead: TrialLead = {
    ...input,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  await fs.writeFile(filePath, JSON.stringify([lead, ...leads], null, 2), "utf8");
  return lead;
}
