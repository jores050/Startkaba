import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getResourceById } from "@/data/resources";
import { incrementDownload } from "@/lib/dev/mock-downloads";

const isDev = process.env.NODE_ENV !== "production";

// GET — URL signée Supabase Storage (1h). En dev local sans Storage réel,
// renvoie le PDF placeholder servi depuis /public/templates.
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const resource = getResourceById(Number(params.id));
  if (!resource) {
    return NextResponse.json({ error: "Ressource introuvable" }, { status: 404 });
  }

  const downloadCount = incrementDownload(resource.id);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from("resources")
      .createSignedUrl(resource.fileKey, 3600); // 1 heure

    if (error || !data?.signedUrl) throw error ?? new Error("no url");

    return NextResponse.json({ url: data.signedUrl, downloadCount });
  } catch {
    if (isDev) {
      // Fallback local : fichier placeholder dans /public
      return NextResponse.json({ url: `/${resource.fileKey}`, downloadCount });
    }
    return NextResponse.json(
      { error: "Téléchargement indisponible pour le moment" },
      { status: 503 }
    );
  }
}
