import { NextResponse } from "next/server";
import { addDocument } from "@/lib/firebaseAdmin";
import { FIREBASE_CONSTANTS } from "@/lib/constants";

export async function POST(req: any, res: any) {
  const body = await req.json();

  try {
    if (req.method === "POST") {
      const res = await addDocument({
        collectionName: FIREBASE_CONSTANTS.BLOGS_COLLECTION_NAME,
        document: body,
      });

      console.log(res);

      return NextResponse.json(
        { message: "Data added Successfully." },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
