export type TocItem = {
  id: string;
  text: string;
  level: number;
};

class TocStore {
  items = $state<TocItem[]>([]);
  active_id = $state<string>("");
  header_height = $state(0);
  popup_open = $state(false);

  get min_level(): number {
    return this.items.length > 0 ? Math.min(...this.items.map(i => i.level)) : 1;
  }

  togglePopup(): void {
    this.popup_open = !this.popup_open;
  }

  closePopup(): void {
    this.popup_open = false;
  }
}

export const toc_store = new TocStore();
