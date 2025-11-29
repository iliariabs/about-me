import { Slide } from './Slide';

export class TitleWhoSlide extends Slide {
  private descriptionEl: HTMLElement | null = null;
  private whoEl: HTMLElement | null = null;

  private roles: string[] = [];
  private currentRoleIndex: number = 0;
  private charIndex: number = 0;
  private typingForward: boolean = true;
  private speed: number = 0.002;
  private delayTime: number = 60;
  private delayCounter: number = 0;

  private animationFrame: number | null = null;

  constructor(id: string, roles: string[]) {
    super(id);
    this.roles = roles;
  }

  protected onMount(): void {
    if (!this.element) return;

    this.descriptionEl = this.element.querySelector('[data-target="description"]');
    this.whoEl = this.element.querySelector('[data-target="who"]');

    if (this.descriptionEl) this.descriptionEl.style.opacity = '1';
    if (this.whoEl) this.whoEl.textContent = '';

    this.startTyping();
  }

  protected onUnmount(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private startTyping() {
    const loop = () => {
      this.update(0);
      this.animationFrame = requestAnimationFrame(loop);
    };
    loop();
  }

  update(_: number): void {
    if (!this.whoEl) return;

    const currentRole = this.roles[this.currentRoleIndex];
    const fullText = currentRole;
    const displayText = fullText.substring(0, Math.floor(this.charIndex)) + ' <';

    if (this.typingForward) {
      this.charIndex += this.speed * 60;
      if (this.charIndex >= fullText.length) {
        this.charIndex = fullText.length;
        if (this.delayCounter < this.delayTime) {
          this.delayCounter++;
          this.whoEl.textContent = displayText;
          return;
        }
        this.typingForward = false;
        this.delayCounter = 0;
      }
    } else {
      this.charIndex -= this.speed * 60;
      if (this.charIndex <= 0) {
        this.charIndex = 0;
        this.typingForward = true;
        this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      }
    }

    this.whoEl.textContent = displayText;
  }
}
