import { Slide } from "./Slide";

export class CarouselSlide extends Slide {
  private root: HTMLElement | null = null;
  private frames: HTMLElement[] = [];
  isSticky: boolean = true;
  private GAP_PX = 150;

  protected onMount(): void {
    if (!this.element) return;

    this.element.style.height = `${this.frames.length * 100}vh`;

    this.root = this.element.querySelector("[data-slide='sticky-carousel']") as HTMLElement;
    if (!this.root) return;

    this.frames = Array.from(this.root.querySelectorAll(".carousel-frame")) as HTMLElement[];
    if (this.frames.length === 0) {
      this.frames = Array.from(this.root.querySelectorAll("img")).map(img => img.closest(".carousel-frame") as HTMLElement).filter(Boolean) as HTMLElement[];
    }

    this.frames.forEach((frame) => {
      frame.style.position = "absolute";
      frame.style.inset = "0";
      frame.style.transition = "opacity 450ms cubic-bezier(.2,.9,.3,1), transform 450ms cubic-bezier(.2,.9,.3,1)";
      frame.style.opacity = "0";
      frame.style.transform = "scale(0.95)";
      frame.style.pointerEvents = "none";
    });
  }

  update(progress: number): void {
    if (!this.root || this.frames.length === 0 || !this.element) return;

    const gapFraction = Math.min(this.GAP_PX / (window.innerHeight * this.frames.length), 0.25);
    const usable = 1 - gapFraction;

    let p = Math.min(Math.max(progress, 0), 1);
    const pAdj = usable === 0 ? 1 : Math.min(p / usable, 1);

    const index = Math.floor(pAdj * Math.max(this.frames.length - 1, 1));

    if (this.reducedMotion) {
      this.frames.forEach((frame, i) => {
        frame.style.opacity = i === 0 ? "1" : "0";
        frame.style.transform = "none";
        frame.style.pointerEvents = i === 0 ? "auto" : "none";
      });
      return;
    }

    this.frames.forEach((frame, i) => {
      const isActive = i === index;
      frame.style.opacity = isActive ? "1" : "0";
      frame.style.transform = isActive ? "scale(1)" : "scale(0.95)";
      frame.style.pointerEvents = isActive ? "auto" : "none";
    });
  }
}
