import { Slide } from './Slide';

export class TitleSlide extends Slide {
  private titleEl: HTMLElement | null = null;
  private subtitleEl: HTMLElement | null = null;
  private descriptionEl: HTMLElement | null = null;

  protected onMount(): void {
    if (!this.element) return;

    this.titleEl = this.element.querySelector('[data-target="title"]');
    this.subtitleEl = this.element.querySelector('[data-target="subtitle"]');
    this.descriptionEl = this.element.querySelector('[data-target="description"]');

    [this.titleEl, this.subtitleEl, this.descriptionEl].forEach((el) => {
      if (!el) return;
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  update(_: number): void {
    return;
  }

}
