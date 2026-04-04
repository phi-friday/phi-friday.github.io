import { loadContentMetadatas } from "$lib/utils/contents";

export interface SearchPost {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
  content: string;
}

export type HighlightSegment = { text: string; highlighted: boolean };

function extractPlainText(raw: string, maxLength = 800): string {
  return (
    raw
      // 1) frontmatter 제거 (--- ... ---)
      .replace(/^---[\s\S]*?---\s*/m, "")
      // 2) Svelte/HTML 태그 제거
      .replaceAll(/<[^>]+>/g, " ")
      // 3) 코드 블록 제거 (```...```)
      .replaceAll(/```[\s\S]*?```/g, " ")
      // 4) 인라인 코드 제거
      .replaceAll(/`[^`]+`/g, " ")
      // 5) 이미지 제거
      .replaceAll(/!\[.*?\]\(.*?\)/g, " ")
      // 6) 링크 텍스트만 남기기
      .replaceAll(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // 7) 마크다운 서식 기호 제거 (헤딩 #, 강조 */_/~)
      .replaceAll(/^#{1,6}\s+/gm, "")
      .replaceAll(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, "$1")
      // 8) 인용구 기호 제거
      .replaceAll(/^>\s*/gm, "")
      // 9) 연속 공백/줄바꿈 정리
      .replaceAll(/\s+/g, " ")
      .trim()
      // 10) 최대 길이 제한
      .slice(0, maxLength)
  );
}

function buildHighlightSegments(value: string, ranges: [number, number][]): HighlightSegment[] {
  if (ranges.length === 0) return [{ text: value, highlighted: false }];
  const result: HighlightSegment[] = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (start > cursor) {
      result.push({ text: value.slice(cursor, start), highlighted: false });
    }
    result.push({ text: value.slice(start, end + 1), highlighted: true });
    cursor = end + 1;
  }
  if (cursor < value.length) {
    result.push({ text: value.slice(cursor), highlighted: false });
  }
  return result;
}

function buildSnippetSegments(
  value: string,
  ranges: [number, number][],
  contextLen = 80
): HighlightSegment[] {
  if (ranges.length === 0) return [];
  const firstStart = ranges[0][0];
  const lastEnd = ranges[ranges.length - 1][1];
  const from = Math.max(0, firstStart - contextLen);
  const to = Math.min(value.length, lastEnd + contextLen);
  const result: HighlightSegment[] = [];
  if (from > 0) result.push({ text: "…", highlighted: false });
  let cursor = from;
  for (const [start, end] of ranges) {
    if (end < from || start > to) continue;
    const s = Math.max(start, from);
    const e = Math.min(end + 1, to);
    if (s > cursor) {
      result.push({ text: value.slice(cursor, s), highlighted: false });
    }
    result.push({ text: value.slice(s, e), highlighted: true });
    cursor = e;
  }
  if (cursor < to) {
    result.push({ text: value.slice(cursor, to), highlighted: false });
  }
  if (to < value.length) result.push({ text: "…", highlighted: false });
  return result;
}

function mergeRanges(ranges: [number, number][]): [number, number][] {
  if (ranges.length === 0) return [];
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of sorted) {
    const [start, end] = range;
    if (merged.length > 0 && start <= merged[merged.length - 1][1] + 1) {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

function queryToRanges(value: string, query: string): [number, number][] {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(t => t.length >= 2);
  if (terms.length === 0) return [];
  const lower = value.toLowerCase();
  const ranges: [number, number][] = [];
  for (const term of terms) {
    let idx = lower.indexOf(term);
    while (idx !== -1) {
      ranges.push([idx, idx + term.length - 1]);
      idx = lower.indexOf(term, idx + 1);
    }
  }
  return mergeRanges(ranges);
}

export function buildQueryHighlightSegments(value: string, query: string): HighlightSegment[] {
  return buildHighlightSegments(value, queryToRanges(value, query));
}

export function buildQuerySnippetSegments(
  value: string,
  query: string,
  contextLen = 80
): HighlightSegment[] {
  return buildSnippetSegments(value, queryToRanges(value, query), contextLen);
}

export const loadSearchPostDatas = async (): Promise<SearchPost[]> => {
  const raw_files = import.meta.glob("../../contents/**/*.{svx,md}", {
    query: "?raw",
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const raw_map = Object.fromEntries(
    Object.entries(raw_files).map(([file, raw_content]) => {
      const slug = file.replace("../../contents/", "").replace(/\.(svx|md)$/, "");
      return [slug, raw_content] as const;
    })
  );

  const metadatas = await loadContentMetadatas();
  return Object.entries(metadatas)
    .filter(([, meta]) => meta.publish !== false)
    .map(
      ([slug, meta]) =>
        ({
          slug,
          title: meta.title,
          tags: meta.tags ?? [],
          description: meta.description ?? "",
          date: meta.date,
          content: extractPlainText(raw_map[slug] ?? ""),
        }) satisfies SearchPost
    );
};
