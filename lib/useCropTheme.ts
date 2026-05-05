import { cropThemes } from "./themes";

export const useCropTheme = (cropName: string) => {
  const key = cropName?.toLowerCase() || "default";
  return cropThemes[key] || cropThemes.default;
};
