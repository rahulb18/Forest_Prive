/**
 * Unified Scroll Presentation Controller
 * 
 * Manages discrete "one scroll gesture = change exactly one slide/scene" transitions
 * for the Hero and Cinematic Showcase sections.
 * 
 * Guarantees zero skipping and prevents native window scrolling from bypassing slides
 * across macOS Safari, Chrome, Windows mouse wheels, and mobile touch devices.
 */

export type PresentationSection = "hero" | "cinematic" | "content";

export interface PresentationState {
  section: PresentationSection;
  heroSlide: number;       // 0, 1, 2
  cinematicScene: number;  // 0, 1, 2, 3, 4, 5
}

type PresentationListener = (state: PresentationState) => void;

class ScrollPresentationManager {
  private section: PresentationSection = "hero";
  private heroSlide: number = 0;
  private cinematicScene: number = 0;
  private listeners: Set<PresentationListener> = new Set();
  private isLocked: boolean = false;
  private lockTimer: any = null;

  public getState(): PresentationState {
    return {
      section: this.section,
      heroSlide: this.heroSlide,
      cinematicScene: this.cinematicScene,
    };
  }

  public getSection(): PresentationSection {
    return this.section;
  }

  public getHeroSlide(): number {
    return this.heroSlide;
  }

  public getCinematicScene(): number {
    return this.cinematicScene;
  }

  public isTransitionLocked(): boolean {
    return this.isLocked;
  }

  public lock(ms: number) {
    this.isLocked = true;
    if (this.lockTimer) clearTimeout(this.lockTimer);
    this.lockTimer = setTimeout(() => {
      this.isLocked = false;
    }, ms);
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

  public setHeroSlide(index: number) {
    const clamped = Math.min(2, Math.max(0, index));
    this.heroSlide = clamped;
    this.lock(750);
    this.notify();
  }

  public setCinematicScene(index: number) {
    const clamped = Math.min(5, Math.max(0, index));
    this.cinematicScene = clamped;
    this.lock(750);
    this.notify();
  }

  public setSection(section: PresentationSection) {
    this.section = section;
    this.notify();
  }

  public resetToHero() {
    this.section = "hero";
    this.heroSlide = 0;
    this.cinematicScene = 0;
    this.lock(800);
    this.notify();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  public enterCinematicFromBelow() {
    this.section = "cinematic";
    this.cinematicScene = 5; // Start at last scene when scrolling up from Overview
    this.lock(800);
    this.notify();
    const cinematicEl = document.getElementById("Cinematic");
    if (cinematicEl) {
      cinematicEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }

  public next() {
    if (this.section === "hero") {
      if (this.heroSlide < 2) {
        this.heroSlide += 1;
        this.lock(750);
        this.notify();
      } else {
        // Hero Slide 03 -> Transition into Cinematic Showcase Scene 01
        this.section = "cinematic";
        this.cinematicScene = 0;
        this.lock(900);
        this.notify();
        const cinematicEl = document.getElementById("Cinematic");
        if (cinematicEl) {
          cinematicEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }
      }
    } else if (this.section === "cinematic") {
      if (this.cinematicScene < 5) {
        this.cinematicScene += 1;
        this.lock(750);
        this.notify();
      } else {
        // Cinematic Scene 06 -> Transition into Overview
        this.section = "content";
        this.lock(900);
        this.notify();
        const overviewEl = document.getElementById("Overview");
        if (overviewEl) {
          overviewEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: window.innerHeight * 2, behavior: "smooth" });
        }
      }
    }
  }

  public prev() {
    if (this.section === "hero") {
      if (this.heroSlide > 0) {
        this.heroSlide -= 1;
        this.lock(750);
        this.notify();
      }
    } else if (this.section === "cinematic") {
      if (this.cinematicScene > 0) {
        this.cinematicScene -= 1;
        this.lock(750);
        this.notify();
      } else {
        // Cinematic Scene 01 -> Transition back up to Hero Slide 03
        this.section = "hero";
        this.heroSlide = 2;
        this.lock(900);
        this.notify();
        const heroEl = document.getElementById("home");
        if (heroEl) {
          heroEl.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  }
}

export const scrollPresentation = new ScrollPresentationManager();

import { useEffect } from "react";

export function usePresentationScroll() {
  useEffect(() => {
    let deltaYAccumulator = 0;
    let deltaYTimer: any = null;
    let touchStartY = 0;
    let touchStartX = 0;
    let isTouching = false;

    const handleWheel = (e: WheelEvent) => {
      // 1. Allow macOS trackpad pinch-to-zoom
      if (e.ctrlKey) return;

      const currentSection = scrollPresentation.getSection();

      // If user is down in normal page content (Overview, Amenities, Gallery, etc.):
      if (currentSection === "content") {
        return; // Allow native scrolling
      }

      // CRITICAL FOR SAFARI & CHROME:
      // While in Hero or Cinematic, UNCONDITIONALLY prevent native window scrolling!
      // This guarantees the browser will NEVER jump past slides into subsequent sections.
      e.preventDefault();

      // If slide transition animation/momentum lock is active, absorb event
      if (scrollPresentation.isTransitionLocked()) {
        return;
      }

      deltaYAccumulator += e.deltaY;
      clearTimeout(deltaYTimer);
      deltaYTimer = setTimeout(() => {
        deltaYAccumulator = 0;
      }, 180);

      // Threshold ensures deliberate movement (filters out tiny single-pixel jitter)
      const THRESHOLD = 25;
      if (deltaYAccumulator >= THRESHOLD) {
        deltaYAccumulator = 0;
        scrollPresentation.next();
      } else if (deltaYAccumulator <= -THRESHOLD) {
        deltaYAccumulator = 0;
        scrollPresentation.prev();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
      isTouching = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;
      const currentSection = scrollPresentation.getSection();
      if (currentSection !== "content") {
        // Prevent mobile browser from native scrolling the page away during Hero or Cinematic
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTouching) return;
      isTouching = false;
      const currentSection = scrollPresentation.getSection();
      if (currentSection === "content") return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;

      // Ensure vertical gesture dominates
      if (Math.abs(deltaY) < 35 || Math.abs(deltaY) < Math.abs(deltaX) * 1.2) return;
      if (scrollPresentation.isTransitionLocked()) return;

      if (deltaY > 35) {
        // Swipe Up -> Scroll Down
        scrollPresentation.next();
      } else if (deltaY < -35) {
        // Swipe Down -> Scroll Up
        scrollPresentation.prev();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentSection = scrollPresentation.getSection();
      if (currentSection === "content") return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        if (!scrollPresentation.isTransitionLocked()) {
          scrollPresentation.next();
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        if (!scrollPresentation.isTransitionLocked()) {
          scrollPresentation.prev();
        }
      }
    };

    let prevScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      const h = window.innerHeight;
      const currentSection = scrollPresentation.getSection();

      // Detect if user in Content scrolled all the way back up to Cinematic
      if (currentSection === "content" && scrollY <= h * 1.3 && prevScrollY > scrollY) {
        scrollPresentation.enterCinematicFromBelow();
      } else if (scrollY > h * 1.6 && currentSection !== "content") {
        // If user jumped or dragged scrollbar down into content
        scrollPresentation.setSection("content");
      }

      prevScrollY = scrollY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
