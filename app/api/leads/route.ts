import { NextResponse } from "next/server";
import { z } from "zod";
import { addLead } from "@/lib/leads";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().regex(/^[+\d\s()\-]{10,22}$/, "Проверьте номер телефона"),
  email: z.string().trim().email("Проверьте email"),
  program: z.string().trim().min(2),
  preferredTime: z.string().trim().min(2),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  try {
    const data = leadSchema.parse(await request.json());
    const lead = await addLead(data);
    return NextResponse.json({ ok: true, lead }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ ok: false, message: "Не удалось сохранить заявку" }, { status: 500 });
  }
}
