import ogs from "open-graph-scraper";

export interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
}

export async function getOGData(url: string): Promise<OGData> {
  try {
    const { result } = await ogs({ url });

    const imageUrl =
      Array.isArray(result.ogImage) && result.ogImage.length > 0
        ? (result.ogImage[0] as any)?.url
        : typeof result.ogImage === "object"
        ? (result.ogImage as any)?.url
        : "";

    return {
      title: result.ogTitle || "",
      description: result.ogDescription || "",
      image: imageUrl || "",
      url,
    };
  } catch (error) {
    console.error(`Failed to fetch OG data for ${url}:`, error);
    return { url }; // 기본 URL만 반환
  }
}
