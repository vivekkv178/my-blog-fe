import { NextResponse } from "next/server";
import { getDocument } from "@/lib/firebaseAdmin";
import { FIREBASE_CONSTANTS } from "@/lib/constants";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const documentId = searchParams.get("documentId");

  if (!documentId) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const doc = await getDocument({
      collectionName: FIREBASE_CONSTANTS.BLOGS_COLLECTION_NAME,
      documentId,
    });

    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(doc, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/post", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
