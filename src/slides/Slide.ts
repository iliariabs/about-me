export abstract class Slide {
  id: string;
  protected element: HTMLElement | null = null;
  protected reducedMotion: boolean = false;
  isSticky: boolean = false;
  protected scrollHeight: number | undefined;

  constructor(id: string) {
    this.id = id;
  }

  mount(container: HTMLElement): void {
    this.element = container;
    this.onMount();
  }

  unmount(): void {
    this.onUnmount();
    this.element = null;
  }

  setReducedMotion(prefersReduced: boolean): void {
    this.reducedMotion = prefersReduced;
  }
  
  getScrollHeight() {
    return this.scrollHeight ?? window.innerHeight;
  }

  abstract update(progress: number): void;

  protected onMount(): void {}
  protected onUnmount(): void {}
}