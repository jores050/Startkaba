import { NextResponse } from "next/server";
import { resources } from "@/data/resources";
import { mockDownloads } from "@/lib/dev/mock-downloads";

// GET — liste des templates avec compteur de téléchargements.
export async function GET() {
  return NextResponse.json({
    resources: resources.map((r) => ({
      ...r,
      downloadCount: mockDownloads.get(r.id) ?? 0,
    })),
  });
}
