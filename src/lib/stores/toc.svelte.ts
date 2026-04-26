export type TocItem = {
  id: string;
  text: string;
  level: number;
};

class TocStore {
  public items = $state<TocItem[]>([]);
  public active_id = $state("");
  public header_height = $state(0);
  public footer_el = $state<HTMLElement | null>(null);
  public popup_open = $state(false);

  public get min_level(): number {
    return this.items.length > 0 ? Math.min(...this.items.map(i => i.level)) : 1;
  }

  public togglePopup(): void {
    this.popup_open = !this.popup_open;
  }

  public closePopup(): void {
    this.popup_open = false;
  }
}

export const toc_store = new TocStore();
