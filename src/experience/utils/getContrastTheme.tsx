export function getContrastTheme(color: string): boolean {
  function getRGB(c: string): number {
    return parseInt(c, 16);
  }

  function getsRGB(c: string): number {
    return getRGB(c) / 255 <= 0.03928
      ? getRGB(c) / 255 / 12.92
      : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
  }

  function getLuminance(hexColor: string): number {
    return (
      0.2126 * getsRGB(hexColor.substring(1, 2)) +
      0.7152 * getsRGB(hexColor.substring(1, 2)) +
      0.0722 * getsRGB(hexColor.substring(1, 2))
    );
  }

  function getContrast(f: string, b: string): number {
    const L1 = getLuminance(f);
    const L2 = getLuminance(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }

  const whiteContrast = getContrast(color, "#f2f2f2");
  const blackContrast = getContrast(color, "#1a1a1a");

  return whiteContrast > blackContrast;
}

export default getContrastTheme;