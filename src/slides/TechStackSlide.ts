import { Slide } from './Slide';

export class TechStackSlide extends Slide {
  private inner: HTMLElement | null = null;
  private cards: HTMLElement[] = [];
  isSticky: boolean = true;

  protected onMount(): void {
    if (!this.element) return;

    this.element.style.height = '400vh';
    this.inner = document.createElement('div');
    this.inner.style.position = 'sticky';
    this.inner.style.top = '0';
    this.inner.style.height = '100vh';
    this.inner.style.overflow = 'hidden';
    this.inner.style.display = 'flex';
    this.inner.style.flexDirection = 'column';
    this.inner.style.justifyContent = 'center';
    this.inner.style.alignItems = 'center';

    while (this.element.firstChild) {
      this.inner.appendChild(this.element.firstChild);
    }
    this.element.appendChild(this.inner);

    this.cards = Array.from(this.element.querySelectorAll('.tech-card'));

    this.cards.forEach((card) => {
      card.style.position = 'sticky';
      card.style.top = '8rem';
      card.style.opacity = '0';
      card.style.transform = 'translateY(60px) scale(0.95)';
      card.style.transition = 'none';
      card.style.pointerEvents = 'none';
      card.style.willChange = 'transform, opacity';
    });
  }

  update(progress: number): void {
    if (!this.inner || this.cards.length === 0) return;

    const offset = 0.2;
    const eased = Math.min(Math.max((progress - offset) / (1 - offset), 0), 1);
    const n = this.cards.length;

    this.cards.forEach((card, i) => {
      const start = i / n;
      const end = (i + 1) / n;
      let localProg = (eased - start) / (end - start);
      localProg = Math.min(Math.max(localProg, 0), 1);
      const lp = this.easeOutCubic(localProg);

      const y = 60 * (1 - lp);
      const scale = 0.95 + 0.05 * lp;

      card.style.opacity = `${lp}`;
      card.style.transform = `translateY(${y}px) scale(${scale})`;
      card.style.pointerEvents = lp > 0.5 ? 'auto' : 'none';
    });
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}