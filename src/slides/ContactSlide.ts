import { Slide } from './Slide';

export class ContactSlide extends Slide {
  private textEl: HTMLElement | null = null;
  private imageWrapper: HTMLElement | null = null;
  private redLayer: HTMLElement | null = null;
  private greenLayer: HTMLElement | null = null;
  private isImageLeft: boolean;
  isSticky: boolean = true; 

  constructor(id: string, isImageLeft: boolean = false) {
    super(id);
    this.isImageLeft = isImageLeft;
  }

  protected onMount(): void {
    if (!this.element) return;

    this.textEl = this.element.querySelector('[data-target="text"]');
    this.imageWrapper = this.element.querySelector('[data-target="image"]');
    this.redLayer = this.element.querySelector('.chromatic-red');
    this.greenLayer = this.element.querySelector('.chromatic-green');

    if (this.textEl) {
      this.textEl.style.willChange = 'transform, opacity';
      this.textEl.style.opacity = '0';
      this.textEl.style.transform = this.isImageLeft ? 'translateX(100px)' : 'translateX(-100px)';
    }
    if (this.imageWrapper) {
      this.imageWrapper.style.willChange = 'transform';
    }

    const iconWraps = this.element.querySelectorAll('.icon-wrap');
    iconWraps.forEach((wrap) => {
      wrap.addEventListener('mouseenter', () => {
        wrap.classList.add('glitch-active');
      });
      wrap.addEventListener('mouseleave', () => {
        wrap.classList.remove('glitch-active');
      });
    });
  }

  update(progress: number): void {
    if (!this.textEl || !this.imageWrapper) return;

    if (this.reducedMotion) {
      this.textEl.style.opacity = '1';
      this.textEl.style.transform = 'none';
      this.imageWrapper.style.transform = 'none';
      if (this.redLayer) this.redLayer.style.opacity = '0';
      if (this.greenLayer) this.greenLayer.style.opacity = '0';
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
    const scale = 1 + (1 - eased) * 0.12; 

    this.imageWrapper.style.transform = `
      translate3d(${distance * direction}%, 0, 0)
      rotate(${rotate}deg)
      scale(${scale})
    `;

    if (this.redLayer && this.greenLayer) {
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
          translate3d(${14 * outlineEased}px, ${9 * outlineEased}px, 0)
          rotate(${2.5 * outlineEased}deg)
        `;

        this.greenLayer.style.transform = `
          translate3d(${-12 * outlineEased}px, ${-7 * outlineEased}px, 0)
          rotate(${-2 * outlineEased}deg)
        `;
    }
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
}