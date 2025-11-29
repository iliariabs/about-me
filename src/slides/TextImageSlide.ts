import { Slide } from './Slide';

export class TextImageSlide extends Slide {
  private inner: HTMLElement | null = null;
  private textEl: HTMLElement | null = null;
  private imageWrapper: HTMLElement | null = null;
  private redLayer!: HTMLElement;
  private greenLayer!: HTMLElement;

  private isImageLeft: boolean;
  isSticky: boolean = true;

  constructor(id: string, isImageLeft: boolean = false) {
    super(id);
    this.isImageLeft = isImageLeft;
  }

  protected onMount(): void {
    if (!this.element) return;

    this.element.style.height = '200vh';

    this.inner = document.createElement('div');
    this.inner.style.position = 'sticky';
    this.inner.style.top = '0';
    this.inner.style.height = '100vh';
    this.inner.style.overflow = 'hidden';
    this.inner.style.display = 'flex';
    this.inner.style.alignItems = 'center';
    this.inner.style.justifyContent = 'center';

    while (this.element.firstChild) {
      this.inner.appendChild(this.element.firstChild);
    }
    this.element.appendChild(this.inner);

    this.textEl = this.inner.querySelector('[data-target="text"]');
    this.imageWrapper = this.inner.querySelector('[data-target="image"]');
    this.redLayer = this.inner.querySelector('.chromatic-red') as HTMLElement;
    this.greenLayer = this.inner.querySelector('.chromatic-green') as HTMLElement;

    if (this.redLayer) {
      this.redLayer.style.opacity = '0';
      this.redLayer.style.transition = 'opacity 0.2s, transform 0.2s';
    }
    if (this.greenLayer) {
      this.greenLayer.style.opacity = '0';
      this.greenLayer.style.transition = 'opacity 0.2s, transform 0.2s';
    }
    if (this.textEl) {
      this.textEl.style.willChange = 'transform, opacity';
      this.textEl.style.opacity = '0';
      this.textEl.style.transform = this.isImageLeft ? 'translateX(100px)' : 'translateX(-100px)';
    }
    if (this.imageWrapper) {
      this.imageWrapper.style.willChange = 'transform';
    }
  }

  update(progress: number): void {
    if (!this.inner || !this.textEl || !this.imageWrapper || !this.redLayer || !this.greenLayer) return;

    if (this.reducedMotion) {
      this.textEl.style.opacity = '1';
      this.textEl.style.transform = 'none';
      this.imageWrapper.style.transform = 'none';
      this.redLayer.style.opacity = '0';
      this.greenLayer.style.opacity = '0';
      return;
    }

    const introEnd = 0.4;
    let localNorm = Math.min(progress / introEnd, 1);
    const eased = this.easeOutCubic(localNorm);

    const textX = (1 - eased) * 120 * (this.isImageLeft ? 1 : -1);
    const textY = 30 * (1 - eased);
    this.textEl.style.opacity = `${eased}`;
    this.textEl.style.transform = `translateX(${textX}px) translateY(${textY}px)`;

    const direction = this.isImageLeft ? -1 : 1;
    const distance = (1 - eased) * 140;
    const rotate = (1 - eased) * 10 * direction;
    const scale = 1 + (1 - eased) * 0.18;

    this.imageWrapper.style.transform = `
      translateX(${distance * direction}%)
      rotate(${rotate}deg)
      scale(${scale})
    `;

    const outlineStart = 0.45;
    const outlineEnd = 0.6;

    let outline = 0;
    if (progress >= outlineStart) {
      outline = Math.min((progress - outlineStart) / (outlineEnd - outlineStart), 1);
    }

    const outlineEased = this.easeOutCubic(outline);

    this.redLayer.style.opacity = `${0.9 * outlineEased}`;
    this.greenLayer.style.opacity = `${0.75 * outlineEased}`;

    this.redLayer.style.transform = `
      translateX(${14 * outlineEased}px)
      translateY(${9 * outlineEased}px)
      rotate(${2.5 * outlineEased}deg)
    `;

    this.greenLayer.style.transform = `
      translateX(${-12 * outlineEased}px)
      translateY(${-7 * outlineEased}px)
      rotate(${-2 * outlineEased}deg)
    `;
  }


  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}
