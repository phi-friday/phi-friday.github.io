import type { MarkdownParsedContent } from "@nuxt/content";

interface OnlyPathArticle extends MarkdownParsedContent {
  _path: string;
}

interface ArticleMeta extends OnlyPathArticle {
  title: string;
  description: string;
}

interface ArticleInfo extends ArticleMeta {
  date: string;
}

interface TaggedArticle extends ArticleInfo {
  tags?: string[];
}

interface FixTaggedArticle extends TaggedArticle {
  tags: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Article extends TaggedArticle {}

export type {
  Article,
  ArticleInfo,
  ArticleMeta,
  FixTaggedArticle,
  OnlyPathArticle,
  TaggedArticle,
};

function validate_article<T extends OnlyPathArticle>(
  article: T,
  status_code?: number
): T;
function validate_article(article?: null, status_code?: number): void;
function validate_article<T extends OnlyPathArticle>(
  article?: T | null,
  status_code?: number
): T;
function validate_article<T extends OnlyPathArticle>(
  article?: T | null,
  status_code: number = 500
): T {
  if (!article) {
    throw createError({
      statusCode: Math.floor(status_code),
      statusMessage: `invaild article type: ${typeof article}`,
    });
  }
  return article;
}

export { validate_article };
