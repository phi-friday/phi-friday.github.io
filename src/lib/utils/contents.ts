import path from "node:path";

import type { Component } from "svelte";

export interface ContentMetadata {
  title: string;
  tags?: string[];
  description?: string;
  date: string;
  publish?: boolean;
  page?: string;
}
export interface ContentFile {
  default: Component;
  metadata: ContentMetadata;
}

let _files: Record<string, () => Promise<ContentFile>> | undefined;
let _slugs:
  | Record<
      string,
      {
        ext: "svx" | "md";
        module: () => Promise<ContentFile>;
      }
    >
  | undefined;
export interface SurroundItem {
  slug: string;
  title: string;
}
export interface ContentMetadataWithSurround extends ContentMetadata {
  prev: SurroundItem | null;
  next: SurroundItem | null;
}

let _metadatas: Record<string, ContentMetadataWithSurround> | undefined;

export const globContentFiles = (): Record<string, () => Promise<ContentFile>> => {
  if (_files) {
    return _files;
  }
  _files = Object.fromEntries(
    Object.entries(import.meta.glob("../../contents/**/*.{svx,md}", { eager: false })).map(
      ([file, module]) => [path.relative("../../contents", file), module]
    )
  ) as Record<string, () => Promise<ContentFile>>;
  return _files;
};
export const globContentSlugs = (): Record<
  string,
  { ext: "svx" | "md"; module: () => Promise<ContentFile> }
> => {
  if (_slugs) {
    return _slugs;
  }
  const files = globContentFiles();
  _slugs = Object.fromEntries(
    Object.entries(files).map(
      ([file, module]): [string, { ext: "md" | "svx"; module: () => Promise<ContentFile> }] => {
        let ext: "md" | "svx";
        let _file: string;
        if (file.endsWith(".md")) {
          ext = "md";
          _file = file.slice(0, -3); // Remove the .md extension
        } else if (file.endsWith(".svx")) {
          ext = "svx";
          _file = file.slice(0, -4); // Remove the .svx extension
        } else {
          throw new Error(`Unsupported file extension in slug: ${file}`);
        }
        return [_file, { ext, module }];
      }
    )
  );
  return _slugs;
};

export const loadContentMetadatas = async (): Promise<
  Record<string, ContentMetadataWithSurround>
> => {
  if (_metadatas) {
    return _metadatas;
  }
  const slugs = globContentSlugs();
  const raw = await Promise.all(
    Object.entries(slugs).map(async ([slug, { module }]) => {
      const { metadata } = await module();
      return [slug, metadata] as const;
    })
  );
  const sorted = raw.toSorted(
    ([, a], [, b]) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  _metadatas = Object.fromEntries(
    sorted.map(([slug, metadata], i) => {
      const prev_entry = i < sorted.length - 1 ? sorted[i + 1] : null;
      const next_entry = i > 0 ? sorted[i - 1] : null;
      return [
        slug,
        {
          ...metadata,
          prev: prev_entry ? { slug: prev_entry[0], title: prev_entry[1].title } : null,
          next: next_entry ? { slug: next_entry[0], title: next_entry[1].title } : null,
        },
      ] as const;
    })
  );
  return _metadatas;
};