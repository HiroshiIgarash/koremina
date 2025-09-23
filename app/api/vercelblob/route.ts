import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  console.log(filename);

  if (!filename || !request.body) {
    throw new Error("invalid data");
  }

  const blob = await put(filename, request.body, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json(blob);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get("url") as string;
  await del(urlToDelete);

  return new Response();
}
