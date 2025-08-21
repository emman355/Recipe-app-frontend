export function hexToRGBAArray(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return [r, g, b, 1]; // RGBA for Lottie
}

export function applyColorToLottie(animationData, hexColor) {
  const targetColor = hexToRGBAArray(hexColor);

  function traverseAndUpdate(obj) {
    if (typeof obj !== "object" || obj === null) return;

    for (const key in obj) {
      if (
        key === "c" &&
        obj[key] &&
        Array.isArray(obj[key].k)
      ) {
        obj[key].k = targetColor;
      } else {
        traverseAndUpdate(obj[key]);
      }
    }
  }

  // Clone to avoid mutating original animation data
  const clonedAnimation = JSON.parse(JSON.stringify(animationData));
  traverseAndUpdate(clonedAnimation);
  return clonedAnimation;
}
