import { NextResponse } from "next/server";
import ogs from "open-graph-scraper";

interface OpenGraphResult {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: { url: string } | { url: string }[];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const options = {
      url,
      onlyGetOpenGraphInfo: true,
      timeout: 5000,
    };

    const { result } = await ogs(options);

    const ogResult = result as OpenGraphResult;

    return NextResponse.json({
      title: ogResult.ogTitle || "",
      description: ogResult.ogDescription || "",
      image: Array.isArray(ogResult.ogImage)
        ? ogResult.ogImage[0]?.url
        : ogResult.ogImage?.url,
      url: url,
    });
  } catch (error) {
    console.error("Error fetching OG data:", error);
    return NextResponse.json(
      { error: "Failed to fetch OG data" },
      { status: 500 }
    );
  }
}
