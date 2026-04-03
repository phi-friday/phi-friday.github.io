class SearchStore {
  dialog_open = $state(false);
  last_query = $state("");
  is_loading = $state(false);

  openDialog(): void {
    this.dialog_open = true;
  }

  closeDialog(): void {
    this.dialog_open = false;
  }

  /** 새 검색 시작: dialog 열기 + 로딩 상태 시작 + 쿼리 저장 */
  startSearch(query: string): void {
    this.last_query = query.trim();
    this.is_loading = true;
    this.dialog_open = true;
  }

  finishLoading(): void {
    this.is_loading = false;
  }
}

export const search_store = new SearchStore();
