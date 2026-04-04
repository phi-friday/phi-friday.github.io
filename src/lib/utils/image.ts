export type VariantFormat = "avif" | "webp" | "png";

export interface Variant {
  src: string;
  width: number;
  height: number;
  format: VariantFormat;
}

interface ImageModule {
  default: Variant[];
}

const modules = import.meta.glob<ImageModule>("../../../static/images/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: {
    format: "avif;webp;png",
    w: "480;768;1200",
    as: "meta",
  },
});

const image_map = new Map<string, Variant[]>();

for (const [full_path, mod] of Object.entries(modules)) {
  const key = full_path.replace("../../../static", "");
  image_map.set(key, mod.default);
}

export function getImageVariants(path: string): Variant[] {
  const found = image_map.get(path);
  if (!found) {
    throw new Error(`Image not found in registry: ${path}`);
  }
  return found;
}
