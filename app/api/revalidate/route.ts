import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Rückversicherung zur Live Content API: Sanity-Webhook →
 * POST /api/revalidate?secret=<SANITY_REVALIDATE_SECRET>. Das Geheimnis steht in der URL,
 * nicht im Sanity-Feld «Secret» (das signiert nur per HMAC).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret || req.nextUrl.searchParams.get("secret") !== secret) {
    return NextResponse.json({ ok: false, fehler: "Ungültiges Geheimnis" }, { status: 401 });
  }
  revalidateTag("sanity", "max");
  return NextResponse.json({ ok: true, zeit: new Date().toISOString() });
}
