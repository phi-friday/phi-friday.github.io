import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types';
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

interface PageArticle extends ArticleInfo {
  page?: string;
}

interface FixPageArticle extends PageArticle {
  page: string;
}

interface Article extends TaggedArticle, PageArticle {}

export type {
  OnlyPathArticle,
  ArticleMeta,
  ArticleInfo,
  TaggedArticle,
  PageArticle,
  FixTaggedArticle,
  FixPageArticle,
  Article,
};
