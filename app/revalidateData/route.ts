import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(req: any, res: any) {
  try {
    revalidateTag("blogs");

    return NextResponse.json(
      { message: "Data Revalidated Successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
