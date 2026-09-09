/**
 * Global Modal State Manager
 * Enables any CTA button across the site to trigger the EnquiryModal with a custom title.
 */

type ModalListener = (isOpen: boolean, title: string) => void;

class ModalStateManager {
    private isOpen: boolean = false;
    private title: string = "Enquire Now";
    private listeners: Set<ModalListener> = new Set();

    public open(title: string = "Enquire Now") {
        this.isOpen = true;
        this.title = title;
        this.notify();
    }

    public close() {
        this.isOpen = false;
        this.notify();
    }

    public getState() {
        return { isOpen: this.isOpen, title: this.title };
    }

    public subscribe(listener: ModalListener) {
        this.listeners.add(listener);
        listener(this.isOpen, this.title);
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notify() {
        this.listeners.forEach(listener => listener(this.isOpen, this.title));
    }
}

export const modalState = new ModalStateManager();
