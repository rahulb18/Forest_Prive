/**
 * Unified Scroll & Navigation Controller
 * 
 * Clean, 100% native browser scrolling with zero wheel hijacking and zero touch prevention.
 * Guarantees effortless momentum scrolling forwards and backwards across Safari, Chrome,
 * Windows, and mobile devices.
 */

export type PresentationSection = "hero" | "showcase" | "overview" | "content";

export interface PresentationState {
  section: PresentationSection;
  scrollY: number;
}

type PresentationListener = (state: PresentationState) => void;

class ScrollPresentationManager {
  private section: PresentationSection = "hero";
  private scrollY: number = 0;
  private listeners: Set<PresentationListener> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", this.handleScroll, { passive: true });
    }
  }

  private handleScroll = () => {
    this.scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const heroThreshold = window.innerHeight * 0.8;
    
    let newSection: PresentationSection = "hero";
    if (this.scrollY > heroThreshold) {
      newSection = "content";
    }
    
    if (newSection !== this.section) {
      this.section = newSection;
      this.notify();
    }
  };

  public getState(): PresentationState {
    return {
      section: this.section,
      scrollY: this.scrollY,
    };
  }

  public getSection(): PresentationSection {
    return this.section;
  }

  public getHeroSlide(): number {
    return 0;
  }

  public getCinematicScene(): number {
    return 0;
  }

  public subscribe(listener: PresentationListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  public setHeroSlide(_index: number) {
    // No-op in single-hero mode
  }

  public setCinematicScene(_index: number) {
    // No-op in single-showcase mode
  }

  public setSection(section: PresentationSection) {
    this.section = section;
    this.notify();
  }

  public resetToHero() {
    this.section = "hero";
    this.notify();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  public scrollToSection(elementId: string) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

export const scrollPresentation = new ScrollPresentationManager();

/**
 * No-op hook preserving backward compatibility while ensuring 100% native scrolling.
 */
export function usePresentationScroll() {
  // Pure native scrolling; no wheel or touch event interception.
}
