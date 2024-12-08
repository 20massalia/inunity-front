export function isLightColor(hex: string): boolean {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the hex color
  let r: number, g: number, b: number;
  if (hex.length === 3) {
    // If the hex is in shorthand form (e.g., #fff)
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    // If the hex is in full form (e.g., #ffffff)
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    throw new Error("Invalid hex color format");
  }

  // Calculate brightness using the luminance formula
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // Return true if the brightness is greater than a certain threshold (e.g., 186)
  return brightness > 186;
}