import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "SANITY_REVALIDATE_SECRET no configurado" },
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      secret,
      true
    );

    if (!isValidSignature) {
      return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }

    // Solo revalidamos si el cambio es en un post
    if (body?._type === "post") {
      revalidatePath("/blog");
      revalidatePath("/blog/[slug]", "page");
      console.log("✓ Revalidado:", body._type);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
