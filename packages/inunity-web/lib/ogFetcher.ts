import ogs from "open-graph-scraper";

export interface OGData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
}

export async function getOGData(url: string): Promise<OGData> {
  try {
    const response = await fetch(`/api/og-data?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return {
      title: data.title || "",
      description: data.description || "",
      image: data.image || "",
      url: url,
    };
  } catch (error) {
    console.error(`Failed to fetch OG data for ${url}:`, error);
    return { url };
  }
}
