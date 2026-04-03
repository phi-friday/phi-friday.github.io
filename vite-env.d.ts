/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_NAME: string;
  readonly APP_HOSTNAME: string;
  readonly APP_DESCRIPTION: string;
  readonly APP_AUTHOR_NAME: string;
  readonly APP_AUTHOR_EMAIL: string;
  readonly APP_AUTHOR_URL: string;
  readonly GOOGLE_SEARCH: string;
  readonly GOOGLE_SEO: string;
  readonly UTTERANCE_SRC: string;
  readonly UTTERANCE_REPO: string;
  readonly UTTERANCE_ISSUE_TERM: string;
  readonly UTTERANCE_CROSSORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
